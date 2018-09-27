// @flow
import React from 'react';
import Avatar from './Avatar';
import type { UserData } from '../types';

export type Props = {|
  users: UserData[],
  avatarSize: number,
  limit: number,
|};

/**
 * Component is described here.
 *
 * @example ./examples/AvatarGroup.md
 */
export default class AvatarGroup extends React.Component<Props> {
  static defaultProps = {
    avatarSize: 30,
    limit: 5,
  };
  render() {
    return (
      <div className="raf-avatar-group">
        {this.props.users &&
          this.props.users.slice(0, this.props.limit).map((user, i) => (
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
