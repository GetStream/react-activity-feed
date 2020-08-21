import * as React from 'react';

export type Props = {
  children: React.ReactNode;
};

export default class PanelHeading extends React.Component<Props> {
  render() {
    return <div className="raf-panel-header">{this.props.children}</div>;
  }
}
