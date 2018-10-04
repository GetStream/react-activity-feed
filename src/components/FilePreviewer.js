// @flow
import React from 'react';
import FileInput from './FileInput';
import FileIcon from './FileIcon';
import LoadingIndicator from './LoadingIndicator';
import type { FileUpload } from '../types';

type Props = {|
  uploads?: FileUpload[],
  handleRemove?: (id: string) => mixed,
  handleRetry?: (id: string) => mixed,
  handleFiles?: (files: Blob[]) => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ImagePreviewer.md
 */
export default class ImagePreviewer extends React.Component<Props> {
  render() {
    const { uploads, handleRemove, handleRetry, handleFiles } = this.props;
    return (
      <div className="raf-file-previewer">
        <ol>
          {uploads &&
            uploads.map((upload, i) => (
              <li key={upload.id} className="raf-file-previewer__image">
                {upload.state === 'uploading' && <LoadingIndicator />}
                {upload.state === 'failed' && (
                  <div
                    className="raf-image-previewer__retry"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<svg width="22" height="20" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><path d="M20 5.535V2a1 1 0 0 1 2 0v6a1 1 0 0 1-1 1h-6a1 1 0 0 1 0-2h3.638l-2.975-2.653a8 8 0 1 0 1.884 8.32 1 1 0 1 1 1.886.666A10 10 0 1 1 5.175 1.245c3.901-2.15 8.754-1.462 11.88 1.667L20 5.535z" fill="#FFF" fill-rule="nonzero"/></svg>',
                    }}
                    onClick={handleRetry && (() => handleRetry(upload.id))}
                  />
                )}
                <FileIcon mimeType={upload.file.type} />
                <a href={upload.url} download>
                  {upload.file instanceof File ? upload.file.name : 'file' + i}
                </a>
                <span onClick={handleRemove && (() => handleRemove(upload.id))}>
                  ✘
                </span>
              </li>
            ))}
        </ol>
        {handleFiles && (
          <div>
            <FileInput handleFiles={handleFiles} multiple />
          </div>
        )}
      </div>
    );
  }
}
