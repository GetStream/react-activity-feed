//@flow
import React from 'react';
import type { Comment } from '../types';

export type Props = {|
  data: Comment[],
  renderCommentItem: (item: Comment, i: number) => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/CommentList.md
 */
export default class CommentList extends React.Component<Props> {
  render() {
    const { data, renderCommentItem } = this.props;
    return (
      <React.Fragment>
        {data && renderCommentItem
          ? data.map((item, i) => renderCommentItem(item, i))
          : null}
      </React.Fragment>
    );
  }
}
