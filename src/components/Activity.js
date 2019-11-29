// @flow

import React from 'react';

import UserBar from './UserBar';
import Card from './Card';
import Audio from './Audio';
import Video from './Video';
import { FileIcon } from 'react-file-utils';
import Gallery from './Gallery';
import type { ActivityData, Renderable } from '../types';
import {
  smartRender,
  sanitizeURL,
  humanizeTimestamp,
  userOrDefault,
  textRenderer,
} from '../utils';

type Props = {
  Header?: Renderable,
  Content?: Renderable,
  Footer?: Renderable,
  HeaderRight?: Renderable,
  onPress?: () => mixed,
  onClickUser?: (?any) => mixed,
  sub?: string,
  icon?: string,
  activity: ActivityData,
  /** Handler for any routing you may do on clicks on Hashtags */
  onClickHashtag?: (word: string) => mixed,
  /** Handler for any routing you may do on clicks on Mentions */
  onClickMention?: (word: string) => mixed,
};

/**
 * Component is described here.
 *
 * @example ./examples/Activity.md
 */
export default class Activity extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      contentEdited: null,
    };
  }

  handleEdit = () => {
    const { editMode } = this.state;

    this.setState({
      editMode: !editMode,
    });
  };

  handleUpdate = (editContent) => {
    const { editMode } = this.state;

    this.setState({
      editMode: !editMode,
      contentEdited: editContent,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      editMode: false,
    });
  };

  _getOnClickUser() {
    return this.props.onClickUser ? this.onClickUser : undefined;
  }

  renderHeader = () => {
    const actor = userOrDefault(this.props.activity.actor);

    return (
      <UserBar
        username={actor.data.name}
        avatar={actor.data.profileImage}
        onClickUser={this._getOnClickUser()}
        subtitle={
          this.props.HeaderRight != null
            ? humanizeTimestamp(this.props.activity.time)
            : undefined
        }
        timestamp={this.props.activity.time}
        icon={this.props.icon}
        Right={this.props.HeaderRight}
        handleEdit={this.handleEdit}
      />
    );
  };

  onClickUser = () => {
    const { onClickUser } = this.props;
    if (onClickUser) {
      return onClickUser(userOrDefault(this.props.activity.actor));
    }
  };

  renderContent = () => {
    let { text } = this.props.activity;
    const { contentEdited } = this.state;

    if (!contentEdited) {
      if (text === undefined) {
        if (typeof this.props.activity.object === 'string') {
          text = this.props.activity.object;
        } else {
          text = '';
        }
      }

      text = text.trim();
    } else text = contentEdited;

    const textReduced = this.props.SeeMore ? (text.length > 500 ? text.slice(0,500) + '...'  : text) : text

    const { attachments = {}, id } = this.props.activity;
    return (
      <div>
        {!!text && (
          <div className="pre-line break-word">
            {textRenderer(
              textReduced,
              'raf-activity',
              this.props.onClickMention,
              this.props.onClickHashtag,
            )}
          </div> 
        )}

        {this.props.SeeMore && text.length > 500 ? smartRender(
          this.props.SeeMore,{},() => {},
        ) : ''}
 
        {this.props.activity.verb === 'repost' &&
          this.props.activity.object instanceof Object && (
            <Card {...this.props.activity.object.data} />
          )}

        {attachments &&
          attachments.og &&
          Object.keys(attachments.og).length > 0 && (
            <div style={{ padding: '8px 16px' }}>
              {attachments.og.videos ? (
                <Video og={attachments.og} />
              ) : attachments.og.audios ? (
                <Audio og={attachments.og} />
              ) : (
                <Card {...attachments.og} />
              )}
            </div>
          )}

        {Boolean(this.props.activity.image) &&
        this.props.activity.image !== undefined ? (
          <div style={{ padding: '8px 0' }}>
            <Gallery
              images={[this.props.activity.image]}
              // resizeMethod="resize"
            />
          </div>
        ) : null}

        {attachments.images && Boolean(attachments.images.length) && (
          <div style={{ padding: '8px 0' }}>
            <Gallery images={attachments.images} />
          </div>
        )}

        {attachments.files && Boolean(attachments.files.length) && (
          <ol className="raf-activity__attachments">
            {attachments.files.map(({ name, url, mimeType }, i) => (
              <a href={sanitizeURL(url)} download key={i}>
                <li className="raf-activity__file">
                  <FileIcon mimeType={mimeType} filename={name} /> {name}
                </li>
              </a>
            ))}
          </ol>
        )}
      </div>
    );
  };

  renderFooter = () => null;

  render() {
    const { editMode, contentEdited } = this.state;
    const { activity } = this.props;

    return (
      <React.Fragment>
        {editMode ? (
          smartRender(
            this.props.EditFeed,
            {
              content: contentEdited ? contentEdited : activity.object,
              handleUpdate: this.handleUpdate,
              handleCloseEdit: this.handleCloseEdit,
            },
            () => {},
          )
        ) : (
          <div className="feed-body bg-white margin-bottom-15">
            <div className="feed-content">
              {smartRender(this.props.Header, {}, this.renderHeader)}
              {smartRender(this.props.Content, {}, this.renderContent)}
              {smartRender(this.props.Footer, {}, this.renderFooter)}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
