// @flow
import React from 'react';
import Avatar from './Avatar';
import Flex from './Flex';
import type { Comment } from '../types';

import { humanizeTimestamp, textRenderer } from '../utils';

export type Props = {|
  comment: Comment,
  onClickUser?: (?any) => mixed,
  /** Handler for any routing you may do on clicks on Hashtags */
  onClickHashtag?: (word: string) => mixed,
  /** Handler for any routing you may do on clicks on Mentions */
  onClickMention?: (word: string) => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/CommentItem.md
 */
export default class CommentItem extends React.Component<Props> {
  _user = () => {
    const { user } = this.props.comment;
    return user;
  };

  onClickUser = () => {
    const { onClickUser } = this.props;
    if (onClickUser) {
      return onClickUser(this._user());
    }
  };

  _getOnClickUser() {
    return this.props.onClickUser ? this.onClickUser : undefined;
  }

  render() {
    const { comment } = this.props;
    return (
      <div className="raf-comment-item">
        <Flex a="flex-start" style={{ padding: '8px 0' }}>
          {comment.user.data.profileImage && (
            <Avatar
              onClick={this._getOnClickUser()}
              image={comment.user.data.profileImage}
              circle
              size={25}
            />
          )}
        </Flex>
        <Flex d="column" style={{ flex: 1, margin: '0 8px' }}>
          <div className="raf-comment-item__content">
            <time dateTime={comment.created_at} title={comment.created_at}>
              <small>{humanizeTimestamp(comment.created_at)}</small>
            </time>
            <p>
              <span
                onClick={this._getOnClickUser()}
                className="raf-comment-item__author"
              >
                {comment.user.data.name}
              </span>{' '}
              {textRenderer(
                comment.data.text,
                'raf-comment-item',
                this.props.onClickMention,
                this.props.onClickHashtag,
              )}
            </p>
          </div>
        </Flex>
      </div>
    );
  }
}
