import React from 'react';
import { UR } from 'getstream';

import { LikeButton } from './LikeButton';
import { RepostButton } from './RepostButton';
import { Flex } from './Flex';
import { DefaultAT, DefaultUT } from '../context/StreamApp';
import { ActivityProps } from './Activity';

export type ActivityFooterProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = Pick<ActivityProps<UT, AT, CT, RT, CRT>, 'activity' | 'feedGroup' | 'userId' | 'className' | 'style'> & {
  targetFeeds?: string[];
};

export const ActivityFooter = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>({
  activity,
  feedGroup = 'user',
  userId,
  targetFeeds,
  className = 'raf-activity-footer',
  style,
}: ActivityFooterProps<UT, AT, CT, RT, CRT>) => (
  <div className={className} style={style}>
    <div className="raf-activity-footer__left" />
    <div className="raf-activity-footer__right">
      <Flex a="center">
        <LikeButton<UT, AT, CT, RT, CRT> {...{ activity, targetFeeds, feedGroup, userId }} />
        <RepostButton<UT, AT, CT, RT, CRT> {...{ activity, targetFeeds, feedGroup, userId }} />
      </Flex>
    </div>
  </div>
);
