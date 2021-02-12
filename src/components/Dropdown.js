import React from 'react';
import { IconButton } from 'react-file-utils';

/**
 * Simple wrapper for a small dropdown.
 *
 * @example ./examples/Dropdown.md
 */
export default class Dropdown extends React.Component {
  dropdownBox;

  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.dropdownBox = React.createRef();

    this.state = {
      open: false,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu);
  }

  hideMenu = (e) => {
    if (!this.dropdownBox.current.contains(e.target)) {
      this.setState({ open: false }, () => {
        document.removeEventListener('click', this.hideMenu);
      });
    }
  };

  showMenu = (e) => {
    e.stopPropagation();

    this.setState({ open: true }, () => {
      document.addEventListener('click', this.hideMenu);
    });
  };

  render() {
    return (
      <div className="raf-dropdown">
        <IconButton onClick={this.showMenu}>
          <svg
            className="raf-dropdown__button"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 0L6 4.77 10.59 0 12 1.469l-6 6.25-6-6.25z"
              fill="#A0B2B8"
              fillRule="evenodd"
            />
          </svg>
        </IconButton>

        {this.state.open && (
          <div className="raf-dropdown__box" ref={this.dropdownBox}>
            {this.props.children}
          </div>
        )}
      </div>
    );
  }
}
