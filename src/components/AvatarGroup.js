// @flow
import React from 'react';
import Avatar from './Avatar';
import type { UserResponse } from '../types';
import { userOrDefault } from '../utils';

export type Props = {|
  /* The list of users to display */
  users: UserResponse[],
  /* The size of the avatar in px */
  avatarSize: number,
  /* The limit of avatars to display */
  limit: number,
  /* Callback to call when clicking on a user in the notification */
  onClickUser?: (UserResponse) => mixed,
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

  _getOnClickUser(user: UserResponse) {
    return this.props.onClickUser
      ? (e: SyntheticEvent<>) => this.onClickUser(e, user)
      : undefined;
  }

  onClickUser = (e: SyntheticEvent<>, user: UserResponse) => {
    const { onClickUser } = this.props;
    if (onClickUser) {
      e.stopPropagation();
      return onClickUser(userOrDefault(user));
    }
  };

  render() {
    return (
      <div className="raf-avatar-group">
        {this.props.users &&
          this.props.users.slice(0, this.props.limit).map((user, i) => (
            <div className="raf-avatar-group__avatar" key={`avatar-${i}`}>
              <Avatar
                onClick={this._getOnClickUser(user)}
                image={user && user.data.profileImage}
                size={this.props.avatarSize}
                circle
              />
            </div>
          ))}
      </div>
    );
  }
}
