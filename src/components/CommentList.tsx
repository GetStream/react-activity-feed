import React from 'react';

import { ElementOrComponentOrLiteralType, smartRender } from '../utils';
import { DefaultUT } from '../Context/StreamApp';

import ReactionList from './ReactionList';
import { LoadMorePaginator, LoadMorePaginatorProps } from './LoadMorePaginator';
import { CommentItem as DefaultCommentItem, CommentItemProps } from './CommentItem';

export type CommentListProps<UT extends DefaultUT = DefaultUT> = {
  /** The ID of the activity for which these comments are */
  activityId: string;
  /** Only needed for reposted activities where you want to show the comments
   * of the original activity, not of the repost */
  activityPath?: Array<string>;
  /** The component that should render the comment */
  CommentItem?: ElementOrComponentOrLiteralType<CommentItemProps<UT>>;
  /** Show and load comments starting with the oldest reaction first, instead
   * of the default where comments are displayed and loaded most recent first.
   */
  oldestToNewest?: boolean;
  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator?: ElementOrComponentOrLiteralType<LoadMorePaginatorProps>;
  /** Reverse the order the comments are displayed in. */
  reverseOrder?: boolean;
};

export const CommentList = <UT extends DefaultUT = DefaultUT>({
  Paginator = LoadMorePaginator,
  CommentItem = DefaultCommentItem,
  activityId,
  activityPath,
  oldestToNewest = false,
  reverseOrder = false,
}: CommentListProps<UT>) => (
  <ReactionList
    Paginator={Paginator}
    activityId={activityId}
    reactionKind="comment"
    // TODO: remove once ReactionList is typed
    // @ts-expect-error
    Reaction={({ reaction: comment }) => smartRender<CommentItemProps<UT>>(CommentItem, { comment })}
    activityPath={activityPath}
    oldestToNewest={oldestToNewest}
    reverseOrder={reverseOrder}
  />
);
