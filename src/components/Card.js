import React from 'react';
import '../App.css';
import '../styles/Card.css';

/**
 * Component is described here.
 *
 * @example ./examples/Card.md
 */
export default class Card extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
