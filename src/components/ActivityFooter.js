import React from 'react';
import '../App.css';
import '../styles/ActivityFooter.css';

/**
 * Component is described here.
 *
 * @example ./examples/ActivityFooter.md
 */
export default class ActivityFooter extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
