import React from 'react';
import '../styles/Link.css';

/**
 *
 * @example ./examples/Link.md
 */
export default class Link extends React.Component {
  render() {
    return (
      <React.Fragment>
        <a href={this.props.to} className="raf-link">
          {this.props.children}
        </a>
      </React.Fragment>
    );
  }
}
