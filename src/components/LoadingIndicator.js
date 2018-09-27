import * as React from 'react';

/**
 * Component is described here.
 *
 * @example ./examples/LoadingIndicator.md
 */
export default class LoadingIndicator extends React.Component {
  render() {
    return (
      <div className="raf-loading-indicator">
        <div className="bounce1" />
        <div className="bounce2" />
        <div className="bounce3" />
      </div>
    );
  }
}
