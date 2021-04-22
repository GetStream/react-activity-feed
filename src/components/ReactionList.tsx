import React, { useEffect } from 'react';
import immutable from 'immutable';
import { UR, EnrichedReaction } from 'getstream';

import { LoadMorePaginator, LoadMorePaginatorProps } from './LoadMorePaginator';
import { useFeedContext, DefaultUT, DefaultAT } from '../Context';
import { smartRender, ElementOrComponentOrLiteralType } from '../utils';

export type ReactionListType<UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR> = {
  /** The ID of the activity for which these reactions are */
  activityId: string;
  /** The component that should render the reaction */
  Reaction: ElementOrComponentOrLiteralType<{ reaction: EnrichedReaction<RT, CRT, UT>; key?: string }>;
  /** The reaction kind that you want to display in this list, e.g `like` or `comment` */
  reactionKind: string;
  /** Only needed for reposted activities where you want to show the reactions
   * of the original activity, not of the repost */
  activityPath?: string[];
  /** Show and load reactions starting with the oldest reaction first, instead
   * of the default where reactions are displayed and loaded most recent first. */
  oldestToNewest?: boolean;
  /** By default pagination is done with a "Load more" button, you can use
   * InfiniteScrollPaginator to enable infinite scrolling */
  Paginator?: ElementOrComponentOrLiteralType<LoadMorePaginatorProps>;
  /** Reverse the order the reactions are displayed in. */
  reverseOrder?: boolean;
};

export const ReactionList = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  activityId,
  Reaction,
  reactionKind,
  activityPath: defaultActivityPath,
  oldestToNewest = false,
  Paginator = LoadMorePaginator,
  reverseOrder = false,
}: ReactionListType<UT, RT, CRT>) => {
  const feed = useFeedContext<UT, AT, CT, RT, CRT, PT>();

  const activityPath = defaultActivityPath || feed.getActivityPath(activityId);
  const orderPrefix = oldestToNewest ? 'oldest' : 'latest';
  const reactionsExtra = feed.activities.getIn([...activityPath, orderPrefix + '_reactions_extra']);
  const hasNextPage = reactionsExtra ? !!reactionsExtra.getIn([reactionKind, 'next'], '') : true;
  let reactions = feed.activities.getIn(
    [...activityPath, orderPrefix + '_reactions', reactionKind],
    immutable.List(),
  ) as immutable.List<immutable.Record<EnrichedReaction>>;
  const refreshing = feed.activities.getIn(
    [...activityPath, orderPrefix + '_reactions_extra', reactionKind, 'refreshing'],
    false,
  );

  if (reverseOrder) reactions = reactions.reverse();

  const loadNextPage = () => {
    feed.loadNextReactions(activityId, reactionKind, activityPath, oldestToNewest);
  };

  useEffect(() => {
    if (oldestToNewest && reactionsExtra) {
      loadNextPage();
    }
  }, []);

  return (
    <>
      {smartRender<LoadMorePaginatorProps>(Paginator, {
        loadNextPage,
        hasNextPage,
        refreshing,
        reverse: reverseOrder,
        children: reactions.map((reaction) =>
          smartRender(Reaction, {
            reaction: reaction.toJS(),
            key: reaction.get('id'),
          }),
        ),
      })}
    </>
  );
};
