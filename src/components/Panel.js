// @flow

import * as React from 'react';

type PanelStyle = 'rounded' | 'square';

export type Props = {|
  panelStyle: PanelStyle,
  children: React.Node,
|};

/**
 * Simple Components that renders a panel. To be combined with PanelHeader, PanelContent, PanelFooter. Used by the library to render the B2BActivity and StatusUpdateForm
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
