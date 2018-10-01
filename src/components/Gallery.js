// @flow
import * as React from 'react';
import Lightbox from 'react-images';

export type Props = {|
  images: string[],
|};
export type State = {|
  lightboxIsOpen: boolean,
  currentImage: number,
|};

/**
 * Component is described here.
 *
 * @example ./examples/Gallery.md
 */
export default class Gallery extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    };
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  openLightbox = (image?: number) => {
    this.setState({
      lightboxIsOpen: true,
      currentImage: image,
    });
  };

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
      currentImage: 0,
    });
  };

  getImages = (images: any) =>
    images.map((item) => ({
      src: item,
    }));

  render() {
    const { images } = this.props;

    return (
      <React.Fragment>
        <div className="raf-gallery">
          {images.slice(0, 4).map((image, i) => (
            <div
              className={`raf-gallery__image-wrapper ${
                i === 3 && images.length > 4
                  ? 'raf-gallery__image-wrapper--last'
                  : ''
              }`}
              key={image}
              onClick={() => this.openLightbox(i)}
            >
              {i === 3 && images.length > 5 ? (
                <div className="raf-gallery__image-overlay">
                  {images.length - 4} more
                </div>
              ) : null}
              <img src={image} className="raf-gallery__image" alt="asdf" />
            </div>
          ))}
        </div>
        <Lightbox
          images={this.getImages(images)}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          onClose={this.closeLightbox}
          currentImage={this.state.currentImage}
        />
      </React.Fragment>
    );
  }
}
