import React, { useEffect } from 'react';
import { EnrichedReaction, UR, Reaction } from 'getstream';

import { FeedManager } from '../Context/FeedManager';
import { DefaultAT, DefaultUT } from '../Context/StreamApp';
import ReactionToggleIcon from './ReactionToggleIcon';
import { ThumbsUpIcon, Color } from './Icons';
import { ActivityProps } from './Activity';

export type LikeButtonProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  /** The function that toggles reactions on reactions. */
  onToggleChildReaction?: FeedManager<UT, AT, CT, RT, CRT>['onToggleChildReaction'];
  /** The reaction received from stream that should be liked when pressing the
   * LikeButton. Liking a reaction requires to pass both this field and
   * the `onToggleChildReaction` as well. */
  reaction?: EnrichedReaction<RT, CRT, UT>;
} & Pick<ActivityProps<UT, AT, CT, RT, CRT>, 'onToggleReaction' | 'activity'>;

export const LikeButton = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>({
  activity,
  reaction,
  onToggleChildReaction,
  onToggleReaction,
}: LikeButtonProps<UT, AT, CT, RT, CRT>) => {
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
        if (reaction && onToggleChildReaction)
          return onToggleChildReaction('like', reaction as Reaction<RT>, {} as CRT);

        return onToggleReaction?.('like', activity, {} as RT);
      }}
      activeIcon={<ThumbsUpIcon style={{ color: Color.Active }} />}
      inactiveIcon={<ThumbsUpIcon style={{ color: Color.Inactive }} />}
      labelSingle="like"
      labelPlural="likes"
    />
  );
};
