// @flow

import * as React from 'react';
import '../styles/Button.css';

export type Props = {|
  children: React.Node,
  buttonStyle: string,
  handleClick?: () => mixed,
  handleKeyPress?: () => mixed,
|};

/**
 *
 * @example ./examples/Button.md
 */
export default class Button extends React.Component<Props> {
  static defaultProps = {
    buttonStyle: 'info',
  };

  handleClick = () => {
    console.log('button clicked');
  };
  handleKeyPress = (e: SyntheticKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      console.log('button keypressed');
    }
  };
  render() {
    const { children, buttonStyle } = this.props;
    return (
      <div
        className={`raf-button ${buttonStyle}`}
        onClick={this.props.handleClick || this.handleClick}
        onKeyPress={this.props.handleKeyPress || this.handleKeyPress}
        role="button"
      >
        {children || null}
      </div>
    );
  }
}
