import React from 'react';
import '../styles/PanelHeader.css';
import Title from './Title';
import CloseButton from './CloseButton';

export default class PanelHeading extends React.Component {
  render() {
    return (
      <div className="raf-panel-header">
        <Title>
          <h1>{this.props.children}</h1>
        </Title>
        <CloseButton />
      </div>
    );
  }
}
