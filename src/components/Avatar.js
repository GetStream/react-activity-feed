import React from 'react';
import { AvatarIcon } from './icons';

/**
 *
 * @example ./examples/Avatar.md
 */
export default class Avatar extends React.PureComponent {
  render() {
    const { size, image, alt, rounded, circle } = this.props;

    const sharedProperties = {
      style: size ? { width: `${size}px`, height: `${size}px` } : {},
      className: `raf-avatar ${rounded ? 'raf-avatar--rounded' : ''} ${
        circle ? 'raf-avatar--circle' : ''
      }`,
      onClick: this.props.onClick,
    };

    return (
      <React.Fragment>
        {!image ? (
          <AvatarIcon {...sharedProperties} />
        ) : (
          <img {...sharedProperties} src={image} alt={alt ?? ''} />
        )}
      </React.Fragment>
    );
  }
}
