import React from 'react';
import { LoadingIndicator } from 'react-file-utils';

/**
 *
 * @example ./examples/Button.md
 */
export default class Button extends React.Component {
  static defaultProps = {
    buttonStyle: 'info',
    type: 'button',
    disabled: false,
    loading: false,
  };

  render() {
    const { children, buttonStyle } = this.props;
    return (
      <button
        className={`raf-button${buttonStyle ? ' raf-button--' + buttonStyle : ''}`}
        onClick={this.props.onClick}
        onKeyPress={this.props.onKeyPress}
        type={this.props.type}
        disabled={this.props.disabled}
      >
        {!this.props.loading ? (
          children
        ) : (
          <LoadingIndicator backgroundColor="rgba(255,255,255,0.1)" color="rgba(255,255,255,0.4)" />
        )}
      </button>
    );
  }
}
