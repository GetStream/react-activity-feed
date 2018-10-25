// @flow
import React from 'react';

type Props = {|
  handleFiles: (File[]) => mixed,
  multiple: boolean,
  id: string,
|};

export default class ImageInput extends React.PureComponent<Props> {
  static defaultProps = {
    multiple: false,
  };
  render() {
    return (
      <input
        type="file"
        id={this.props.id}
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
