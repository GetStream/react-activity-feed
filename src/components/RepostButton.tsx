import React from 'react';
import { EnrichedActivity, UR } from 'getstream';

import { ReactionToggleIcon } from './ReactionToggleIcon';
import { useFeedContext, DefaultAT, DefaultUT, useStreamContext } from '../Context';
import { RepostIcon, Color } from './Icons';

export type RepostButtonType<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  /** The activity received for stream for which to show the like button. This is
   * used to initialize the toggle state and the counter. */
  activity: EnrichedActivity<UT, AT, CT, RT, CRT>;
  /** The feed group part of the feed that the activity should be reposted to,
   * e.g. `user` when posting to your own profile */
  feedGroup?: string;
  /** Repost reaction custom data  */
  repostData?: RT;
  /** The user_id part of the feed that the activity should be reposted to, default to current user id */
  userId?: string;
};

/**
 * A repost button ready to be embedded as Activity footer
 */
export const RepostButton = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  activity,
  feedGroup = 'user',
  userId,
  repostData,
}: RepostButtonType<UT, AT, CT, RT, CRT>) => {
  const feed = useFeedContext<UT, AT, CT, RT, CRT, PT>();
  const app = useStreamContext<UT, AT, CT, RT, CRT, PT>();

  return (
    <ReactionToggleIcon<UT, RT, CRT>
      counts={activity.reaction_counts}
      own_reactions={activity.own_reactions}
      kind="repost"
      onPress={() =>
        feed.onToggleReaction('repost', activity, repostData, {
          targetFeeds: [`${feedGroup}:${userId || app.user?.id}`],
        })
      }
      activeIcon={<RepostIcon style={{ color: Color.Active }} />}
      inactiveIcon={<RepostIcon style={{ color: Color.Inactive }} />}
    />
  );
};
