// @flow

import React from 'react';
import IconButton from './IconButton';
import placeholder from '../images/placeholder.png';

export type Props = {|
  handleClose?: (id?: string) => mixed,
  size: number,
  image: string,
  id?: string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/Thumbnail.md
 */
export default class Thumbnail extends React.PureComponent<Props> {
  static defaultProps = {
    size: 100,
    image: placeholder,
  };

  _handleClose = () => {
    if (this.props.handleClose) {
      this.props.handleClose(this.props.id);
    }
  };

  render() {
    const { image, handleClose, size } = this.props;
    return (
      <div
        className="raf-thumbnail__wrapper"
        style={{ width: size, height: size }}
      >
        <div className="raf-thumbnail__overlay">
          {handleClose ? (
            <IconButton onClick={this._handleClose}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0c5.53 0 10 4.47 10 10s-4.47 10-10 10S0 15.53 0 10 4.47 0 10 0zm3.59 5L10 8.59 6.41 5 5 6.41 8.59 10 5 13.59 6.41 15 10 11.41 13.59 15 15 13.59 11.41 10 15 6.41 13.59 5z"
                  fill="#FFF"
                  fillRule="nonzero"
                />
              </svg>
            </IconButton>
          ) : null}
        </div>
        <img src={image} className="raf-thumbnail__image" alt="" />
      </div>
    );
  }
}
