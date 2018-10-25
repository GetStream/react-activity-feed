// @flow
import React from 'react';
import Avatar from './Avatar';
import Flex from './Flex';
import Dropdown from './Dropdown';
import Link from './Link';
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
        <Flex a="center">
          <Avatar
            image={this.props.comment.user.data.profileImage || placeholder}
            circle
            size={30}
          />
        </Flex>
        <Flex style={{ flex: 1, margin: '0 8px' }}>
          <p className="raf-comment-item__content">
            <span className="raf-comment-item__author">
              {this.props.comment.user.data.name}
            </span>{' '}
            {this.props.comment.data.text}
          </p>
        </Flex>
        <Flex>
          <Dropdown>
            <ul>
              <li>
                <Link>Report User</Link>
              </li>
            </ul>
          </Dropdown>
        </Flex>
      </div>
    );
  }
}
