import React from 'react';
import '../App.css';
import '../styles/Image.css';

/**
 * Component is described here.
 *
 * @example ./examples/Image.md
 */
export default class Image extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
