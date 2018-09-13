import React from 'react';
import '../App.css';
import '../styles/Dropdown.css';

/**
 * Component is described here.
 *
 * @example ./examples/Dropdown.md
 */
export default class Dropdown extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
