import React from 'react';
import '../App.css';
import '../styles/Title.css';

/**
 * Component is described here.
 *
 * @example ./examples/Title.md
 */
export default class Title extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
