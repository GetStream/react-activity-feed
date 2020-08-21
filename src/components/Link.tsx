import * as React from 'react';

export type Props = {
  children: React.ReactNode;
  to?: string;
  onClick?: (input: React.SyntheticEvent) => unknown;
};

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
