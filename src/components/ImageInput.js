// @flow
import React from 'react';

type Props = {|
  handleFiles: (File[]) => mixed,
  multiple: boolean,
|};

export default class ImageInput extends React.PureComponent<Props> {
  static defaultProps = {
    multiple: false,
  };
  render() {
    return (
      <input
        type="file"
        onChange={(event) => {
          this.props.handleFiles(event.currentTarget.files);
        }}
        accept="image/*"
        multiple={this.props.multiple}
      />
    );
  }
}
