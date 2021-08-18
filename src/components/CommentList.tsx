import React from 'react';
import { UR } from 'getstream';

import { ElementOrComponentOrLiteralType, smartRender } from '../utils';
import { DefaultUT, DefaultAT } from '../context/StreamApp';

import { ReactionList } from './ReactionList';
import { LoadMorePaginator, LoadMorePaginatorProps } from './LoadMorePaginator';
import { CommentItem as DefaultCommentItem, CommentItemProps } from './CommentItem';

export type CommentListProps<
  UT extends DefaultUT = DefaultUT,
  // @ts-expect-error
  AT extends DefaultAT = DefaultAT, // eslint-disable-line
  // @ts-expect-error
  CT extends UR = UR, // eslint-disable-line
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  /** The ID of the activity for which these comments are */
  activityId: string;
  /** Only needed for reposted activities where you want to show the comments
   * of the original activity, not of the repost */
  activityPath?: Array<string>;
  /** The component that should render the comment
   * #CommentItem (Component)#
   */
  CommentItem?: ElementOrComponentOrLiteralType<CommentItemProps<UT, RT, CRT>>;
  /** Show and load comments starting with the oldest reaction first, instead
   * of the default where comments are displayed and loaded most recent first.
   */
  oldestToNewest?: boolean;
  /** By default pagination is done with a "Load more" button, you can use
   * [InfiniteScrollPaginator](/components/infinite-scroll) to enable infinite scrolling
   * #LoadMorePaginator (Component)#
   */
  Paginator?: ElementOrComponentOrLiteralType<LoadMorePaginatorProps>;
  /** Reverse the order the comments are displayed in. */
  reverseOrder?: boolean;
};

export const CommentList = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  Paginator = LoadMorePaginator,
  CommentItem = DefaultCommentItem,
  activityId,
  activityPath,
  oldestToNewest = false,
  reverseOrder = false,
}: CommentListProps<UT, AT, CT, RT, CRT>) => (
  <ReactionList<UT, AT, CT, RT, CRT, PT>
    Paginator={Paginator}
    activityId={activityId}
    reactionKind="comment"
    Reaction={({ reaction: comment }) => (
      <>
        {smartRender<CommentItemProps<UT, RT, CRT>>(CommentItem, { comment })}
      </>
    )}
    activityPath={activityPath}
    oldestToNewest={oldestToNewest}
    reverseOrder={reverseOrder}
  />
);
