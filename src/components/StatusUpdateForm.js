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
import ImageDropzone from './ImageDropzone';
import Button from './Button';
import _ from 'lodash';

import { StreamApp } from '../Context';
import { generateRandomId } from '../utils';
import type {
  BaseAppCtx,
  OgData,
  CustomActivityArgData,
  Image,
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
  _getTextAreaElement = () => {
    const currentTextArea = this.textInputRef.current;
    if (!currentTextArea) {
      return null;
    }

    return currentTextArea.element.current;
  };

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

  _uploadNewImages = (files: File[]) => {
    for (const file of files) {
      this._uploadNewImage(file);
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

  render() {
    return (
      <Panel>
        <form onSubmit={this.onSubmitForm}>
          <ImageDropzone handleFiles={this._uploadNewImages}>
            <PanelHeading>New Post</PanelHeading>
            <PanelContent>
              <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '16px' }}>
                  <Avatar size={50} circle />
                </div>
                <Textarea
                  ref={this.textInputRef}
                  placeholder="Type your post... "
                  value={this.state.text}
                  onChange={(event) => {
                    if (!event || !event.currentTarget) {
                      return;
                    }
                    const text = event.currentTarget.value;
                    this.setState({ text });
                    this._handleOgDebounced(text);
                  }}
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
                  handleFiles={this._uploadNewImages}
                />
              )}
            </PanelContent>
            <PanelFooter>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ marginRight: '32px', display: 'inline-block' }}>
                    <ImageUploadButton
                      handleFiles={this._uploadNewImages}
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
