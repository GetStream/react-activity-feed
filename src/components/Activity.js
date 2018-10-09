// @flow

import React from 'react';

import UserBar from './UserBar';
import Card from './Card';
import FileIcon from './FileIcon';
import Gallery from './Gallery';

import type { ActivityData, Renderable } from '../types';
import { smartRender } from '../utils';

type Props = {
  Header?: Renderable,
  Content?: Renderable,
  Footer?: Renderable,
  onPress?: () => mixed,
  onPressAvatar?: () => mixed,
  sub?: string,
  icon?: string,
  activity: ActivityData,
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
          subtitle={this.props.sub}
          timestamp={this.props.activity.time}
          icon={this.props.icon}
          // onPressAvatar={this._getOnPressAvatar()}
        />
      </div>
    );
  };

  isUrl = (str: string) => {
    const urlRegex =
      '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    const url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
  };

  renderText = (text: string) => {
    const newText = text
      .split(' ')
      .map((word, i) => {
        if (word[0] === '@') {
          return (
            <a href="" className="raf-activity__mention" key={`item-${i}`}>
              {word}
            </a>
          );
        } else if (word[0] === '#') {
          return (
            <a href="" className="raf-activity__hashtag" key={`item-${i}`}>
              {word}
            </a>
          );
        } else if (this.isUrl(word)) {
          return (
            <a href={word} className="raf-activity__link" key={`item-${i}`}>
              {word.slice(0, 33)}
              {word.length > 33 && <React.Fragment>&#8230;</React.Fragment>}
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

        {attachments &&
          attachments.og &&
          Object.keys(attachments.og).length > 0 && (
            <div style={{ padding: '8px 16px' }}>
              <Card {...attachments.og} />
            </div>
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
