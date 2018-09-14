import React from 'react';
import Avatar from './Avatar';
import placeholder from '../images/placeholder.png';
import '../styles/CommentItem.css';

/**
 * Component is described here.
 *
 * @example ./examples/CommentItem.md
 */
export default class CommentItem extends React.Component {
  render() {
    let { author, content, image } = this.props;
    return (
      <div className="raf-comment-item">
        <Avatar image={image || placeholder} circle size={30} />
        <p className="raf-comment-item__content">
          <span className="raf-comment-item__author">{author}</span> {content}
        </p>
      </div>
    );
  }
}
