// @flow
import * as React from 'react';

import Panel from './Panel';
import PanelHeading from './PanelHeader';
import PanelFooter from './PanelFooter';
import PanelContent from './PanelContent';
import Textarea from './Textarea';
import Avatar from './Avatar';
import Card from './Card';
import EmojiPicker from './EmojiPicker';
import ImageUploadButton from './ImageUploadButton';
import FileUploadButton from './FileUploadButton';
import ImagePreviewer from './ImagePreviewer';
import FilePreviewer from './FilePreviewer';
import ImageDropzone from './ImageDropzone';
import LoadingIndicator from './LoadingIndicator';
import Button from './Button';
import Title from './Title';
import _ from 'lodash';

import { StreamApp } from '../Context';
import { generateRandomId } from '../utils';
import type {
  BaseAppCtx,
  OgData,
  CustomActivityArgData,
  ImageUpload,
  FileUpload,
} from '../types';

const urlRegex = /(https?:\/\/[^\s]+)/gi;

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

type State = {|
  imageUploads: { [string]: ImageUpload },
  imageOrder: Array<string>,
  fileUploads: { [string]: FileUpload },
  fileOrder: Array<string>,
  og: ?OgData,
  ogScraping: boolean,
  ogLink: ?string,
  text: string,
  clearInput: boolean,
  focused: boolean,
  urls: Array<string>,
  dismissedUrls: Array<string>,
|};

type PropsInner = {| ...Props, ...BaseAppCtx |};
class StatusUpdateFormInner extends React.Component<PropsInner, State> {
  _handleOgDebounced: (string) => mixed;

  textInputRef = React.createRef();

  state = {
    imageUploads: {},
    imageOrder: [],
    fileUploads: {},
    fileOrder: [],
    og: null,
    ogScraping: false,
    ogLink: null,
    text: '',
    clearInput: false,
    focused: false,
    urls: [],
    dismissedUrls: [],
  };

  constructor(props) {
    super(props);
    this._handleOgDebounced = _.debounce(this.handleOG, 250);
  }

  handleOG(text) {
    if (this.state.ogScraping) {
      return;
    }
    const urls = text.match(urlRegex);

    if (!urls) {
      this.setState({
        og: null,
        ogLink: null,
      });
      return;
    }

    urls.forEach((url) => {
      if (
        url !== this.state.ogLink &&
        !(this.state.dismissedUrls.indexOf(url) > -1) &&
        !this.state.og &&
        urls.indexOf(url) > -1
      ) {
        this.setState({
          ogScraping: true,
          ogLink: url,
          og: url === this.state.ogLink ? this.state.og : null,
        });
        this.props.session
          .og(url)
          .then((resp) => {
            const oldStateUrls = this.state.urls;
            this.setState(
              {
                og: Object.keys(resp).length > 0 ? { ...resp, url } : null, // Added url manually from the entered URL
                ogScraping: false,
                urls: [...oldStateUrls, url],
              },
              () => text.replace(url, ''),
            );
          })
          .catch((err) => {
            console.warn(err);
            this.setState({
              ogScraping: false,
              og: null,
            });
          });
      }
    });
  }

  _dismissOg = (og) => {
    if (og && (og.url !== null || og.url !== undefined)) {
      this.setState({
        og: null,
        dismissedUrls: [...this.state.dismissedUrls, og.url],
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

  _canSubmit = () =>
    Boolean(this._object()) &&
    this._orderedImages().every((upload) => upload.state !== 'uploading') &&
    this._orderedFiles().every((upload) => upload.state !== 'uploading');

  async addActivity() {
    const activity: CustomActivityArgData = {
      actor: this.props.session.user,
      verb: this.props.activityVerb,
      object: this._object(),
    };
    const uploadedImages = this._uploadedImages();
    const uploadedFiles = this._uploadedFiles();

    const attachments = {};

    if (this.state.og && Object.keys(this.state.og).length > 0) {
      attachments.og = this.state.og;
    }

    if (uploadedImages) {
      attachments.images = uploadedImages
        .map((image) => image.url)
        .filter(Boolean);
      activity.text = this._text();
    }
    if (uploadedFiles) {
      attachments.files = uploadedFiles.map((upload) => ({
        file: upload.url,
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

  onSubmitForm = async () => {
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
      imageUploads: {},
      imageOrder: [],
      og: null,
      ogScraping: false,
      ogLink: null,
      text: '',
      focused: false,
      urls: [],
      dismissedUrls: [],
    });
  };
  _getTextAreaElement = () => this.textInputRef.current;

  _onSelectEmoji = async (emoji) => {
    let newCursorPosition;

    await this.setState((prevState) => {
      const prevText = prevState.text;
      const textareaElement = this._getTextAreaElement();
      if (!textareaElement) {
        return { text: prevText + emoji.native };
      }
      // Insert emoji at previous cursor position
      const { selectionStart, selectionEnd } = textareaElement;
      newCursorPosition = selectionStart + emoji.native.length;
      return {
        text:
          prevText.slice(0, selectionStart) +
          emoji.native +
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

  _uploadNewFiles = (files: Blob[]) => {
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        this._uploadNewImage(file);
      } else {
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

  _uploadNewFile = async (file) => {
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
    return (
      <Panel>
        <form onSubmit={this.onSubmitForm}>
          <ImageDropzone handleFiles={this._uploadNewFiles}>
            <PanelHeading>
              <Title>New Post</Title>
            </PanelHeading>
            <PanelContent>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '16px' }}>
                  <Avatar size={50} circle />
                </div>
                <Textarea
                  innerRef={this.textInputRef}
                  placeholder="Type your post... "
                  value={this.state.text}
                  onChange={this._onChange}
                />
              </div>
              {this.state.ogScraping && <LoadingIndicator />}
              {this.state.og && (
                <div style={{ margin: '8px 0' }}>
                  <Card
                    {...this.state.og}
                    handleClose={(e: any) => {
                      e.preventDefault();
                      this._dismissOg(this.state.og);
                    }}
                  />
                </div>
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
