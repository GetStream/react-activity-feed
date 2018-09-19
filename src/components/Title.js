// @flow
import * as React from 'react';
import '../App.css';
import '../styles/Title.css';

export type Props = {|
  children: React.Node,
|};
/**
 * Component is described here.
 *
 * @example ./examples/Title.md
 */
export default class Title extends React.Component<Props> {
  render() {
    return <div className="raf-title">{this.props.children}</div>;
  }
}
