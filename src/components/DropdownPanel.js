// @flow
import * as React from 'react';
import '../styles/DropdownPanel.css';

export type Props = {|
  children?: React.Node,
  Header?: React.Node,
  Footer?: React.Node,

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
    return (
      <div className="raf-dropdown-panel raf-dropdown-panel--arrow">
        <div className="raf-dropdown-panel__header">{this.props.Header}</div>
        <div className="raf-dropdown-panel__content">{this.props.children}</div>
        <div className="raf-dropdown-panel__footer">{this.props.Footer}</div>
      </div>
    );
  }
}
