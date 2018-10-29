// @flow
import React from 'react';
import placeholder from '../images/placeholder.png';

export type Props = {|
  size?: number,
  image?: string,
  alt?: string,
  rounded?: boolean,
  circle?: boolean,
  onClick?: () => mixed,
|};

/**
 *
 * @example ./examples/Avatar.md
 */
export default class Avatar extends React.Component<Props> {
  render() {
    const { size, image, alt, rounded, circle } = this.props;
    return (
      <React.Fragment>
        <img
          style={size ? { width: `${size}px`, height: `${size}px` } : {}}
          className={`raf-avatar ${rounded ? 'raf-avatar--rounded' : ''} ${
            circle ? 'raf-avatar--circle' : ''
          }`}
          onClick={this.props.onClick}
          src={image ? image : placeholder}
          alt={alt || ''}
        />
      </React.Fragment>
    );
  }
}
