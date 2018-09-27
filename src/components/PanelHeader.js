// @flow
import * as React from 'react';
import CloseButton from './CloseButton';

export type Props = {|
  children: React.Node,
  closeButton: boolean,
|};

export default class PanelHeading extends React.Component<Props> {
  static defaultProps = {
    closeButton: false,
  };
  render() {
    return (
      <div className="raf-panel-header">
        {this.props.children}
        {this.props.closeButton && <CloseButton />}
      </div>
    );
  }
}
