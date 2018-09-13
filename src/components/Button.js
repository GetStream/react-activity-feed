import React from 'react';
import '../App.css';
import '../styles/Button.css';

/**
 * Component is described here.
 *
 * @example ./examples/Button.md
 */
export default class Button extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
