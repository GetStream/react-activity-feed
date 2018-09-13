import React from 'react';
import '../styles/Link.css';

/**
 * Component is described here.
 *
 * @example ./examples/Link.md
 */
export default class StreamLink extends React.Component {
  render() {
    return (
      <React.Fragment>
        <a href={this.props.to} className="StreamLink">
          {this.props.children}
        </a>
      </React.Fragment>
    );
  }
}
