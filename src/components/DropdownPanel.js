// @flow
import * as React from 'react';
import '../styles/DropdownPanel.css';

export type Props = {|
  children?: React.Node,
  arrow: boolean,
|};

/**
 * Component is described here.
 *
 * @example ./examples/DropdownPanel.md
 */
export default class DropdownPanel extends React.Component<Props> {
  static defaultProps = {
    arrow: false,
  };

  render() {
    return <div className="raf-dropdown-panel">{this.props.children}</div>;
  }
}
