import React from 'react';
import '../App.css';
import '../styles/IconBadge.css';

/**
 * Component is described here.
 *
 * @example ./examples/IconBadge.md
 */
export default class IconBadge extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
