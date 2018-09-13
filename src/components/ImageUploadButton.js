import React from 'react';
import '../App.css';
import '../styles/ImageUploadButton.css';

/**
 * Component is described here.
 *
 * @example ./examples/ImageUploadButton.md
 */
export default class ImageUploadButton extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
