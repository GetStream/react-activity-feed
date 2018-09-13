import React from 'react';
import '../App.css';
import '../styles/AvatarGroup.css';

/**
 * Component is described here.
 *
 * @example ./examples/AvatarGroup.md
 */
export default class AvatarGroup extends React.Component {
  render() {
    return <div className="raf-avatar-group">{this.props.children}</div>;
  }
}
