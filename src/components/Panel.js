import React from 'react';
import '../styles/Panel.css';

/**
 * Component is described here.
 *
 * @example ./examples/Panel.md
 */
export default class Panel extends React.Component {
  render() {
    return <div className="StreamPanel">{this.props.children}</div>;
  }
}
