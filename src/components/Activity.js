import React from 'react';
import '../App.css';
import '../styles/Activity.css';

/**
 * Component is described here.
 *
 * @example ./examples/Activity.md
 */
export default class Activity extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
