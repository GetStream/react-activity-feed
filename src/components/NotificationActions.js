import React from 'react';
import '../App.css';
import '../styles/NotificationActions.css';

/**
 * Component is described here.
 *
 * @example ./examples/NotificationActions.md
 */
export default class NotificationActions extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
