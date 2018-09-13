import React from 'react';
import '../App.css';
import '../styles/LikeButton.css';

/**
 * Component is described here.
 *
 * @example ./examples/LikeButton.md
 */
export default class LikeButton extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
