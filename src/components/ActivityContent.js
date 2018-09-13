import React from 'react';
import '../App.css';
import '../styles/ActivityContent.css';

/**
 * Component is described here.
 *
 * @example ./examples/ActivityContent.md
 */
export default class ActivityContent extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
