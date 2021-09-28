import React, { useState } from 'react';
import classNames from 'classnames';
import Lightbox from 'react-image-lightbox';

import { PropsWithElementAttributes } from '../utils';

export type GalleryProps = PropsWithElementAttributes<{
  images?: Array<string>;
}>;

export const Gallery = ({ images = [], className, style }: GalleryProps) => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div className={classNames('raf-gallery', className)} style={style}>
      {images.slice(0, 5).map((image, i) => (
        <div
          role="button"
          className={classNames('img', { 'img--last': i === 4 && images.length > 5 })}
          onClick={() => setIndex(i)}
          key={`image-${i}`}
        >
          <img src={image} className="raf-gallery__image" alt="" />
          {i === 4 && images.length > 5 && <p>{images.length - 4} more</p>}
        </div>
      ))}

      {index !== null && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[index + 1]}
          prevSrc={images[index - 1]}
          onCloseRequest={() => setIndex(null)}
          onMoveNextRequest={() => setIndex(index + 1)}
          onMovePrevRequest={() => setIndex(index - 1)}
        />
      )}
    </div>
  );
};
