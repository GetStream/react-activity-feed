// @flow
import React from 'react';
import Thumbnail from './Thumbnail';
import LoadingIndicator from './LoadingIndicator';
import ThumbnailPlaceholder from './ThumbnailPlaceholder';
import type { ImageUpload } from '../types';

type Props = {|
  imageUploads?: ImageUpload[],
  handleRemove?: (id: string) => mixed,
  handleRetry?: (id: string) => mixed,
  handleFiles?: (files: File[]) => mixed,
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
    const { imageUploads, handleRemove, handleRetry, handleFiles } = this.props;
    return (
      <div className="raf-image-previewer">
        {imageUploads &&
          imageUploads.map((image) => (
            <div key={image.id} className="raf-image-previewer__image">
              {image.state === 'failed' && (
                <div
                  className="raf-image-previewer__retry"
                  dangerouslySetInnerHTML={{
                    __html:
                      '<svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 5.535V2a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h3.638l-2.975-2.653a8 8 0 1 0 1.884 8.32 1 1 0 1 1 1.886.666A10 10 0 1 1 5.175 1.245c3.901-2.15 8.754-1.462 11.88 1.667L20 5.535z" fill="#FFF" fill-rule="nonzero"/></svg>',
                  }}
                  onClick={handleRetry && (() => handleRetry(image.id))}
                />
              )}

              <Thumbnail
                handleClose={handleRemove && this._handleClose}
                image={image.previewUri || image.url}
                id={image.id}
              />
              {image.state === 'uploading' && (
                <LoadingIndicator
                  backgroundColor="rgba(255,255,255,0.1)"
                  color="rgba(255,255,255,0.7)"
                />
              )}
            </div>
          ))}
        {handleFiles && (
          <ThumbnailPlaceholder handleFiles={handleFiles} multiple />
        )}
      </div>
    );
  }
}
