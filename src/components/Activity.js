// @flow

import React from 'react';
import '../styles/Activity.css';

import UserBar from './UserBar';
import Card from './Card';
import Image from './Image';

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
  imageWidth?: number,
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
      <UserBar
        username={actor.data.name}
        avatar={actor.data.profileImage}
        subtitle={this.props.sub}
        timestamp={this.props.activity.time}
        icon={this.props.icon}
        // onPressAvatar={this._getOnPressAvatar()}
      />
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
          <div>
            <p>{text}</p>
          </div>
        )}

        {this.props.activity.verb === 'repost' &&
          this.props.activity.object instanceof Object && (
            <Card {...this.props.activity.object.data} />
          )}

        {Boolean(this.props.activity.image) && (
          <Image
            source={this.props.activity.image}
            // resizeMethod="resize"
          />
        )}

        {this.props.activity.attachments &&
          this.props.activity.attachments.images &&
          Boolean(this.props.activity.attachments.images.length) && (
            <Image
              source={this.props.activity.attachments.images[0]}
              // resizeMethod="resize"
            />
          )}

        {this.props.activity.attachments &&
          this.props.activity.attachments.og &&
          Object.keys(this.props.activity.attachments.og).length > 0 && (
            <Card
              title={this.props.activity.attachments.og.title}
              description={this.props.activity.attachments.og.description}
              image={
                this.props.activity.attachments.og.images
                  ? this.props.activity.attachments.og.images[0].image
                  : null
              }
              url={this.props.activity.attachments.og.url}
            />
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
