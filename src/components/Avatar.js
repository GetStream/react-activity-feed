import React from 'react';
import { AvatarIcon } from './Icons';

/**
 *
 * @example ./examples/Avatar.md
 */
export default class Avatar extends React.PureComponent {
  render() {
    const { size, image, alt, rounded, circle } = this.props;

    const sharedProperties = {
      style: size ? { width: `${size}px`, height: `${size}px` } : {},
      className: `raf-avatar ${rounded ? 'raf-avatar--rounded' : ''} ${circle ? 'raf-avatar--circle' : ''}`,
      onClick: this.props.onClick,
    };

    return (
      <React.Fragment>
        {image ? <img {...sharedProperties} src={image} alt={alt ?? ''} /> : <AvatarIcon {...sharedProperties} />}
      </React.Fragment>
    );
  }
}

//TODO: remove the default export
export { Avatar };
