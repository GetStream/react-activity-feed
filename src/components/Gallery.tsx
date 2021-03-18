import React, { useState, useMemo } from 'react';
import Lightbox from 'react-images';

export type GalleryProps = {
  images?: Array<string>;
};

export const Gallery = ({ images = [] }: GalleryProps) => {
  const formattedImages = useMemo(() => images.map((src) => ({ src })), [images]);

  const [currentImage, setCurrentImage] = useState<number | null>(null);

  const changeSelectedImage = (crement: number) => setCurrentImage((pv) => (pv !== null ? pv + crement : null));

  return (
    <div className="raf-gallery">
      {images.slice(0, 5).map((image, i) => (
        <div
          role="button"
          className={`img ${i === 4 && images.length > 5 ? 'img--last' : ''}`}
          onClick={() => setCurrentImage(i)}
          key={`image-${i}`}
        >
          <img src={image} className="raf-gallery__image" alt="" />
          {i === 4 && images.length > 5 && <p>{images.length - 4} more</p>}
        </div>
      ))}

      <Lightbox
        backdropClosesModal
        images={formattedImages}
        isOpen={currentImage !== null}
        onClickPrev={() => changeSelectedImage(-1)}
        onClickNext={() => changeSelectedImage(1)}
        onClose={() => setCurrentImage(null)}
        currentImage={currentImage ?? undefined}
      />
    </div>
  );
};
