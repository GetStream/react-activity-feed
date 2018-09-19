import React from 'react';
import '../App.css';
import '../styles/Button.css';

/**
 *
 * @example ./examples/Button.md
 */
export default class Button extends React.Component {
  handleClick = () => {
    console.log('button clicked');
  };
  handleKeyPress = (e) => {
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
