// @flow
import * as React from 'react';

export type Props = {|
  children: React.Node,
  size: number,
|};
/**
 * Component is described here.
 *
 * @example ./examples/Title.md
 */
export default class Title extends React.Component<Props> {
  static defaultProps = {
    size: 18,
  };
  render() {
    return (
      <div className="raf-title" style={{ fontSize: this.props.size }}>
        {this.props.children}
      </div>
    );
  }
}
