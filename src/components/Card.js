// @flow

import React from 'react';
import placeholder from '../images/placeholder.png';
import '../styles/Card.css';

export type Props = {|
  image?: ?string,
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
    const { image, alt } = this.props;
    return (
      <div className="raf-card">
        <div className="raf-card__image">
          <img src={image === null ? placeholder : image} alt={alt || ''} />
        </div>
        <div className="raf-card__content">
          <p className="raf-card__title">{this.props.title}</p>
          <p className="raf-card__url">{this.trimUrl(this.props.url || '')}</p>
          <p className="raf-card__description">{this.props.description}</p>
        </div>
      </div>
    );
  }
}
