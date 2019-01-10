//@flow
import React from 'react';
import ReactionList from './ReactionList';
import CommentItem from './CommentItem';
import LoadMorePaginator from './LoadMorePaginator';
import { smartRender } from '../utils';
import type { Renderable, Comment } from '../types';

export type Props = {|
  /** The ID of the activity for which these comments are */
  activityId: string,
  /** The component that should render the comment */
  CommentItem: Renderable,
  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator: Renderable,
  /** Only needed for reposted activities where you want to show the comments
   * of the original activity, not of the repost */
  activityPath?: ?Array<string>,
  /** Show and load comments starting with the oldest reaction first, instead
   * of the default where comments are displayed and loaded most recent first.
   * */
  oldestToNewest: boolean,
  /** Reverse the order the comments are displayed in. */
  reverseOrder: boolean,
|};

/**
 * CommentList uses ReactionList under the hood to render a list of comments.
 *
 * @example ./examples/CommentList.md
 */
export default class CommentList extends React.PureComponent<Props> {
  static defaultProps = {
    Paginator: LoadMorePaginator,
    CommentItem,
    oldestToNewest: false,
    reverseOrder: false,
  };

  _Reaction = ({ reaction }: { reaction: Comment }) =>
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
