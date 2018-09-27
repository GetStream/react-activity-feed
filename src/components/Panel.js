// @flow

import * as React from 'react';

type PanelStyle = 'rounded' | 'square';

export type Props = {|
  panelStyle: PanelStyle,
  children: React.Node,
|};

/**
 * Component is described here.
 *
 * @example ./examples/Panel.md
 */
export default class Panel extends React.Component<Props> {
  static defaultProps = {
    panelStyle: 'rounded',
  };

  render() {
    return (
      <div className={`raf-panel raf-panel--${this.props.panelStyle}`}>
        {this.props.children}
      </div>
    );
  }
}
