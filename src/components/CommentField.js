import React from 'react';
import '../App.css';
import '../styles/CommentField.css';

/**
 * Component is described here.
 *
 * @example ./examples/CommentField.md
 */
export default class CommentField extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
