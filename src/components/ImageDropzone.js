// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';

type Props = {|
  children?: React.Node,
  handleFiles?: (files: Blob[]) => mixed,
|};

export default class ImageDropzone extends React.PureComponent<Props> {
  _handleFiles = async (accepted: Blob[], rejected: DataTransferItem[]) => {
    const { handleFiles } = this.props;
    if (!handleFiles) {
      return;
    }

    if (accepted && accepted.length) {
      // Normal case
      return handleFiles(accepted);
    }

    if (!rejected || !rejected.length) {
      return;
    }

    // Website-to-website image drag+drop
    const blobPromises = [];
    for (const item of rejected) {
      if (item.type === 'text/html') {
        blobPromises.push(
          new Promise((accept) => {
            item.getAsString(async (s) => {
              // Extract image src attribute from html
              const match = s.match(/src\s*=\s*"(.+?)"/);
              if (match) {
                const res = await fetch(match[1]);
                const contentType =
                  res.headers.get('Content-type') || 'application/octet-stream';
                const buf = await res.arrayBuffer();
                accept(new Blob([buf], { type: contentType }));
              } else {
                accept();
              }
            });
          }),
        );
      }
    }
    const blobs = [];
    for (const blob of await Promise.all(blobPromises)) {
      if (blob) {
        blobs.push(blob);
      }
    }
    if (blobs.length) {
      return handleFiles(blobs);
    }
  };
  render() {
    const { handleFiles, children } = this.props;
    return (
      <Dropzone
        onDrop={handleFiles && this._handleFiles}
        disableClick
        disablePreview
        //style={{position: 'absolute', height: '100%', width: '100%', zIndex: -1000000}}
        className="raf-dropzone"
        style={{ position: 'relative' }}
        acceptClassName="raf-dropzone--accept"
        rejectClassName="raf-dropzone--reject"
      >
        <div className="raf-dropzone__notifier" style={{}}>
          <div className="raf-dropzone__inner">
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M40.517 28.002V3.997c0-2.197-1.808-3.992-4.005-3.992H12.507a4.004 4.004 0 0 0-3.992 3.993v24.004a4.004 4.004 0 0 0 3.992 3.993h24.005c2.197 0 4.005-1.795 4.005-3.993zm-22.002-7.997l4.062 5.42 5.937-7.423 7.998 10H12.507l6.008-7.997zM.517 8.003V36c0 2.198 1.795 4.005 3.993 4.005h27.997V36H4.51V8.002H.517z"
                fill="#000"
                fillRule="nonzero"
              />
            </svg>
            <p>Drag your files here to add to your post</p>
          </div>
        </div>
        {children}
      </Dropzone>
    );
  }
}
