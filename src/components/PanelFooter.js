import React from 'react';
import '../styles/PanelFooter.css';

export default class PanelFooter extends React.Component {
  render() {
    return <div className="StreamPanelFooter">{this.props.children}</div>;
  }
}
