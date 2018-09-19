// @flow
import * as React from 'react';
import '../styles/PanelHeader.css';
import Title from './Title';
import CloseButton from './CloseButton';

export type Props = {|
  children: React.Node,
|};

export default class PanelHeading extends React.Component<Props> {
  render() {
    return (
      <div className="raf-panel-header">
        <Title>{this.props.children}</Title>
        <CloseButton />
      </div>
    );
  }
}
