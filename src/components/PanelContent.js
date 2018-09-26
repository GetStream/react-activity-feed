import React from 'react';
import '../styles/PanelContent.css';

export default class PanelContent extends React.Component {
  render() {
    return <div className="raf-panel-content">{this.props.children}</div>;
  }
}
