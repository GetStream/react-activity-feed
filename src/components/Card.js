// @flow

import React from 'react';
import placeholder from '../images/placeholder.png';
import '../styles/Card.css';

export type Props = {|
  image?: ?string,
  alt?: ?string,
  title?: ?string,
  url?: ?string,
  description?: ?string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/Card.md
 */
export default class Card extends React.Component<Props> {
  render() {
    const { image, alt } = this.props;
    return (
      <div className="raf-card">
        <div className="raf-card__image">
          <img src={image === null ? placeholder : image} alt={alt || ''} />
        </div>
        <div className="raf-card__content">
          <p className="raf-card__title">Title</p>
          <p className="raf-card__url">url</p>
          <p className="raf-card__description">description</p>
        </div>
      </div>
    );
  }
}
