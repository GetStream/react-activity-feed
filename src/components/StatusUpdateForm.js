// @flow
import * as React from 'react';

import Panel from './Panel';
import PanelHeading from './PanelHeader';
import PanelFooter from './PanelFooter';
import PanelContent from './PanelContent';
import Textarea from './Textarea';
import Avatar from './Avatar';
import Card from './Card';
import Video from './Video';
import Audio from './Audio';
import EmojiPicker from './EmojiPicker';
import ImageUploadButton from './ImageUploadButton';
import FileUploadButton from './FileUploadButton';
import ImagePreviewer from './ImagePreviewer';
import FilePreviewer from './FilePreviewer';
import ImageDropzone from './ImageDropzone';
import Button from './Button';
import Title from './Title';
import LoadingIndicator from './LoadingIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import _ from 'lodash';
import anchorme from 'anchorme';

import { StreamApp } from '../Context';
import {
  generateRandomId,
  dataTransferItemsToFiles,
  dataTransferItemsHaveFiles,
} from '../utils';
import type {
  BaseAppCtx,
  OgData,
  CustomActivityArgData,
  ImageUpload,
  FileUpload,
  FileLike,
} from '../types';

type Props = {|
  feedGroup: string,
  userId?: string,
  activityVerb: string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/StatusUpdateForm.md
 */

export default class StatusUpdateForm extends React.Component<Props> {
  static defaultProps = {
    feedGroup: 'user',
    activityVerb: 'post',
  };

  render() {
    return (
      <StreamApp.Consumer>
        {(appCtx) => <StatusUpdateFormInner {...this.props} {...appCtx} />}
      </StreamApp.Consumer>
    );
  }
}

type OgState = {|
  scrapingActive: boolean,
  data?: ?OgData,
  dismissed: boolean,
|};

type State = {|
  text: string,
  imageUploads: { [string]: ImageUpload },
  imageOrder: Array<string>,
  fileUploads: { [string]: FileUpload },
  fileOrder: Array<string>,
  ogUrlOrder: string[],
  ogStateByUrl: { [string]: OgState },
  ogActiveUrl: ?string,
|};

type PropsInner = {| ...Props, ...BaseAppCtx |};
class StatusUpdateFormInner extends React.Component<PropsInner, State> {
  _handleOgDebounced: (string) => mixed;

  textInputRef = React.createRef();

  state = {
    text: '',
    imageUploads: {},
    imageOrder: [],
    fileUploads: {},
    fileOrder: [],
    ogUrlOrder: [],
    ogStateByUrl: {},
    ogActiveUrl: null,
  };

  constructor(props) {
    super(props);
    this._handleOgDebounced = _.debounce(this.handleOG, 250, {
      leading: true,
      trailing: true,
    });
  }

  handleOG(text) {
    let newUrls;
    let removedUrls;

    const urlInfos = anchorme(text, {
      list: true,
      exclude: (info) =>
        info.protocol !== 'https://' && info.protocol !== 'http://',
    });
    const urls = _.uniq(urlInfos.map((info) => info.protocol + info.encoded));

    this.setState(
      (prevState) => {
        const oldUrls = prevState.ogUrlOrder;
        newUrls = _.difference(urls, oldUrls);
        removedUrls = _.difference(oldUrls, urls);
        const newState: $Shape<State> = {
          ogUrlOrder: urls,
        };

        if (!urls.includes(prevState.ogActiveUrl)) {
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
        return newState;
      },
      () => {
        newUrls.forEach(async (url) => {
          let resp;
          try {
            resp = await this.props.session.og(url);
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
            const newState: $Shape<State> = {
              ogStateByUrl: prevState.ogStateByUrl,
            };
            if (!prevState.ogActiveUrl) {
              newState.ogActiveUrl = url;
            }

            return newState;
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

  _activeOg = (): ?OgData => {
    const { ogActiveUrl } = this.state;

    if (ogActiveUrl) {
      return this.state.ogStateByUrl[ogActiveUrl].data;
    }
  };

  _canSubmit = () =>
    Boolean(this._object()) &&
    this._orderedImages().every((upload) => upload.state !== 'uploading') &&
    this._orderedFiles().every((upload) => upload.state !== 'uploading') &&
    !this._isOgScraping();

  async addActivity() {
    const activity: CustomActivityArgData = {
      actor: this.props.session.user,
      verb: this.props.activityVerb,
      object: this._object(),
    };
    const uploadedImages = this._uploadedImages();
    const uploadedFiles = this._uploadedFiles();

    const attachments = {};
    attachments.og = this._activeOg();

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

    await this.props.session
      .feed(this.props.feedGroup, this.props.userId)
      .addActivity(activity);
  }

  onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await this.addActivity();
    } catch (e) {
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
    });
  };
  _getTextAreaElement = () => this.textInputRef.current;

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

  _uploadNewFiles = (files: $ReadOnlyArray<FileLike>) => {
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
          prevState.imageUploads[id].previewUri = event.target.result;
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

    let response = {};
    response = {};
    try {
      response = await this.props.session.images.upload(file);
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
        return { imageUploads: prevState.imageUploads };
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

    let response = {};
    response = {};
    try {
      response = await this.props.session.files.upload(file);
    } catch (e) {
      console.warn(e);
      await this.setState((prevState) => {
        prevState.fileUploads[id].state = 'failed';
        return { fileUploads: prevState.fileUploads };
      });

      this.props.errorHandler(e, 'upload-image', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    await this.setState((prevState) => {
      prevState.fileUploads[id].state = 'finished';
      prevState.fileUploads[id].url = response.file;
      return { fileUploads: prevState.fileUploads };
    });
  };

  _removeImage = (id: string) => {
    // TODO: cancel upload if still uploading
    this.setState((prevState) => {
      const img = prevState.imageUploads[id];
      if (!img) {
        return {};
      }
      delete prevState.imageUploads[id];
      return {
        imageUploads: prevState.imageUploads,
        imageOrder: prevState.imageOrder.filter((_id) => id !== _id),
      };
    });
  };

  _removeFile = (id: string) => {
    // TODO: cancel upload if still uploading
    this.setState((prevState) => {
      const upload = prevState.fileUploads[id];
      if (!upload) {
        return {};
      }
      delete prevState.fileUploads[id];
      return {
        fileUploads: prevState.fileUploads,
        fileOrder: prevState.fileOrder.filter((_id) => id !== _id),
      };
    });
  };

  _onChange = (event) => {
    if (!event || !event.currentTarget) {
      return '';
    }
    const text = event.currentTarget.value;
    this.setState({ text });
    this._handleOgDebounced(text);
  };

  render() {
    const activeOg = this._activeOg();
    const availableOg = this._availableOg();
    const userData = this.props.user.data || {};
    return (
      <Panel>
        <form onSubmit={this.onSubmitForm}>
          <ImageDropzone handleFiles={this._uploadNewFiles}>
            <PanelHeading>
              <Title>New Post</Title>
            </PanelHeading>
            <PanelContent>
              <div style={{ display: 'flex' }}>
                <React.Fragment>
                  {userData.profileImage && (
                    <div style={{ marginRight: '16px' }}>
                      <Avatar
                        image={
                          // $FlowFixMe
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
                  innerRef={this.textInputRef}
                  placeholder="Type your post... "
                  value={this.state.text}
                  onChange={this._onChange}
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
                    for (const item of items) {
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
                      {...activeOg}
                      nolink
                      handleClose={(e: any) => {
                        e.preventDefault();
                        this._dismissOg(activeOg);
                      }}
                    />
                  ) : (
                    <React.Fragment>
                      {activeOg.videos ? (
                        <Video videos={activeOg.videos} />
                      ) : null}
                      {activeOg.audios ? <Audio og={activeOg} /> : null}
                    </React.Fragment>
                  )}
                </div>
              )}
              {availableOg &&
                availableOg.length > 1 && (
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
                </div>
                <Button
                  type="submit"
                  buttonStyle="primary"
                  disabled={!this._canSubmit()}
                >
                  Post
                </Button>
              </div>
            </PanelFooter>
          </ImageDropzone>
        </form>
      </Panel>
    );
  }
}
