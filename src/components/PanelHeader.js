import * as React from 'react';

export default class PanelHeading extends React.Component {
  render() {
    return <div className="raf-panel-header">{this.props.children}</div>;
  }
}
