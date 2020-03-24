// @flow

import React from 'react';

import UserBar from './UserBar';
import Card from './Card';
import Audio from './Audio';
import Video from './Video';
import { FileIcon } from 'react-file-utils';
import Gallery from './Gallery';

import type { ActivityData, Renderable } from '../types';
import type { Streami18Ctx } from '../Context';

import {
  smartRender,
  sanitizeURL,
  userOrDefault,
  textRenderer,
  humanizeTimestamp,
} from '../utils';
import { withTranslationContext } from '../Context';

type Props = {
  Header?: Renderable,
  Content?: Renderable,
  Footer?: Renderable,
  HeaderRight?: Renderable,
  onClickUser?: (?any) => mixed,
  sub?: string,
  icon?: string,
  activity: ActivityData,
  /** Handler for any routing you may do on clicks on Hashtags */
  onClickHashtag?: (word: string) => mixed,
  /** Handler for any routing you may do on clicks on Mentions */
  onClickMention?: (word: string) => mixed,
} & Streami18Ctx;

/**
 * Component is described here.
 *
 * @example ./examples/Activity.md
 */
class Activity extends React.Component<Props> {
  _getOnClickUser() {
    return this.props.onClickUser ? this.onClickUser : undefined;
  }

  renderHeader = () => {
    const { tDateTimeParser } = this.props;
    const actor = userOrDefault(this.props.activity.actor);

    return (
      <div style={{ padding: '8px 16px' }}>
        <UserBar
          username={actor.data.name}
          avatar={actor.data.profileImage}
          onClickUser={this._getOnClickUser()}
          subtitle={
            this.props.HeaderRight != null
              ? humanizeTimestamp(this.props.activity.time, tDateTimeParser)
              : undefined
          }
          timestamp={this.props.activity.time}
          icon={this.props.icon}
          Right={this.props.HeaderRight}
        />
      </div>
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

    if (text === undefined) {
      if (typeof this.props.activity.object === 'string') {
        text = this.props.activity.object;
      } else {
        text = '';
      }
    }
    text = text.trim();
    const { attachments = {} } = this.props.activity;

    return (
      <div className="raf-activity__content">
        {!!text && (
          <div style={{ padding: '8px 16px' }}>
            <p>
              {textRenderer(
                text,
                'raf-activity',
                this.props.onClickMention,
                this.props.onClickHashtag,
              )}
            </p>
          </div>
        )}

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
    return (
      <div className="raf-activity">
        <React.Fragment>
          {smartRender(this.props.Header, {}, this.renderHeader)}
          {smartRender(this.props.Content, {}, this.renderContent)}
          {smartRender(this.props.Footer, {}, this.renderFooter)}
        </React.Fragment>
      </div>
    );
  }
}

export default withTranslationContext(Activity);
