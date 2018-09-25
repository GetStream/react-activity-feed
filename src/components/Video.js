import React from 'react';
import '../styles/Video.css';

/**
 * Component is described here.
 *
 * @example ./examples/Video.md
 */
export default class Video extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
