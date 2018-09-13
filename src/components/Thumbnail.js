import React from 'react';
import CloseButton from './CloseButton';
import '../styles/Thumbnail.css';
import placeholder from '../images/placeholder.png';

/**
 * Component is described here.
 *
 * @example ./examples/Thumbnail.md
 */
export default class Thumbnail extends React.Component {
  render() {
    let { image } = this.props;
    return (
      <div className="raf-thumbnail__wrapper">
        <div className="raf-thumbnail__overlay">
          <CloseButton />
        </div>
        <img
          src={image || placeholder}
          className="raf-thumbnail__image"
          alt=""
        />
      </div>
    );
  }
}
