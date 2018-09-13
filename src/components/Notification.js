import React from 'react';
import '../App.css';
import '../styles/Notification.css';

/**
 * Component is described here.
 *
 * @example ./examples/Notification.md
 */
export default class Notification extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
