// @flow
import React from 'react';

type Props = {|
  handleFiles: (Blob[]) => mixed,
  multiple: boolean,
  id?: string,
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
        className="raf-file-input"
        onChange={(event) => {
          this.props.handleFiles(event.currentTarget.files);
        }}
        multiple={this.props.multiple}
      />
    );
  }
}
