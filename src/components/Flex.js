// @flow
import * as React from 'react';

type Props = {|
  children: React.Node,
  vcenter: boolean,
  style?: any,
|};
/**
 * Simple Flex wrapper for centering UI elements. To be expanded in the future.
 *
 * @example ./examples/Flex.md
 */
export default class Flex extends React.Component<Props> {
  static defaultProps = {
    vcenter: false,
  };

  render() {
    return (
      <div
        className={`raf-flex${this.props.vcenter ? ' raf-flex--vcenter' : ''}`}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}
