import React from 'react';

/**
 * Simple Components that renders a panel. To be combined with PanelHeader, PanelContent, PanelFooter. Used by the library to render the B2BActivity and StatusUpdateForm
 *
 * @example ./examples/Panel.md
 */
export default class Panel extends React.Component {
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
