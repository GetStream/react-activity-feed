import React, { useEffect } from 'react';
import { EnrichedActivity, EnrichedReaction, UR, Activity } from 'getstream';

import { FeedManager } from '../Context/FeedManager';
import { DefaultAT, DefaultUT } from '../Context/StreamApp';
import ReactionToggleIcon from './ReactionToggleIcon';
import { ThumbsUpIcon, Color } from './Icons';

export type LikeButtonProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  activity: EnrichedActivity<AT, UT>;
  reaction: EnrichedReaction<RT, CRT, UT>;
} & Partial<Pick<FeedManager<UT, AT>, 'onToggleChildReaction' | 'onToggleReaction'>>;

export const LikeButton = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  RT extends UR = UR,
  CRT extends UR = UR
>({
  activity,
  reaction,
  onToggleChildReaction,
  onToggleReaction,
}: LikeButtonProps<UT, AT, RT, CRT>) => {
  useEffect(() => {
    if (reaction && !onToggleChildReaction)
      console.warn(
        'reaction is passed to the LikeButton but onToggleChildReaction is not, falling back to liking the activity',
      );
  }, [reaction, onToggleChildReaction]);

  const [counts, ownReactions] =
    reaction && onToggleChildReaction
      ? [reaction.children_counts, reaction.own_children]
      : [activity.reaction_counts, activity.own_reactions];

  return (
    <ReactionToggleIcon
      counts={counts}
      own_reactions={ownReactions}
      kind="like"
      onPress={() => {
        if (reaction && onToggleChildReaction) return onToggleChildReaction('like', reaction, {});

        return onToggleReaction?.('like', activity as Activity<AT>, {});
      }}
      activeIcon={<ThumbsUpIcon style={{ color: Color.Active }} />}
      inactiveIcon={<ThumbsUpIcon style={{ color: Color.Inactive }} />}
      labelSingle="like"
      labelPlural="likes"
    />
  );
};
