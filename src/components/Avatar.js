import React from 'react';
import '../styles/Avatar.css';
import placeholder from '../images/placeholder.png';

/**
 *
 * @example ./examples/Avatar.md
 */
export default class Avatar extends React.Component {
  render() {
    let { size, image, alt } = this.props;
    return (
      <React.Fragment>
        <img
          className={`raf-avatar`}
          style={size ? { width: `${size}px`, height: `${size}px` } : {}}
          src={image ? image : placeholder}
          alt={alt || ''}
        />
      </React.Fragment>
    );
  }
}
