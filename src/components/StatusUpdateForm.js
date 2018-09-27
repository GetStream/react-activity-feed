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
import Button from './Button';
import _ from 'lodash';

import { StreamApp } from '../Context';
import type { BaseAppCtx, OgData, CustomActivityArgData } from '../types';

const ImageState = Object.freeze({
  NO_IMAGE: Symbol('no_image'),
  UPLOADING: Symbol('uploading'),
  UPLOADED: Symbol('uploaded'),
  UPLOAD_FAILED: Symbol('upload_failed'),
});

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
  image: ?string,
  imageUrl: ?string,
  imageState: $Values<typeof ImageState>,
  og: ?OgData,
  ogScraping: boolean,
  ogLink: ?string,
  textFromInput: string,
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
    image: null,
    imageUrl: null,
    imageState: ImageState.NO_IMAGE,
    og: null,
    ogScraping: false,
    ogLink: null,
    textFromInput: '',
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

  _text = () => this.state.textFromInput.trim();

  _object = () => {
    if (this.state.imageUrl) {
      return this.state.imageUrl;
    }
    return this._text();
  };

  _canSubmit = () => Boolean(this._object());

  async addActivity() {
    const activity: CustomActivityArgData = {
      actor: this.props.session.user,
      verb: this.props.activityVerb,
      object: this._object(),
    };

    const attachments = {};

    if (this.state.og && Object.keys(this.state.og).length > 0) {
      attachments.og = this.state.og;
    }

    if (this.state.imageUrl) {
      attachments.images = [this.state.imageUrl];
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
      image: null,
      imageUrl: null,
      imageState: ImageState.NO_IMAGE,
      og: null,
      ogScraping: false,
      ogLink: null,
      textFromInput: '',
      focused: false,
      urls: [],
      dismissedUrls: [],
    });
  };

  render() {
    return (
      <Panel>
        <form onSubmit={this.onSubmitForm}>
          <PanelHeading>New Post</PanelHeading>
          <PanelContent>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '16px' }}>
                <Avatar size={50} circle />
              </div>
              <Textarea
                placeholder="Type your post... "
                value={this.state.textFromInput}
                onChange={(event) => {
                  if (!event || !event.currentTarget) {
                    return;
                  }
                  const text = event.currentTarget.value;
                  console.log(text);
                  this.setState({ textFromInput: text });
                  this._handleOgDebounced(text);
                }}
              />
            </div>
            {this.state.og && <Card {...this.state.og} />}
          </PanelContent>
          <PanelFooter>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <div style={{ marginRight: '32px', display: 'inline-block' }}>
                  <ImageUploadButton />
                </div>
                <EmojiPicker />
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
        </form>
      </Panel>
    );
  }
}
