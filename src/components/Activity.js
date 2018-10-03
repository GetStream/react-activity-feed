// @flow

import React from 'react';

import UserBar from './UserBar';
import Card from './Card';
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

    return (
      <div>
        {Boolean(text) && (
          <div style={{ padding: '8px 16px' }}>
            <p>{text}</p>
          </div>
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

        {this.props.activity.attachments &&
          this.props.activity.attachments.images &&
          Boolean(this.props.activity.attachments.images.length) && (
            <div style={{ padding: '8px 0' }}>
              <Gallery images={this.props.activity.attachments.images} />
            </div>
          )}

        {this.props.activity.attachments &&
          this.props.activity.attachments.og &&
          Object.keys(this.props.activity.attachments.og).length > 0 && (
            <div style={{ padding: '8px 16px' }}>
              <Card {...this.props.activity.attachments.og} />
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
