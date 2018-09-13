import React from 'react';
import '../App.css';
import '../styles/ActivityHeader.css';

/**
 * Component is described here.
 *
 * @example ./examples/ActivityHeader.md
 */
export default class ActivityHeader extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
