import React from 'react';

/**
 * Doesn't do anything
 *
 * @example ./examples/ActivityHeader.md
 */
export default class ActivityHeader extends React.Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
