import React from 'react';
import '../App.css';
import '../styles/InputField.css';

/**
 * Component is described here.
 *
 * @example ./examples/InputField.md
 */
export default class InputField extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
