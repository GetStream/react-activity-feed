import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';

export type GalleryProps = {
  images?: Array<string>;
};

export const Gallery = ({ images = [] }: GalleryProps) => {
  const [index, setIndex] = useState<number | null>(null);
  const len = images.length;

  return (
    <div className="raf-gallery">
      {images.slice(0, 5).map((image, i) => (
        <div
          role="button"
          className={`img ${i === 4 && len > 5 ? 'img--last' : ''}`}
          onClick={() => setIndex(i)}
          key={`image-${i}`}
        >
          <img src={image} className="raf-gallery__image" alt="" />
          {i === 4 && len > 5 && <p>{len - 4} more</p>}
        </div>
      ))}

      {index !== null && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[(index + 1) % len]}
          prevSrc={images[(index + len - 1) % len]}
          onCloseRequest={() => setIndex(null)}
          onMoveNextRequest={() => setIndex((index + 1) % len)}
          onMovePrevRequest={() => setIndex((index + len - 1) % len)}
        />
      )}
    </div>
  );
};
