import React from 'react';
import ReactionList from './ReactionList';
import CommentItem from './CommentItem';
import LoadMorePaginator from './LoadMorePaginator';
import { smartRender } from '../utils';

/**
 * CommentList uses ReactionList under the hood to render a list of comments.
 *
 * @example ./examples/CommentList.md
 */
export default class CommentList extends React.PureComponent {
  static defaultProps = {
    Paginator: LoadMorePaginator,
    CommentItem,
    oldestToNewest: false,
    reverseOrder: false,
  };

  _Reaction = ({ reaction }) =>
    smartRender(this.props.CommentItem, { comment: reaction });
  render() {
    const {
      Paginator,
      activityId,
      activityPath,
      oldestToNewest,
      reverseOrder,
    } = this.props;
    return (
      <React.Fragment>
        <ReactionList
          Paginator={Paginator}
          activityId={activityId}
          reactionKind={'comment'}
          Reaction={this._Reaction}
          activityPath={activityPath}
          oldestToNewest={oldestToNewest}
          reverseOrder={reverseOrder}
        />
      </React.Fragment>
    );
  }
}
