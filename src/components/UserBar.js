// @flow
import React from 'react';
import { humanizeTimestamp } from '../utils';
import Avatar from './Avatar';
import '../styles/UserBar.css';

export type Props = {|
  username: ?string,
  avatar?: string,
  subtitle?: string,
  time?: string, // text that should be displayed as the time
  timestamp?: string | number, // a timestamp that should be humanized
  icon?: string,
  onPressAvatar?: () => mixed,
  follow?: boolean,
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
          <Avatar size={50} circle image={this.props.avatar} />
        ) : null}
        <div className="raf-user-bar__details">
          <p className="raf-user-bar__username">{this.props.username}</p>
          {this.props.icon !== undefined ? (
            <img src={this.props.icon} alt="icon" />
          ) : null}
          {this.props.subtitle ? (
            <p className="raf-user-bar__subtitle">{this.props.subtitle}</p>
          ) : null}
        </div>
        {time && <div className="raf-user-bar__extra">{time}</div>}
        {this.props.follow && <div className="raf-user-bar__extra">time</div>}
      </div>
    );
  }
}
