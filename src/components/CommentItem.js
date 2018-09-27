// @flow
import React from 'react';
import Avatar from './Avatar';
import placeholder from '../images/placeholder.png';
import type { Comment } from '../types';

export type Props = {|
  comment: Comment,
|};

/**
 * Component is described here.
 *
 * @example ./examples/CommentItem.md
 */
export default class CommentItem extends React.Component<Props> {
  render() {
    return (
      <div className="raf-comment-item">
        <Avatar
          image={this.props.comment.user.data.profileImage || placeholder}
          circle
          size={30}
        />
        <p className="raf-comment-item__content">
          <span className="raf-comment-item__author">
            {this.props.comment.user.data.name}
          </span>{' '}
          {this.props.comment.data.text}
        </p>
      </div>
    );
  }
}
