// @flow
import React from 'react';
import Avatar from './Avatar';
import '../styles/AvatarGroup.css';
import type { UserData } from '../types';

export type Props = {|
  users: UserData[],
  avatarSize: number,
|};

/**
 * Component is described here.
 *
 * @example ./examples/AvatarGroup.md
 */
export default class AvatarGroup extends React.Component<Props> {
  static defaultProps = {
    avatarSize: 30,
  };
  render() {
    return (
      <div className="raf-avatar-group">
        {this.props.users &&
          this.props.users.map((user, i) => (
            <div className="raf-avatar-group__avatar" key={`avatar-${i}`}>
              <Avatar
                image={user && user.profileImage}
                size={this.props.avatarSize}
                circle
              />
            </div>
          ))}
      </div>
    );
  }
}
