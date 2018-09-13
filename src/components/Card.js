import React from 'react';
import placeholder from '../images/placeholder.png';
import '../styles/Card.css';

/**
 * Component is described here.
 *
 * @example ./examples/Card.md
 */
export default class Card extends React.Component {
  render() {
    let { image, alt } = this.props;
    return (
      <div className="raf-card">
        <div className="raf-card__image">
          <img src={image || placeholder} alt={alt || ''} />
        </div>
        <div className="raf-card__content">
          <div className="raf-card__title">Title</div>
          <div className="raf-card__url">url</div>
          <div className="raf-card__description">description</div>
        </div>
      </div>
    );
  }
}
