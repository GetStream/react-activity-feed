// @flow
import * as React from 'react';

export type Props = {|
  children: React.Node,
  to?: string,
  onClick?: () => mixed,
|};

/**
 *
 * @example ./examples/Link.md
 */
export default class Link extends React.Component<Props> {
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
