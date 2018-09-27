// @flow

import React from 'react';
import placeholder from '../images/placeholder.png';

export type Props = {|
  image?: ?string,
  images?: Array<{ image: string }>,
  alt?: ?string,
  title?: ?string,
  url?: string,
  description?: ?string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/Card.md
 */
export default class Card extends React.Component<Props> {
  trimUrl = (url: string) => {
    let trimmedUrl;
    if (url !== undefined || url !== null) {
      trimmedUrl = url
        .replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
        .split('/')[0];
    }
    return trimmedUrl;
  };

  render() {
    const { alt, images } = this.props;
    let image = this.props.image;
    if (!image && images && images.length) {
      image = images[0].image;
    }
    return (
      <a href={this.props.url} className="raf-card">
        <div className="raf-card__image">
          <img
            src={image == null ? placeholder : image}
            alt={alt || this.props.title || this.props.description || ''}
          />
        </div>
        <div className="raf-card__content">
          <p className="raf-card__title">{this.props.title}</p>
          <p className="raf-card__url">{this.trimUrl(this.props.url || '')}</p>
          <p className="raf-card__description">{this.props.description}</p>
        </div>
      </a>
    );
  }
}
