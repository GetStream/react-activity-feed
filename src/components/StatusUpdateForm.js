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
import ImagePreviewer from './ImagePreviewer';
import FilePreviewer from './FilePreviewer';
import ImageDropzone from './ImageDropzone';
import Button from './Button';
import Title from './Title';
import _ from 'lodash';

import { StreamApp } from '../Context';
import { generateRandomId } from '../utils';
import type {
  BaseAppCtx,
  OgData,
  CustomActivityArgData,
  Image,
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
  images: { [string]: Image },
  imageOrder: Array<string>,
  files: { [string]: FileUpload },
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
    images: {},
    imageOrder: [],
    files: {},
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
    this.state.imageOrder.map((id) => this.state.images[id]);

  _uploadedImages = (): Array<Image> =>
    this._orderedImages().filter((image) => image.url);

  _canSubmit = () =>
    Boolean(this._object()) &&
    this._orderedImages().every((image) => image.state !== 'uploading');

  async addActivity() {
    const uploadedImages = this._uploadedImages();
    const activity: CustomActivityArgData = {
      actor: this.props.session.user,
      verb: this.props.activityVerb,
      object: this._object(),
    };

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
      images: {},
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
      prevState.images[id] = {
        id,
        file,
        state: 'uploading',
      };
      return {
        imageOrder: prevState.imageOrder.concat(id),
        images: prevState.images,
      };
    });
    if (FileReader) {
      // TODO: Possibly use URL.createObjectURL instead. However, then we need
      // to release the previews when not used anymore though.
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState((prevState) => {
          prevState.images[id].previewUri = event.target.result;
          return { images: prevState.images };
        });
      };
      reader.readAsDataURL(file);
    }
    return this._uploadImage(id);
  };

  _uploadNewFile = async (file) => {
    const id = generateRandomId();

    await this.setState((prevState) => {
      prevState.files[id] = {
        id,
        file,
        state: 'uploading',
      };
      return {
        fileOrder: prevState.fileOrder.concat(id),
        files: prevState.files,
      };
    });

    return this._uploadFile(id);
  };

  _uploadImage = async (id: string) => {
    const img = this.state.images[id];
    if (!img) {
      return;
    }
    const { file } = img;

    await this.setState((prevState) => {
      prevState.images[id].state = 'uploading';
      return { images: prevState.images };
    });

    let response = {};
    response = {};
    try {
      response = await this.props.session.images.upload(file);
    } catch (e) {
      console.warn(e);
      await this.setState((prevState) => {
        prevState.images[id].state = 'failed';
        return { images: prevState.images };
      });

      this.props.errorHandler(e, 'upload-image', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    await this.setState((prevState) => {
      prevState.images[id].state = 'finished';
      prevState.images[id].url = response.file;
      return { images: prevState.images };
    });
  };

  _uploadFile = async (id: string) => {
    const upload = this.state.files[id];
    if (!upload) {
      return;
    }
    const { file } = upload;

    await this.setState((prevState) => {
      prevState.files[id].state = 'uploading';
      return { files: prevState.files };
    });

    let response = {};
    response = {};
    try {
      response = await this.props.session.files.upload(file);
    } catch (e) {
      console.warn(e);
      await this.setState((prevState) => {
        prevState.files[id].state = 'failed';
        return { files: prevState.files };
      });

      this.props.errorHandler(e, 'upload-image', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    await this.setState((prevState) => {
      prevState.files[id].state = 'finished';
      prevState.files[id].url = response.file;
      return { files: prevState.files };
    });
  };

  _removeImage = (id: string) => {
    this.setState((prevState) => {
      const img = prevState.images[id];
      if (!img) {
        return {};
      }
      delete prevState.images[id];
      return {
        images: prevState.images,
        imageOrder: prevState.imageOrder.filter((_id) => id !== _id),
      };
    });
  };

  _removeFile = (id: string) => {
    this.setState((prevState) => {
      const upload = prevState.files[id];
      if (!upload) {
        return {};
      }
      delete prevState.files[id];
      return {
        files: prevState.files,
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
              {this.state.og && <Card {...this.state.og} />}
              {this.state.imageOrder.length > 0 && (
                <ImagePreviewer
                  images={this.state.imageOrder.map(
                    (id) => this.state.images[id],
                  )}
                  handleRemove={this._removeImage}
                  handleRetry={this._uploadImage}
                  handleFiles={this._uploadNewFiles}
                />
              )}
              {this.state.fileOrder.length > 0 && (
                <FilePreviewer
                  uploads={this.state.fileOrder.map(
                    (id) => this.state.files[id],
                  )}
                  handleRemove={this._removeFile}
                  handleRetry={this._uploadFile}
                  handleFiles={this._uploadNewFiles}
                />
              )}
            </PanelContent>
            <PanelFooter>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginRight: '32px', display: 'inline-block' }}>
                    <ImageUploadButton
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
