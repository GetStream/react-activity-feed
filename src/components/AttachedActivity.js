import React from 'react';
import '../App.css';
import '../styles/AttachedActivity.css';

/**
 * Component is described here.
 *
 * @example ./examples/AttachedActivity.md
 */
export default class AttachedActivity extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
