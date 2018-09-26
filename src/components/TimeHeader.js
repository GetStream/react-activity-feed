// @flow
import * as React from 'react';
import Title from './Title';
import '../styles/TimeHeader.css';

export type Props = {|
  children: React.Node,
|};

/**
 * Component is described here.
 *
 * @example ./examples/TimeHeader.md
 */
export default class TimeHeader extends React.Component<Props> {
  render() {
    return (
      <div className="raf-time-header">
        <Title size={14}>{this.props.children}</Title>
        <div className="raf-time-header__line" />
      </div>
    );
  }
}
