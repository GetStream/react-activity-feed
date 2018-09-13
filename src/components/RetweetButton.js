import React from 'react';
import '../App.css';
import '../styles/RetweetButton.css';

/**
 * Component is described here.
 *
 * @example ./examples/RetweetButton.md
 */
export default class RetweetButton extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
