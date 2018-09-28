// @flow
import React from 'react';
import Thumbnail from './Thumbnail';
import LoadingIndicator from './LoadingIndicator';
import ThumbnailPlaceholder from './ThumbnailPlaceholder';
import type { Image } from '../types';

export type Props = {|
  images?: Image[],
  handleRemove?: (id: string) => mixed,
  placeholderButtonHandler?: () => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ImagePreviewer.md
 */
export default class ImagePreviewer extends React.Component<Props> {
  _handleClose = (id?: string) => {
    if (this.props.handleRemove) {
      if (id == null) {
        console.warn("id of closed image was undefined, this shouldn't happen");
        return;
      }
      this.props.handleRemove(id);
    }
  };

  render() {
    const { images, handleRemove, placeholderButtonHandler } = this.props;
    return (
      <div className="raf-image-previewer">
        {images &&
          images.map((image) => (
            <div key={image.id}>
              {image.state === 'uploading' && <LoadingIndicator />}
              <Thumbnail
                handleClose={handleRemove && this._handleClose}
                image={image.previewUri || image.url}
                id={image.id}
              />
            </div>
          ))}
        <ThumbnailPlaceholder
          placeholderButtonHandler={placeholderButtonHandler}
        />
      </div>
    );
  }
}
