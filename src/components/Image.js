// @flow
import React from 'react';
import placeholder from '../images/placeholder.png';
import '../styles/Image.css';

export type Props = {|
  source?: string,
  alt?: string,
|};

/**
 * Responsive Image.
 *
 * @example ./examples/Image.md
 */
export default class Image extends React.Component<Props> {
  render() {
    const { source, alt } = this.props;
    return (
      <div className="raf-image">
        <img
          className="raf-image__image"
          src={source ? source : placeholder}
          alt={alt ? alt : ''}
        />
      </div>
    );
  }
}
