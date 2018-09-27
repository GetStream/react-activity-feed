// @flow

import React from 'react';

export type Props = {|
  clickHandler?: () => mixed,
|};

/**
 * @example ./examples/CloseButton.md
 */
export default class CloseButton extends React.Component<Props> {
  render() {
    const { clickHandler } = this.props;
    return (
      <svg
        className="raf-close-button"
        role="button"
        onClick={clickHandler}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7z"
          fill="#414D54"
          fillRule="nonzero"
        />
      </svg>
    );
  }
}
