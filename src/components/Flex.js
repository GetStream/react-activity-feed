// @flow
import * as React from 'react';

type Align = 'center' | 'flex-start' | 'flex-end';
type Justify =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'flex-start'
  | 'flex-end';
type JustifySelf =
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'flex-start'
  | 'flex-end'
  | 'stretch';
type Direction = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type Wrap = 'wrap' | 'nowrap' | 'wrap-reverse';

type Props = {|
  children: React.Node,
  a?: Align,
  j?: Justify,
  js?: JustifySelf,
  d: Direction,
  w: Wrap,
  style?: any,
|};
/**
 * Simple Flex wrapper for centering UI elements. To be expanded in the future.
 *
 * @example ./examples/Flex.md
 */
export default class Flex extends React.Component<Props> {
  static defaultProps = {
    d: 'row',
    w: 'nowrap',
  };
  render() {
    return (
      <div
        className={`raf-flex`}
        style={{
          justifyContent: this.props.j,
          alignItems: this.props.a,
          justifySelf: this.props.js,
          flexDirection: this.props.d,
          flexWrap: this.props.w,
          ...this.props.style,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
