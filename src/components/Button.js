// @flow
import * as React from 'react';

export type Props = {|
  children: React.Node,
  buttonStyle: string,
  type: 'button' | 'submit' | 'reset',
  onClick?: (SyntheticEvent<HTMLButtonElement>) => mixed,
  onKeyPress?: (SyntheticEvent<HTMLButtonElement>) => mixed,
  disabled: boolean,
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
      >
        {children}
      </button>
    );
  }
}
