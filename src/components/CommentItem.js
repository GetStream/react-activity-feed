// @flow
import React from 'react';
import Avatar from './Avatar';
import Flex from './Flex';
// import Dropdown from './Dropdown';
// import Link from './Link';
import placeholder from '../images/placeholder.png';
import type { Comment } from '../types';

import { humanizeTimestamp } from '../utils';

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
    const { comment } = this.props;
    return (
      <div className="raf-comment-item">
        <Flex a="flex-start" style={{ padding: '8px 0' }}>
          <Avatar
            image={comment.user.data.profileImage || placeholder}
            circle
            size={25}
          />
        </Flex>
        <Flex d="column" style={{ flex: 1, margin: '0 8px' }}>
          <div className="raf-comment-item__content">
            <time dateTime={comment.created_at} title={comment.created_at}>
              <small>{humanizeTimestamp(comment.created_at)}</small>
            </time>
            <p>
              <span className="raf-comment-item__author">
                {comment.user.data.name}
              </span>{' '}
              {comment.data.text}
            </p>
          </div>
        </Flex>
      </div>
    );
  }
}
