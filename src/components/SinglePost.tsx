import React from 'react';
import { GetFeedOptions, UR } from 'getstream';

import { DefaultAT, DefaultUT } from '../context';
import { FlatFeed, FlatFeedProps } from './FlatFeed';

export type SinglePostProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
> = FlatFeedProps<UT, AT, CT, RT, CRT, PT> & { activityId: string };

/**
 * Shows the detail of a single activity
 */
export function SinglePost<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({ options, activityId, doFeedRequest, ...props }: SinglePostProps<UT, AT, CT, RT, CRT, PT>) {
  return (
    <FlatFeed<UT, AT, CT, RT, CRT, PT>
      {...props}
      options={{ withRecentReactions: true, ...options }}
      doFeedRequest={(client, feedGroup, userId, opts) => {
        if (doFeedRequest) {
          return doFeedRequest(client, feedGroup, userId, {
            ...opts,
            id_lte: activityId,
            id_gte: activityId,
            limit: 1,
          });
        }

        return client.feed(feedGroup, userId).getActivityDetail(activityId, opts as GetFeedOptions);
      }}
    />
  );
}
