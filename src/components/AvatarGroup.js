import React from 'react';
import Avatar from './Avatar';

import { userOrDefault } from '../utils';

/**
 * Component is described here.
 *
 * @example ./examples/AvatarGroup.md
 */
export default class AvatarGroup extends React.Component {
  static defaultProps = {
    avatarSize: 30,
    limit: 5,
  };

  _getOnClickUser(user) {
    return this.props.onClickUser ? (e) => this.onClickUser(e, user) : undefined;
  }

  onClickUser = (e, user) => {
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
