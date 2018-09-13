import React from 'react';
import '../App.css';
import '../styles/TimeHeader.css';

/**
 * Component is described here.
 *
 * @example ./examples/TimeHeader.md
 */
export default class TimeHeader extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
