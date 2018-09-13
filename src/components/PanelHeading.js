import React from 'react';
import '../styles/PanelHeading.css';
import Title from './Title';

export default class PanelHeading extends React.Component {
  render() {
    return (
      <div className="StreamPanelHeading">
        <Title>
          <h1>{this.props.children}</h1>
        </Title>
      </div>
    );
  }
}
