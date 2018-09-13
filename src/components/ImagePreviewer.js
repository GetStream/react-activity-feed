import React from 'react';
import '../App.css';
import '../styles/ImagePreviewer.css';

/**
 * Component is described here.
 *
 * @example ./examples/ImagePreviewer.md
 */
export default class ImagePreviewer extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
