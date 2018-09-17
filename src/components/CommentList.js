import React from 'react';
import '../styles/CommentList.css';

/**
 * Component is described here.
 *
 * @example ./examples/CommentList.md
 */
export default class CommentList extends React.Component {
  render() {
    let { data, renderCommentItem } = this.props;
    return (
      <div>
        {data && renderCommentItem
          ? data.map((item, i) => renderCommentItem(item, i))
          : null}
      </div>
    );
  }
}
