// @flow
import React from 'react';
import '../styles/ImageUploadButton.css';

type Props = {|
  handleFiles?: (Array<File>) => mixed,
  multiple: boolean,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ImageUploadButton.md
 */
export default class ImageUploadButton extends React.Component<Props> {
  static defaultProps = {
    multiple: false,
  };
  render() {
    return (
      <React.Fragment>
        <input
          type="file"
          onChange={(event) => {
            if (this.props.handleFiles) {
              this.props.handleFiles(event.currentTarget.files);
            }
          }}
          multiple={this.props.multiple}
        />
        <svg
          role="button"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 0h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm3 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM2 16v2h16v-6l-3-3-6 6-3-3-4 4z"
            fill="#A0B2B8"
            fillRule="nonzero"
          />
        </svg>
      </React.Fragment>
    );
  }
}
