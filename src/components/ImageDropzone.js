// @flow
import * as React from 'react';
import Dropzone from 'react-dropzone';

type Props = {|
  children?: React.Node,
  handleFiles?: (files: File[]) => mixed,
|};

export default class ImageDropzone extends React.PureComponent<Props> {
  render() {
    const { handleFiles, children } = this.props;
    return (
      <Dropzone
        onDrop={handleFiles}
        disableClick
        //style={{position: 'absolute', height: '100%', width: '100%', zIndex: -1000000}}
        className="raf-dropzone"
        style={{ position: 'relative' }}
        acceptClassName="raf-dropzone-accept"
        rejectClassName="raf-dropzone-reject"
        accept="image/*"
      >
        <div className="raf-dropzone-notifier" style={{}} />
        {children}
      </Dropzone>
    );
  }
}
