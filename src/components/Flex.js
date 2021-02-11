import * as React from 'react';

/**
 * Simple Flex wrapper for centering UI elements. To be expanded in the future.
 *
 * @example ./examples/Flex.md
 */
export default class Flex extends React.Component {
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
