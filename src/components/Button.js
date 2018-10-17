// @flow
import * as React from 'react';
import LoadingIndicator from './LoadingIndicator';

export type Props = {|
  children: React.Node,
  buttonStyle: string,
  type: 'button' | 'submit' | 'reset',
  onClick?: (SyntheticEvent<HTMLButtonElement>) => mixed,
  onKeyPress?: (SyntheticEvent<HTMLButtonElement>) => mixed,
  disabled: boolean,
  loading?: boolean,
|};

/**
 *
 * @example ./examples/Button.md
 */
export default class Button extends React.Component<Props> {
  static defaultProps = {
    buttonStyle: 'info',
    type: 'button',
    disabled: false,
  };

  render() {
    const { children, buttonStyle } = this.props;
    return (
      <button
        className={`raf-button${
          buttonStyle ? ' raf-button--' + buttonStyle : ''
        }`}
        onClick={this.props.onClick}
        onKeyPress={this.props.onKeyPress}
        type={this.props.type}
        disabled={this.props.disabled}
        loading={this.props.loading}
      >
        {!this.props.loading ? (
          children
        ) : (
          <LoadingIndicator
            backgroundColor="rgba(255,255,255,0.1)"
            color="rgba(255,255,255,0.4)"
          />
        )}
      </button>
    );
  }
}
