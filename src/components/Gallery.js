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

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };
  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };
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

  //  TODO: Provide way to add alt tags.
  render() {
    const { images } = this.props;

    return (
      <React.Fragment>
        <div className="raf-gallery">
          {images.slice(0, 5).map((image, i) => (
            <div
              className={`img ${
                i === 4 && images.length > 5 ? 'img--last' : ''
              }`}
              onClick={() => this.openLightbox(i)}
              key={`image-${i}`}
            >
              <img src={image} className={`raf-gallery__image `} alt="" />
              <React.Fragment>
                {i === 4 && images.length > 5 ? (
                  <p>{images.length - 4} more</p>
                ) : null}
              </React.Fragment>
            </div>
            // </div>
          ))}

          <Lightbox
            backdropClosesModal
            images={this.getImages(images)}
            isOpen={this.state.lightboxIsOpen}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            onClose={this.closeLightbox}
            currentImage={this.state.currentImage}
          />
        </div>
      </React.Fragment>
    );
  }
}
