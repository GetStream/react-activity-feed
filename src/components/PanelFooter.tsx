import React from 'react';

export default class PanelFooter extends React.Component {
  render() {
    return <div className="raf-panel-footer">{this.props.children}</div>;
  }
}
