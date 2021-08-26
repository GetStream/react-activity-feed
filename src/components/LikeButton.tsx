import React, { useEffect } from 'react';
import { EnrichedReaction, UR, Reaction, EnrichedActivity } from 'getstream';

import { DefaultAT, DefaultUT } from '../context/StreamApp';
import { ReactionToggleIcon } from './ReactionToggleIcon';
import { ThumbsUpIcon, Color } from './Icons';
import { useFeedContext } from '../context';

export type LikeButtonProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  /** The activity received from stream that should be liked when pressing the LikeButton. */
  activity?: EnrichedActivity<UT, AT, CT, RT, CRT>;
  /** The reaction received from stream that should be liked when pressing the LikeButton. */
  reaction?: EnrichedReaction<RT, CRT, UT>;
  /** onAddReaction supports targetFeeds that you can use to send a notification to the post owner like ["notification:USER_ID"] */
  targetFeeds?: string[];
};

export const LikeButton = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  activity,
  reaction,
  targetFeeds,
}: LikeButtonProps<UT, AT, CT, RT, CRT>) => {
  const feed = useFeedContext<UT, AT, CT, RT, CRT, PT>();

  useEffect(() => {
    if (!reaction && !activity) console.warn('LikeButton requires an activity or reaction to work properly');
    if (reaction && activity) console.warn('LikeButton requires only one of the activity or reaction to work properly');
  }, []);

  return (
    <ReactionToggleIcon
      counts={reaction?.children_counts ?? activity?.reaction_counts}
      own_reactions={reaction?.own_children ?? activity?.own_reactions}
      kind="like"
      onPress={() => {
        if (reaction) return feed.onToggleChildReaction('like', reaction as Reaction<RT>, {} as CRT, { targetFeeds });
        if (activity) return feed.onToggleReaction('like', activity, {} as RT, { targetFeeds });
        return Promise.resolve();
      }}
      activeIcon={<ThumbsUpIcon style={{ color: Color.Active }} />}
      inactiveIcon={<ThumbsUpIcon style={{ color: Color.Inactive }} />}
      labelSingle="like"
      labelPlural="likes"
    />
  );
};
