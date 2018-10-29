// @flow

import React from 'react';
import anchorme from 'anchorme';

import UserBar from './UserBar';
import Card from './Card';
import Audio from './Audio';
import Video from './Video';
import FileIcon from './FileIcon';
import Gallery from './Gallery';
import Dropdown from './Dropdown';
import Link from './Link';

import type { ActivityData, Renderable } from '../types';
import { smartRender, humanizeTimestamp } from '../utils';

import { truncate } from 'lodash';

type Props = {
  Header?: Renderable,
  Content?: Renderable,
  Footer?: Renderable,
  onPress?: () => mixed,
  onClickAvatar?: () => mixed,
  sub?: string,
  icon?: string,
  activity: ActivityData,
  /** Handler for any routing you may do on clicks on Hashtags */
  onClickHashtag: (word: string) => mixed,
  /** Handler for any routing you may do on clicks on Mentions */
  onClickMention: (word: string) => mixed,
};

/**
 * Component is described here.
 *
 * @example ./examples/Activity.md
 */
export default class Activity extends React.Component<Props> {
  renderHeader = () => {
    let { actor } = this.props.activity;
    const notFound = {
      id: '!not-found',
      created_at: '',
      updated_at: '',
      data: { name: 'Unknown', profileImage: '' },
    };
    if (actor === 'NotFound') {
      actor = notFound;
    }

    return (
      <div style={{ padding: '8px 16px' }}>
        <UserBar
          username={actor.data.name}
          avatar={actor.data.profileImage}
          onClickAvatar={
            this.props.onClickAvatar
              ? this.props.onClickAvatar
              : // $FlowFixMe
                this.onClickAvatar
          }
          subtitle={humanizeTimestamp(this.props.activity.time)}
          timestamp={this.props.activity.time}
          icon={this.props.icon}
          Right={() => (
            <Dropdown>
              <ul>
                <li>
                  <Link>View Post</Link>
                </li>
                <li>
                  <Link>Embed</Link>
                </li>
                <li>
                  <Link>Unfollow</Link>
                </li>
                <li>
                  <Link>Repost User</Link>
                </li>
                <li>
                  <Link>Block User</Link>
                </li>
              </ul>
            </Dropdown>
          )}
        />
      </div>
    );
  };

  onClickAvatar = (e: SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('clicked on Avatar in Activity');
  };

  renderText = (text: string) => {
    const newText = text
      .split(' ')
      .map((word, i) => {
        if (word[0] === '@') {
          return (
            <a
              onClick={
                this.props.onClickMention &&
                (() => this.props.onClickMention(word))
              }
              className="raf-activity__mention"
              key={`item-${i}`}
            >
              {word}
            </a>
          );
        } else if (word[0] === '#') {
          return (
            <a
              onClick={
                this.props.onClickHashtag &&
                (() => this.props.onClickHashtag(word))
              }
              className="raf-activity__hashtag"
              key={`item-${i}`}
            >
              {word}
            </a>
          );
        } else if (
          anchorme.validate.url(word) ||
          anchorme.validate.email(word)
        ) {
          const link = anchorme(word, { list: true });
          if (link[0].protocol === 'ftp://' || link[0].protocol === 'file://') {
            return word;
          }
          const url = link[0].protocol + link[0].encoded;
          const urlText = truncate(link[0].encoded, { length: 33 });
          return (
            <a
              href={url}
              className="raf-activity__link"
              target="blank"
              rel="noopener"
              key={`item-${i}`}
            >
              {urlText}
            </a>
          );
        } else {
          return word;
        }
      })
      .reduce((accu, elem) => (accu === null ? [elem] : [accu, ' ', elem]));
    return <p>{newText}</p>;
  };

  renderContent = () => {
    // return null;
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
      <div>
        {Boolean(text) && (
          <div style={{ padding: '8px 16px' }}>{this.renderText(text)}</div>
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
                <Video videos={attachments.og.videos} />
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

        {attachments.images &&
          Boolean(attachments.images.length) && (
            <div style={{ padding: '8px 0' }}>
              <Gallery images={attachments.images} />
            </div>
          )}

        {attachments.files &&
          Boolean(attachments.files.length) && (
            <ol className="raf-activity__attachments">
              {attachments.files.map(({ name, url, mimeType }, i) => (
                <a href={url} key={i}>
                  <li className="raf-activity__file">
                    <FileIcon mimeType={mimeType} /> {name}
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
