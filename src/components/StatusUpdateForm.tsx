/* eslint sonarjs/cognitive-complexity: 0 */
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import anchorme from 'anchorme';
import _debounce from 'lodash/debounce';
import _difference from 'lodash/difference';
import _includes from 'lodash/includes';
import _uniq from 'lodash/uniq';
import * as React from 'react';
import {
  FilePreviewer,
  FileUploadButton,
  ImageDropzone,
  ImagePreviewer,
  ImageUploadButton,
  LoadingIndicator,
} from 'react-file-utils';
import { StreamApp, Streami18Ctx, withTranslationContext } from '../Context';
import { ActivityArgData } from '../getstreamCustomTypes';
import {
  Attachments,
  BaseActivityResponse,
  BaseAppCtx,
  CustomActivityArgData,
  FileLike,
  FileUpload,
  ImageUpload,
  OgData,
  Trigger,
} from '../types';
import {
  dataTransferItemsHaveFiles,
  dataTransferItemsToFiles,
  generateRandomId,
  inputValueFromEvent,
} from '../utils';
import Audio from './Audio';
import Avatar from './Avatar';
import Button from './Button';
import Card from './Card';
import EmojiPicker from './EmojiPicker';
import Panel from './Panel';
import PanelContent from './PanelContent';
import PanelFooter from './PanelFooter';
import PanelHeading from './PanelHeader';
import Textarea from './Textarea';
import Title from './Title';
import Video from './Video';

type Props = {
  /** The feed group part of the feed that the activity should be posted to */
  feedGroup?: string;

  /** The user_id part of the feed that the activity should be posted to  */
  userId?: string;

  /** The verb that should be used to post the activity */
  activityVerb?: string;

  /** If you want to change something about the activity data that this form
   * sends to stream you can do that with this function. This function gets the
   * activity data that the form would send normally and should return the
   * modified activity data that should be posted instead.
   *
   * For instance, this would add a target field to the activity:
   *
   * ```javascript
   * &lt;StatusUpdateForm
   *   modifyActivityData={(data) => ({...data, target: 'Group:1'})}
   * />
   * ```
   * */
  modifyActivityData?: (activityData: any) => ActivityArgData<any, any>;

  /** Add extra footer item */
  FooterItem?: React.ReactNode;

  /** A callback to run after the activity is posted successfully */
  onSuccess?: (response: BaseActivityResponse) => unknown;

  /** Override Post request */
  doRequest?: (activityData: {}) => Promise<BaseActivityResponse>;

  /** An extra trigger for ReactTextareaAutocomplete, this can be used to show
   * a menu when typing @xxx or #xxx, in addition to the emoji menu when typing
   * :xxx  */
  trigger?: Trigger;

  /** A ref that is bound to the textarea element */
  innerRef?: React.RefCallback<HTMLTextAreaElement>;

  /** The header to display */
  Header?: React.ReactNode;
};

/**
 * Component is described here.
 *
 * @example ./examples/StatusUpdateForm.md
 */
class StatusUpdateForm extends React.Component<Props & Streami18Ctx> {
  static defaultProps = {
    feedGroup: 'user',
    activityVerb: 'post',
    modifyActivityData: (d: {}) => d,
  };

  render() {
    const { t, Header } = this.props;
    const HeaderComponent = Header ? Header : <Title>{t('New Post')}</Title>;
    const forwardedProps = {
      ...this.props,
      Header: HeaderComponent,
    };
    return (
      <StreamApp.Consumer>
        {(appCtx) => <StatusUpdateFormInner {...forwardedProps} {...appCtx} />}
      </StreamApp.Consumer>
    );
  }
}

type OgState = {
  scrapingActive: boolean;
  data?: OgData;
  dismissed: boolean;
};

type State = {
  text: string;
  imageUploads: {
    [key: string]: ImageUpload;
  };
  imageOrder: string[];
  fileUploads: {
    [key: string]: FileUpload;
  };
  fileOrder: string[];
  ogUrlOrder: string[];
  ogStateByUrl: {
    [key: string]: OgState;
  };
  ogActiveUrl?: string;
  submitting: boolean;
};

type PropsInner = Props & Streami18Ctx & BaseAppCtx;
class StatusUpdateFormInner extends React.Component<PropsInner, State> {
  _handleOgDebounced: (input: string) => unknown;

  textInputRef: HTMLTextAreaElement | null = null;

  attachTextInputRef: React.RefCallback<HTMLTextAreaElement> = (el) => {
    this.textInputRef = el;
    if (!!this.props.innerRef) {
      this.props.innerRef(el);
    }
  };

  state = {
    text: '',
    imageUploads: {},
    imageOrder: [],
    fileUploads: {},
    fileOrder: [],
    ogUrlOrder: [],
    ogStateByUrl: {},
    ogActiveUrl: null,
    submitting: false,
  };

  constructor(props) {
    super(props);
    this._handleOgDebounced = _debounce(this.handleOG, 250, {
      leading: true,
      trailing: true,
    }) as any;
  }

  handleOG(text) {
    let newUrls;
    let removedUrls;

    const urlInfos = anchorme(text, {
      list: true,
      exclude: (info) =>
        info.protocol !== 'https://' && info.protocol !== 'http://',
    });
    const urls = _uniq(urlInfos.map((info) => info.protocol + info.encoded));

    this.setState(
      (prevState) => {
        const oldUrls = prevState.ogUrlOrder;
        newUrls = _difference(urls, oldUrls);
        removedUrls = _difference(oldUrls, urls);
        const newState: Partial<State> = {
          ogUrlOrder: urls,
        };

        if (!_includes(urls, prevState.ogActiveUrl, undefined, undefined)) {
          // !urls.includes(prevState.ogActiveUrl) replaced with lodash
          newState.ogActiveUrl = null;
          for (const url of urls) {
            const ogState = prevState.ogStateByUrl[url];
            if (ogState && ogState.data && !ogState.dismissed) {
              newState.ogActiveUrl = url;
              break;
            }
          }
        }

        for (const url of removedUrls) {
          delete prevState.ogStateByUrl[url];
        }
        for (const url of newUrls) {
          prevState.ogStateByUrl[url] = {
            scrapingActive: true,
            dismissed: false,
          };
        }
        newState.ogStateByUrl = prevState.ogStateByUrl;
        return newState as State;
      },
      () => {
        newUrls.forEach(async (url) => {
          let resp;
          try {
            resp = await this.props.client.og(url);
          } catch (e) {
            console.warn(e);
            this.setState((prevState) => {
              prevState.ogStateByUrl[url] = {
                scrapingActive: false,
                dismissed: false,
              };
              return { ogStateByUrl: prevState.ogStateByUrl };
            });
            return;
          }
          resp.url = url;
          this.setState((prevState) => {
            prevState.ogStateByUrl[url] = {
              scrapingActive: false,
              data: resp,
              dismissed: false,
            };
            const newState: Partial<State> = {
              ogStateByUrl: prevState.ogStateByUrl,
            };
            if (!prevState.ogActiveUrl) {
              newState.ogActiveUrl = url;
            }

            return newState as State;
          });
        });
      },
    );
  }

  _dismissOg = (og) => {
    if (og && og.url != null) {
      this.setState((prevState) => {
        const { ogStateByUrl } = prevState;
        for (const url in ogStateByUrl) {
          ogStateByUrl[url].dismissed = true;
        }

        return {
          ogActiveUrl: null,
          ogStateByUrl,
        };
      });
    }
  };

  _text = () => this.state.text.trim();

  _object = () => {
    for (const image of this._orderedImages()) {
      if (image.url) {
        return image.url;
      }
    }
    return this._text();
  };

  _orderedImages = () =>
    this.state.imageOrder.map((id) => this.state.imageUploads[id]);

  _uploadedImages = (): Array<ImageUpload> =>
    this._orderedImages().filter((upload) => upload.url);

  _orderedFiles = () =>
    this.state.fileOrder.map((id) => this.state.fileUploads[id]);

  _uploadedFiles = (): Array<FileUpload> =>
    this._orderedFiles().filter((upload) => upload.url);

  _orderedOgStates = (): OgState[] =>
    this.state.ogUrlOrder
      .map((url) => this.state.ogStateByUrl[url])
      .filter(Boolean);

  _isOgScraping = () =>
    this._orderedOgStates().some((state) => state.scrapingActive);

  _availableOg = (): OgData[] =>
    this._orderedOgStates()
      .map((state) => state.data)
      .filter(Boolean);

  _activeOg = (): OgData | null | undefined => {
    const { ogActiveUrl } = this.state;

    if (ogActiveUrl) {
      return this.state.ogStateByUrl[ogActiveUrl].data;
    }
  };

  _canSubmit = () =>
    Boolean(this._object()) &&
    this._orderedImages().every((upload) => upload.state !== 'uploading') &&
    this._orderedFiles().every((upload) => upload.state !== 'uploading') &&
    !this._isOgScraping() &&
    !this.state.submitting;

  async addActivity() {
    const activity: CustomActivityArgData = {
      actor: this.props.client.currentUser as any, // TODO resolve custom type issue
      verb: this.props.activityVerb,
      object: this._object(),
    };
    const uploadedImages = this._uploadedImages();
    const uploadedFiles = this._uploadedFiles();

    const attachments: Attachments = {
      og: this._activeOg(),
    };

    if (uploadedImages) {
      attachments.images = uploadedImages
        .map((image) => image.url)
        .filter(Boolean);
      activity.text = this._text();
    }
    if (uploadedFiles) {
      attachments.files = uploadedFiles.map((upload) => ({
        // url will never actually be empty string because _uploadedFiles
        // filters those out.
        url: upload.url || '',
        name: upload.file.name,
        mimeType: upload.file.type,
      }));
    }

    if (Object.keys(attachments).length > 0) {
      activity.attachments = attachments;
    }

    const modifiedActivity = this.props.modifyActivityData(activity);
    if (this.props.doRequest) {
      return await this.props.doRequest(modifiedActivity);
    } else {
      return await this.props.client
        .feed(this.props.feedGroup, this.props.userId)
        .addActivity(modifiedActivity as any); // TODO resolve custom type issue
    }
  }

  onSubmitForm = async (e) => {
    e.preventDefault();
    this.setState({ submitting: true });
    let response;
    try {
      response = await this.addActivity();
    } catch (e) {
      this.setState({ submitting: false });
      this.props.errorHandler(e, 'add-activity', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    this.setState({
      text: '',
      imageUploads: {},
      imageOrder: [],
      fileUploads: {},
      fileOrder: [],
      ogUrlOrder: [],
      ogStateByUrl: {},
      ogActiveUrl: null,
      submitting: false,
    });
    if (this.props.onSuccess) {
      this.props.onSuccess(response);
    }
  };
  _getTextAreaElement = (): HTMLTextAreaElement | null => this.textInputRef;

  _onSelectEmoji = (emoji) => this._insertText(emoji.native);

  _insertText = async (insertedText) => {
    let newCursorPosition;

    await this.setState((prevState) => {
      const prevText = prevState.text;
      const textareaElement = this._getTextAreaElement();
      if (!textareaElement) {
        return { text: prevText + insertedText };
      }
      // Insert emoji at previous cursor position
      const { selectionStart, selectionEnd } = textareaElement;
      newCursorPosition = selectionStart + insertedText.length;
      return {
        text:
          prevText.slice(0, selectionStart) +
          insertedText +
          prevText.slice(selectionEnd),
      };
    });

    const textareaElement = this._getTextAreaElement();
    if (!textareaElement || newCursorPosition == null) {
      return;
    }
    // Update cursorPosition
    textareaElement.selectionStart = newCursorPosition;
    textareaElement.selectionEnd = newCursorPosition;
  };

  _uploadNewFiles = (files: ReadonlyArray<FileLike>) => {
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        this._uploadNewImage(file);
      } else if (file instanceof File) {
        this._uploadNewFile(file);
      }
    }
  };

  _uploadNewImage = async (file) => {
    const id = generateRandomId();

    await this.setState((prevState) => {
      prevState.imageUploads[id] = {
        id,
        file,
        state: 'uploading',
      };
      return {
        imageOrder: prevState.imageOrder.concat(id),
        imageUploads: prevState.imageUploads,
      };
    });
    if (FileReader) {
      // TODO: Possibly use URL.createObjectURL instead. However, then we need
      // to release the previews when not used anymore though.
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState((prevState) => {
          prevState.imageUploads[
            id
          ].previewUri = event.target.result.toString();
          return { imageUploads: prevState.imageUploads };
        });
      };
      reader.readAsDataURL(file);
    }
    return this._uploadImage(id);
  };

  _uploadNewFile = async (file: File) => {
    const id = generateRandomId();

    await this.setState((prevState) => {
      prevState.fileUploads[id] = {
        id,
        file,
        state: 'uploading',
      };
      return {
        fileOrder: prevState.fileOrder.concat(id),
        fileUploads: prevState.fileUploads,
      };
    });

    return this._uploadFile(id);
  };

  _uploadImage = async (id: string) => {
    const img = this.state.imageUploads[id];
    if (!img) {
      return;
    }
    const { file } = img;

    await this.setState((prevState) => {
      prevState.imageUploads[id].state = 'uploading';
      return { imageUploads: prevState.imageUploads };
    });

    let response: any = {};
    try {
      response = await this.props.client.images.upload(file);
    } catch (e) {
      console.warn(e);
      let alreadyRemoved = false;
      await this.setState((prevState) => {
        const image = prevState.imageUploads[id];
        if (!image) {
          alreadyRemoved = true;
          return {};
        }
        image.state = 'failed';
        return { imageUploads: prevState.imageUploads } as State;
      });

      if (!alreadyRemoved) {
        this.props.errorHandler(e, 'upload-image', {
          feedGroup: this.props.feedGroup,
          userId: this.props.userId,
        });
      }
      return;
    }
    await this.setState((prevState) => {
      img.state = 'finished';
      img.url = response.file;
      return { imageUploads: prevState.imageUploads };
    });
  };

  _uploadFile = async (id: string) => {
    const upload = this.state.fileUploads[id];
    if (!upload) {
      return;
    }
    const { file } = upload;

    await this.setState((prevState) => {
      prevState.fileUploads[id].state = 'uploading';
      return { fileUploads: prevState.fileUploads };
    });

    let response: any = {};
    try {
      response = await this.props.client.files.upload(file);
    } catch (e) {
      console.warn(e);
      await this.setState((prevState) => {
        if (prevState.fileUploads[id]) {
          prevState.fileUploads[id].state = 'failed';
          return { fileUploads: prevState.fileUploads } as State;
        }
        return {} as State;
      });

      this.props.errorHandler(e, 'upload-image', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    await this.setState((prevState) => {
      if (prevState.fileUploads[id]) {
        prevState.fileUploads[id].state = 'finished';
        prevState.fileUploads[id].url = response.file;
        return { fileUploads: prevState.fileUploads } as State;
      }
      return {} as State;
    });
  };

  _removeImage = (id: string) => {
    // TODO: cancel upload if still uploading
    this.setState((prevState) => {
      const img = prevState.imageUploads[id];
      if (!img) {
        return {} as State;
      }
      delete prevState.imageUploads[id];
      return {
        imageUploads: prevState.imageUploads,
        imageOrder: prevState.imageOrder.filter((_id) => id !== _id),
      } as State;
    });
  };

  _removeFile = (id: string) => {
    // TODO: cancel upload if still uploading
    this.setState((prevState) => {
      const upload = prevState.fileUploads[id];
      if (!upload) {
        return {} as State;
      }
      delete prevState.fileUploads[id];
      return {
        fileUploads: prevState.fileUploads,
        fileOrder: prevState.fileOrder.filter((_id) => id !== _id),
      } as State;
    });
  };

  _onChange = (event) => {
    const text = inputValueFromEvent(event);
    if (text == null) {
      return;
    }
    this.setState({ text });
    this._handleOgDebounced(text);
  };

  render() {
    const { t } = this.props;
    const activeOg = this._activeOg();
    const availableOg = this._availableOg();
    const userData = (this.props.user as any).data || {}; // TODO resolve custom type issue
    return (
      <Panel>
        <form onSubmit={this.onSubmitForm}>
          <ImageDropzone handleFiles={this._uploadNewFiles}>
            <PanelHeading>{this.props.Header}</PanelHeading>
            <PanelContent>
              <div style={{ display: 'flex' }}>
                <React.Fragment>
                  {userData.profileImage && (
                    <div style={{ marginRight: '16px' }}>
                      <Avatar
                        image={
                          userData.profileImage ||
                          'https://placehold.it/100x100'
                        }
                        size={50}
                        circle
                      />
                    </div>
                  )}
                </React.Fragment>
                <Textarea
                  innerRef={this.attachTextInputRef}
                  placeholder={t('Type your post...')}
                  value={this.state.text}
                  onChange={this._onChange}
                  trigger={this.props.trigger}
                  onPaste={async (event) => {
                    const { items } = event.clipboardData;
                    if (!dataTransferItemsHaveFiles(items)) {
                      return;
                    }

                    event.preventDefault();
                    // Get a promise for the plain text in case no files are
                    // found. This needs to be done here because chrome cleans
                    // up the DataTransferItems after resolving of a promise.
                    let plainTextPromise;
                    // TODO resolve type issue
                    for (const _item of items as any) {
                      const item = _item as DataTransferItem;
                      if (
                        item.kind === 'string' &&
                        item.type === 'text/plain'
                      ) {
                        plainTextPromise = new Promise((resolve) => {
                          item.getAsString((s) => {
                            resolve(s);
                          });
                        });
                        break;
                      }
                    }

                    const fileLikes = await dataTransferItemsToFiles(items);
                    if (fileLikes.length) {
                      this._uploadNewFiles(fileLikes);
                      return;
                    }
                    // fallback to regular text paste
                    if (plainTextPromise) {
                      const s = await plainTextPromise;
                      this._insertText(s);
                    }
                  }}
                />
              </div>
              {this._isOgScraping() && (
                <div className="raf-status-update-form__og-loading">
                  <LoadingIndicator /> Getting website data...
                </div>
              )}
              {activeOg && (
                <div style={{ margin: '8px 0' }}>
                  {!activeOg.videos && !activeOg.audios ? (
                    <Card
                      {...(activeOg as any)} // TODO resolve custom type issue
                      nolink
                      handleClose={(e: any) => {
                        e.preventDefault();
                        this._dismissOg(activeOg);
                      }}
                    />
                  ) : (
                    <React.Fragment>
                      {activeOg.videos ? (
                        <Video
                          og={activeOg}
                          handleClose={(e: any) => {
                            e.preventDefault();
                            this._dismissOg(activeOg);
                          }}
                        />
                      ) : null}
                      {activeOg.audios ? (
                        <Audio
                          og={activeOg}
                          handleClose={(e: any) => {
                            e.preventDefault();
                            this._dismissOg(activeOg);
                          }}
                        />
                      ) : null}
                    </React.Fragment>
                  )}
                </div>
              )}
              {availableOg && availableOg.length > 1 && (
                <React.Fragment>
                  <ol className="raf-status-update-form__url-list">
                    {availableOg.map(({ url, title }) => (
                      <li
                        className={`raf-status-update-form__url-list-item${
                          url === this.state.ogActiveUrl
                            ? ' raf-status-update-form__url-list-item--active'
                            : ''
                        }`}
                        onClick={() =>
                          this.setState((prevState) => {
                            const ogState = prevState.ogStateByUrl[url];
                            if (ogState) {
                              ogState.dismissed = false;
                            }
                            return {
                              ogActiveUrl: url,
                              ogStateByUrl: prevState.ogStateByUrl,
                            };
                          })
                        }
                        key={url}
                      >
                        <FontAwesomeIcon icon={faBookmark} />{' '}
                        {title !== undefined ? title : url}
                      </li>
                    ))}
                  </ol>
                </React.Fragment>
              )}
              {this.state.imageOrder.length > 0 && (
                <ImagePreviewer
                  imageUploads={this.state.imageOrder.map(
                    (id) => this.state.imageUploads[id],
                  )}
                  handleRemove={this._removeImage}
                  handleRetry={this._uploadImage}
                  handleFiles={this._uploadNewFiles}
                />
              )}
              {this.state.fileOrder.length > 0 && (
                <FilePreviewer
                  uploads={this.state.fileOrder.map(
                    (id) => this.state.fileUploads[id],
                  )}
                  handleRemove={this._removeFile}
                  handleRetry={this._uploadFile}
                  handleFiles={this._uploadNewFiles}
                />
              )}
            </PanelContent>
            <PanelFooter>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginRight: '32px', display: 'inline-block' }}>
                    <ImageUploadButton
                      handleFiles={this._uploadNewFiles}
                      multiple
                    />
                  </div>
                  <div style={{ marginRight: '32px', display: 'inline-block' }}>
                    <FileUploadButton
                      handleFiles={this._uploadNewFiles}
                      multiple
                    />
                  </div>
                  <EmojiPicker onSelect={this._onSelectEmoji} />
                  {this.props.FooterItem}
                </div>
                <Button
                  type="submit"
                  buttonStyle="primary"
                  loading={this.state.submitting}
                  disabled={!this._canSubmit()}
                >
                  {t('Post')}
                </Button>
              </div>
            </PanelFooter>
          </ImageDropzone>
        </form>
      </Panel>
    );
  }
}

export default withTranslationContext<Props>(StatusUpdateForm);
