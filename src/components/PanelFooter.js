import React from 'react';
import '../styles/PanelFooter.css';

export default class PanelFooter extends React.Component {
  render() {
    return <div className="raf-panel-footer">{this.props.children}</div>;
  }
}
