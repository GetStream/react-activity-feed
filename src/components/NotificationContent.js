import React from 'react';
import '../App.css';
import '../styles/NotificationContent.css';

/**
 * Component is described here.
 *
 * @example ./examples/NotificationContent.md
 */
export default class NotificationContent extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
