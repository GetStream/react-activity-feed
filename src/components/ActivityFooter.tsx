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
> = Pick<ActivityProps<UT, AT, CT, RT, CRT>, 'activity' | 'feedGroup' | 'userId'>;

export const ActivityFooter = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>(
  props: ActivityFooterProps<UT, AT, CT, RT, CRT>,
) => (
  <div className="raf-activity-footer">
    <div className="raf-activity-footer__left" />
    <div className="raf-activity-footer__right">
      <Flex a="center">
        <LikeButton<UT, AT, CT, RT, CRT> {...props} />
        <RepostButton<UT, AT, CT, RT, CRT> {...props} />
      </Flex>
    </div>
  </div>
);

ActivityFooter.defaultProps = {
  feedGroup: 'user',
};
