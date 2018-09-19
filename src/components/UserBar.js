// @flow
import React from 'react';
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
    return (
      <div className="raf-user-bar">
        <Avatar size={50} circle />
        <div className="raf-user-bar__details">
          <p className="raf-user-bar__username">Username</p>
          <p className="raf-user-bar__subtitle">Subtitle</p>
        </div>
        <div className="raf-user-bar__extra">time</div>
      </div>
    );
  }
}
