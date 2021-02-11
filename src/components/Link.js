import * as React from 'react';

/**
 *
 * @example ./examples/Link.md
 */
export default class Link extends React.Component {
  render() {
    return (
      <React.Fragment>
        <a
          href={this.props.to}
          className="raf-link"
          onClick={this.props.onClick}
        >
          {this.props.children}
        </a>
      </React.Fragment>
    );
  }
}
