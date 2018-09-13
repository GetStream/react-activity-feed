import React from 'react';
import '../App.css';
import '../styles/CommentList.css';

/**
 * Component is described here.
 *
 * @example ./examples/CommentList.md
 */
export default class CommentList extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
