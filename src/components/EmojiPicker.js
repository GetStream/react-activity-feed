import React from 'react';
import '../App.css';
import '../styles/EmojiPicker.css';

/**
 * Component is described here.
 *
 * @example ./examples/EmojiPicker.md
 */
export default class EmojiPicker extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
