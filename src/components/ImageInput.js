// @flow
import React from 'react';

type Props = {|
  handleFiles: (Blob[]) => mixed,
  multiple: boolean,
  name: string,
|};

export default class ImageInput extends React.PureComponent<Props> {
  static defaultProps = {
    multiple: false,
  };
  render() {
    return (
      <input
        type="file"
        id={this.props.name}
        className="raf-image-input"
        onChange={(event) => {
          this.props.handleFiles(event.currentTarget.files);
        }}
        accept="image/*"
        multiple={this.props.multiple}
      />
    );
  }
}
