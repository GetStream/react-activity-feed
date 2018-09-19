// @flow
import React from 'react';
import '../styles/Avatar.css';
import placeholder from '../images/placeholder.png';

export type Props = {|
  size?: number,
  image?: string,
  alt?: string,
  rounded?: boolean,
  circle?: boolean,
|};

/**
 *
 * @example ./examples/Avatar.md
 */
export default class Avatar extends React.Component<Props> {
  render() {
    let { size, image, alt, rounded, circle } = this.props;
    return (
      <React.Fragment>
        <img
          style={size ? { width: `${size}px`, height: `${size}px` } : {}}
          className={`raf-avatar ${rounded ? 'raf-avatar--rounded' : ''} ${
            circle ? 'raf-avatar--circle' : ''
          }`}
          src={image ? image : placeholder}
          alt={alt || ''}
        />
      </React.Fragment>
    );
  }
}
