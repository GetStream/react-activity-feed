// @flow
import React from 'react';
import { humanizeTimestamp } from '../utils';
import Avatar from './Avatar';

import type { Renderable } from '../types';

import { smartRender } from '../utils';

export type Props = {|
  username: ?string,
  avatar?: string,
  subtitle?: string,
  time?: string, // text that should be displayed as the time
  timestamp?: string | number, // a timestamp that should be humanized
  icon?: string,
  onClickUser?: () => mixed,
  follow?: boolean,
  Right?: Renderable,
|};

/**
 * Component is described here.
 *
 * @example ./examples/UserBar.md
 */
export default class UserBar extends React.Component<Props> {
  render() {
    let time = this.props.time;
    if (time === undefined && this.props.timestamp != null) {
      time = humanizeTimestamp(this.props.timestamp);
    }
    return (
      <div className="raf-user-bar">
        {this.props.avatar ? (
          <Avatar
            onClick={this.props.onClickUser}
            size={50}
            circle
            image={this.props.avatar}
          />
        ) : null}
        <div className="raf-user-bar__details">
          <p
            className="raf-user-bar__username"
            onClick={this.props.onClickUser}
          >
            {this.props.username}
          </p>
          {this.props.icon !== undefined ? (
            <img src={this.props.icon} alt="icon" />
          ) : null}
          {this.props.subtitle ? (
            <p className="raf-user-bar__subtitle">
              <time
                dateTime={this.props.timestamp}
                title={this.props.timestamp}
              >
                {this.props.subtitle}
              </time>
            </p>
          ) : null}
        </div>
        <React.Fragment>
          {smartRender(this.props.Right, {}, () => (
            <p className="raf-user-bar__extra">
              <time
                dateTime={this.props.timestamp}
                title={this.props.timestamp}
              >
                {time}
              </time>
            </p>
          ))}
        </React.Fragment>
      </div>
    );
  }
}
