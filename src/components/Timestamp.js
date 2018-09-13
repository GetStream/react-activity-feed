import React from 'react';
import '../App.css';
import '../styles/Timestamp.css';

/**
 * Component is described here.
 *
 * @example ./examples/Timestamp.md
 */
export default class Timestamp extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
