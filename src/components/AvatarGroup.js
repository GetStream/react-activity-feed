import React from 'react';
import Avatar from './Avatar';
import '../styles/AvatarGroup.css';

/**
 * Component is described here.
 *
 * @example ./examples/AvatarGroup.md
 */
export default class AvatarGroup extends React.Component {
  render() {
    return (
      <div className="raf-avatar-group">
        {this.props.users &&
          this.props.users.map((user, i) => (
            <div className="raf-avatar-group__avatar" key={`avatar-${i}`}>
              <Avatar
                image={(user && user.image) || null}
                size={this.props.avatarSize}
                circle
              />
            </div>
          ))}
      </div>
    );
  }
}
