import {
  useRef,
  useState,
  useCallback,
  SyntheticEvent,
  ClipboardEvent,
  FormEvent,
  useEffect,
  useLayoutEffect,
} from 'react';
import _uniq from 'lodash/uniq';
import _difference from 'lodash/difference';
import _includes from 'lodash/includes';
import { find as linkifyFind } from 'linkifyjs';
import { useDebouncedCallback } from 'use-debounce';
import { BaseEmoji, EmojiData } from 'emoji-mart';
import { UploadState } from 'react-file-utils';
import { NewActivity, OGAPIResponse, StreamClient, UR } from 'getstream';

import { DefaultAT, DefaultUT, useStreamContext } from '../../Context';
import { StatusUpdateFormProps } from './StatusUpdateForm';
import {
  generateRandomId,
  dataTransferItemsToFiles,
  dataTransferItemsHaveFiles,
  inputValueFromEvent,
} from '../../utils';
import { NetworkRequestTypes } from 'utils/errors';

type Og = {
  dismissed: boolean;
  scrapingActive: boolean;
  data?: OGAPIResponse;
};

export type FileUploadState = {
  file: File | Blob;
  id: string;
  state: UploadState;
  url?: string;
};

export type ImageUploadState = FileUploadState & { previewUri?: string };

type OgState = { activeUrl: string; data: Record<string, Og>; order: string[] };

type ImagesState = { data: Record<string, ImageUploadState>; order: string[] };

type FilesState = { data: Record<string, FileUploadState>; order: string[] };

type UseOgProps = { client: StreamClient; logErr: (e: Error, type: NetworkRequestTypes) => void };

type UseUploadProps = UseOgProps;

const defaultOgState = { activeUrl: '', data: {}, order: [] };
const defaultImageState = { data: {}, order: [] };
const defaultFileState = { data: {}, order: [] };

const useTextArea = () => {
  const [text, setText] = useState('');
  const [curser, setCurser] = useState<number | null>(null);
  const textInputRef = useRef<HTMLTextAreaElement>();

  const insertText = useCallback((insertedText: string) => {
    setText((prevText) => {
      const textareaElement = textInputRef.current;
      if (!textareaElement) {
        setCurser(null);
        return prevText + insertedText;
      }

      // Insert emoji at previous cursor position
      const { selectionStart, selectionEnd } = textareaElement;
      setCurser(selectionStart + insertedText.length);
      return prevText.slice(0, selectionStart) + insertedText + prevText.slice(selectionEnd);
    });
  }, []);

  const onSelectEmoji = useCallback((emoji: EmojiData) => insertText((emoji as BaseEmoji).native), []);

  useLayoutEffect(() => {
    // Update cursorPosition after insertText is fired
    const textareaElement = textInputRef.current;
    if (textareaElement && curser !== null) {
      textareaElement.selectionStart = curser;
      textareaElement.selectionEnd = curser;
    }
  }, [curser]);

  return { text, setText, insertText, onSelectEmoji, textInputRef };
};

const useOg = ({ client, logErr }: UseOgProps) => {
  const [og, setOg] = useState<OgState>(defaultOgState);
  const reqInProgress = useRef<Record<string, boolean>>({});

  const activeOg = og.data[og.activeUrl]?.data;

  const orderedOgStates = og.order.map((url) => og.data[url]).filter(Boolean);

  const isOgScraping = orderedOgStates.some((state) => state.scrapingActive);

  const availableOg = orderedOgStates.map((state) => state.data).filter(Boolean) as OGAPIResponse[];

  const resetOg = useCallback(() => setOg(defaultOgState), []);

  const setActiveOg = useCallback((url: string) => {
    if (url) {
      setOg((prevState) => {
        prevState.data[url].dismissed = false;
        return { ...prevState, activeUrl: url };
      });
    }
  }, []);

  const dismissOg = useCallback((e?: SyntheticEvent) => {
    e?.preventDefault();
    setOg((prevState) => {
      for (const url in prevState.data) {
        prevState.data[url].dismissed = true;
      }
      return { ...prevState, activeUrl: '' };
    });
  }, []);

  const handleOG = useCallback((text: string) => {
    const urls = _uniq(linkifyFind(text, 'url').map((info) => info.href));
    // removed delete ogs from state and add the new urls
    setOg((prevState) => {
      const newUrls = _difference(urls, prevState.order);
      const removedUrls = _difference(prevState.order, urls);

      if (!_includes(urls, prevState.activeUrl)) {
        prevState.activeUrl = '';
        for (const url of urls) {
          const og = prevState.data[url];
          if (og?.data && !og.dismissed) {
            prevState.activeUrl = url;
            break;
          }
        }
      }

      for (const url of removedUrls) {
        delete prevState.data[url];
      }

      for (const url of newUrls) {
        prevState.data[url] = { scrapingActive: true, dismissed: false };
      }

      return { ...prevState, order: urls };
    });
  }, []);

  const handleOgDebounced = useDebouncedCallback(handleOG, 750, { leading: true, trailing: true });

  useEffect(() => {
    og.order
      .filter((url) => !reqInProgress.current[url] && og.data[url].scrapingActive)
      .forEach(async (url) => {
        reqInProgress.current[url] = true;
        try {
          const resp = await client.og(url);
          resp.url = url;
          setOg((prevState) => {
            prevState.data[url] = { ...prevState.data[url], data: resp, scrapingActive: false, dismissed: false };
            prevState.activeUrl = prevState.activeUrl || url;
            return { ...prevState };
          });
        } catch (e) {
          console.warn(e);
          logErr(e, 'get-og');
          setOg((prevState) => {
            prevState.data[url] = { ...prevState.data[url], scrapingActive: false, dismissed: false };
            return { ...prevState };
          });
        }
        delete reqInProgress.current[url];
      });
  }, [og.order]);

  return {
    og,
    activeOg,
    setActiveOg,
    resetOg,
    availableOg,
    orderedOgStates,
    isOgScraping,
    handleOgDebounced,
    dismissOg,
    ogActiveUrl: og.activeUrl,
  };
};

const useUpload = ({ client, logErr }: UseUploadProps) => {
  const [images, setImages] = useState<ImagesState>(defaultImageState);
  const [files, setFiles] = useState<FilesState>(defaultFileState);

  const reqInProgress = useRef<Record<string, boolean>>({});

  const orderedImages = images.order.map((id) => images.data[id]);

  const uploadedImages = orderedImages.filter((upload) => upload.url);

  const orderedFiles = files.order.map((id) => files.data[id]);

  const uploadedFiles = orderedFiles.filter((upload) => upload.url);

  const resetUpload = useCallback(() => {
    setImages(defaultImageState);
    setFiles(defaultFileState);
  }, []);

  const uploadNewImage = useCallback((file: File | Blob) => {
    const id = generateRandomId();
    setImages(({ order, data }) => {
      data[id] = { id, file, state: 'uploading' };
      return { data: { ...data }, order: [...order, id] };
    });

    if (FileReader) {
      // TODO: Possibly use URL.createObjectURL instead. However, then we need
      // to release the previews when not used anymore though.
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewUri = event.target?.result as string;
        if (!previewUri) return;
        setImages((prevState) => {
          if (!prevState.data[id]) return prevState;
          prevState.data[id].previewUri = previewUri;
          return { ...prevState, data: { ...prevState.data } };
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const uploadNewFile = useCallback((file: File) => {
    const id = generateRandomId();
    setFiles(({ order, data }) => {
      data[id] = { id, file, state: 'uploading' };
      return { data: { ...data }, order: [...order, id] };
    });
  }, []);

  const uploadImage = useCallback(async (id: string, img: ImageUploadState) => {
    setImages((prevState) => {
      if (!prevState.data[id]) return prevState;
      prevState.data[id].state = 'uploading';
      return { ...prevState };
    });

    try {
      const { file: url } = await client.images.upload(img.file as File);
      setImages((prevState) => {
        if (!prevState.data[id]) return prevState;
        prevState.data[id].url = url;
        prevState.data[id].state = 'finished';
        return { ...prevState };
      });
    } catch (e) {
      console.warn(e);

      setImages((prevState) => {
        if (!prevState.data[id]) return prevState;
        logErr(e, 'upload-image');
        prevState.data[id].state = 'failed';
        return { ...prevState };
      });
    }
  }, []);

  const uploadFile = useCallback(async (id: string, file: FileUploadState) => {
    setFiles((prevState) => {
      if (!prevState.data[id]) return prevState;
      prevState.data[id].state = 'uploading';
      return { ...prevState, data: { ...prevState.data } };
    });

    try {
      const { file: url } = await client.files.upload(file.file as File);
      setFiles((prevState) => {
        if (!prevState.data[id]) return prevState;
        prevState.data[id].url = url;
        prevState.data[id].state = 'finished';
        return { ...prevState, data: { ...prevState.data } };
      });
    } catch (e) {
      console.warn(e);
      setFiles((prevState) => {
        if (!prevState.data[id]) return prevState;
        logErr(e, 'upload-file');
        prevState.data[id].state = 'failed';
        return { ...prevState, data: { ...prevState.data } };
      });
    }
  }, []);

  const uploadNewFiles = useCallback((files: Blob[] | File[] | FileList) => {
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        uploadNewImage(file);
      } else if (file instanceof File) {
        uploadNewFile(file);
      }
    }
  }, []);

  const removeImage = useCallback((id: string) => {
    setImages((prevState) => {
      prevState.order = prevState.order.filter((oid) => id !== oid);
      delete prevState.data[id];
      return { ...prevState };
    });
  }, []);

  const removeFile = useCallback((id: string) => {
    // eslint-disable-next-line sonarjs/no-identical-functions
    setFiles((prevState) => {
      prevState.order = prevState.order.filter((oid) => id !== oid);
      delete prevState.data[id];
      return { ...prevState };
    });
  }, []);

  useEffect(() => {
    images.order
      .filter((id) => !reqInProgress.current[id] && images.data[id].state === 'uploading')
      .forEach(async (id) => {
        reqInProgress.current[id] = true;
        await uploadImage(id, images.data[id]);
        delete reqInProgress.current[id];
      });
  }, [images.order]);

  useEffect(() => {
    files.order
      .filter((id) => !reqInProgress.current[id] && files.data[id].state === 'uploading')
      .forEach(async (id) => {
        reqInProgress.current[id] = true;
        await uploadFile(id, files.data[id]);
        delete reqInProgress.current[id];
      });
  }, [files.order]);

  return {
    images,
    files,
    orderedImages,
    orderedFiles,
    uploadedImages,
    uploadedFiles,
    resetUpload,
    uploadNewFiles,
    uploadFile,
    uploadImage,
    removeFile,
    removeImage,
  };
};

export function useStatusUpdateForm<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  activityVerb,
  feedGroup,
  modifyActivityData,
  doRequest,
  userId,
  onSuccess,
}: { activityVerb: string; feedGroup: string } & Pick<
  StatusUpdateFormProps<AT>,
  'doRequest' | 'modifyActivityData' | 'onSuccess' | 'userId'
>) {
  const [submitting, setSubmitting] = useState(false);

  const appCtx = useStreamContext<UT, AT, CT, RT, CRT, PT>();
  const client = appCtx.client as StreamClient<UT, AT, CT, RT, CRT, PT>;
  const userData = (appCtx.user?.data || {}) as UT;
  const logErr = useCallback(
    (e: Error, type: NetworkRequestTypes) => appCtx.errorHandler(e, type, { userId, feedGroup }),
    [],
  );

  const { text, setText, insertText, onSelectEmoji, textInputRef } = useTextArea();

  const {
    resetOg,
    setActiveOg,
    ogActiveUrl,
    activeOg,
    dismissOg,
    availableOg,
    isOgScraping,
    handleOgDebounced,
  } = useOg({ client: client as StreamClient, logErr });

  const {
    images,
    files,
    orderedImages,
    orderedFiles,
    uploadedImages,
    uploadedFiles,
    resetUpload,
    uploadNewFiles,
    uploadFile,
    uploadImage,
    removeFile,
    removeImage,
  } = useUpload({ client: client as StreamClient, logErr });

  const resetState = useCallback(() => {
    setText('');
    setSubmitting(false);
    resetOg();
    resetUpload();
  }, []);

  const object = () => {
    for (const image of orderedImages) {
      if (image.url) return image.url;
    }
    return text.trim();
  };

  const canSubmit = () =>
    !submitting &&
    Boolean(object()) &&
    orderedImages.every((upload) => upload.state !== 'uploading') &&
    orderedFiles.every((upload) => upload.state !== 'uploading') &&
    !isOgScraping;

  const addActivity = async () => {
    // FIXME:
    // @ts-expect-error
    const activity: NewActivity<AT> = {
      actor: client.currentUser?.ref() as string,
      object: object(),
      verb: activityVerb,
      text: text.trim(),
      attachments: {
        og: activeOg,
        images: uploadedImages.map((image) => image.url).filter(Boolean) as string[],
        files: uploadedFiles.map((upload) => ({
          // url will never actually be empty string because uploadedFiles
          // filters those out.
          url: upload.url as string,
          name: (upload.file as File).name,
          mimeType: upload.file.type,
        })),
      },
    };

    const modifiedActivity = modifyActivityData ? modifyActivityData(activity) : activity;
    if (doRequest) {
      return await doRequest(modifiedActivity);
    } else {
      return await client.feed(feedGroup, userId).addActivity(modifiedActivity);
    }
  };

  const onSubmitForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const response = await addActivity();
      resetState();
      if (onSuccess) onSuccess(response);
    } catch (e) {
      setSubmitting(false);
      logErr(e, 'add-activity');
    }
  };

  const onChange = useCallback((event: SyntheticEvent<HTMLTextAreaElement>) => {
    const text = inputValueFromEvent(event);
    if (text === null || text === undefined) return;
    setText(text);
    handleOgDebounced(text);
  }, []);

  const onPaste = useCallback(async (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const { items } = event.clipboardData;
    if (!dataTransferItemsHaveFiles(items)) return;

    event.preventDefault();
    // Get a promise for the plain text in case no files are
    // found. This needs to be done here because chrome cleans
    // up the DataTransferItems after resolving of a promise.
    let plainTextPromise: Promise<string> | undefined;
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (item.kind === 'string' && item.type === 'text/plain') {
        plainTextPromise = new Promise((resolve) => item.getAsString(resolve));
        break;
      }
    }

    const fileLikes = await dataTransferItemsToFiles(items);
    if (fileLikes.length) {
      uploadNewFiles(fileLikes);
      return;
    }
    // fallback to regular text paste
    if (plainTextPromise) {
      const s = await plainTextPromise;
      insertText(s);
    }
  }, []);

  return {
    userData,
    textInputRef,
    text,
    submitting,
    files,
    images,
    activeOg,
    availableOg,
    isOgScraping,
    ogActiveUrl,
    onSubmitForm,
    onSelectEmoji,
    insertText,
    onChange,
    dismissOg,
    setActiveOg,
    canSubmit,
    uploadNewFiles,
    uploadFile,
    uploadImage,
    removeFile,
    removeImage,
    onPaste,
  };
}
