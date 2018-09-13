import React from 'react';
import '../App.css';
import '../styles/Avatar.css';

/**
 * Component is described here.
 *
 * @example ./examples/Avatar.md
 */
export default class Avatar extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
