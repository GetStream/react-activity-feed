// @flow
import React from 'react';
import ImageInput from './ImageInput';

export type Props = {|
  handleFiles: (files: File[]) => mixed,
  multiple: boolean,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ThumbnailPlaceholder.md
 */
export default class ThumbnailPlaceholder extends React.Component<Props> {
  static defaultProps = {
    multiple: false,
  };
  render() {
    return (
      <React.Fragment>
        <ImageInput {...this.props} />
        <div role="button" className="raf-thumbnail-placeholder">
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 8.998H8v6H6v-6H0v-2h6v-6h2v6h6z"
              fill="#A0B2B8"
              fillRule="nonzero"
            />
          </svg>
        </div>
      </React.Fragment>
    );
  }
}
