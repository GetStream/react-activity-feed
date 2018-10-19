import React from 'react';

/**
 * Doesn't do anything
 *
 * @example ./examples/ActivityContent.md
 */
export default class ActivityContent extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
