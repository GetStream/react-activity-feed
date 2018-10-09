// @flow

import React from 'react';
import placeholder from '../images/placeholder.png';
import IconButton from './IconButton';

export type Props = {|
  image?: ?string,
  images?: Array<{ image: string }>,
  alt?: ?string,
  title?: ?string,
  url?: string,
  description?: ?string,
  handleClose?: (e: SyntheticEvent<>) => mixed,
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

  _handleClose = (e: SyntheticEvent<>) => {
    if (this.props.handleClose) {
      this.props.handleClose(e);
    }
  };

  render() {
    const { alt, images, handleClose } = this.props;
    let image = this.props.image;
    if (!image && images && images.length) {
      image = images[0].image;
    }
    const svg =
      '<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b"/><filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(-451 -1)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg>';
    return (
      <a href={this.props.url} className="raf-card">
        {handleClose ? (
          <IconButton onClick={(e) => this._handleClose(e)}>
            <div dangerouslySetInnerHTML={{ __html: svg }} />
          </IconButton>
        ) : null}
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
