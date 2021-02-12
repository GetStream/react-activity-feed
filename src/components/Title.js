import React from 'react';

/**
 * Component is described here.
 *
 * @example ./examples/Title.md
 */
export default class Title extends React.Component {
  static defaultProps = {
    size: 18,
  };
  render() {
    return (
      <div className="raf-title" style={{ fontSize: this.props.size }}>
        {this.props.children}
      </div>
    );
  }
}
