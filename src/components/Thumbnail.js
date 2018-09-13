import React from 'react';
import '../App.css';
import '../styles/Thumbnail.css';

/**
 * Component is described here.
 *
 * @example ./examples/Thumbnail.md
 */
export default class Thumbnail extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
