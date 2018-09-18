// @flow
import React from 'react';
import Thumbnail from './Thumbnail';
import ThumbnailPlaceholder from './ThumbnailPlaceholder';
import '../styles/ImagePreviewer.css';

export type Props = {|
  images?: string[],
  closeButtonHandler?: () => mixed,
  placeholderButtonHandler?: () => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ImagePreviewer.md
 */
export default class ImagePreviewer extends React.Component<Props> {
  render() {
    let { images, closeButtonHandler, placeholderButtonHandler } = this.props;
    return (
      <div className="raf-image-previewer">
        {images &&
          images.map((image, i) => (
            <Thumbnail
              closeButtonHandler={closeButtonHandler}
              image={image}
              key={`index-${i}`}
            />
          ))}
        <ThumbnailPlaceholder
          placeholderButtonHandler={placeholderButtonHandler}
        />
      </div>
    );
  }
}
