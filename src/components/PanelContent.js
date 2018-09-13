import React from 'react';
import '../styles/PanelContent.css';

export default class PanelContent extends React.Component {
  render() {
    return <div className="StreamPanelContent">{this.props.children}</div>;
  }
}
