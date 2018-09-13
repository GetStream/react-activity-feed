import React from 'react';
import '../App.css';
import '../styles/UserBar.css';

/**
 * Component is described here.
 *
 * @example ./examples/UserBar.md
 */
export default class UserBar extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
