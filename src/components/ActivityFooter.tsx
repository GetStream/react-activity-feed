import React from 'react';
import { EnrichedActivity } from 'getstream';

import { LikeButton } from './LikeButton';
import RepostButton from './RepostButton';
import { Flex } from './Flex';
import { DefaultAT, DefaultUT } from '../Context/StreamApp';
import { FeedManager } from '../Context/FeedManager';

export type ActivityFooterProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = {
  /** The activity received for stream for which to show the like buton. This is
   * used to initalize the toggle state and the counter. */
  activity: EnrichedActivity<UT, AT>;
  /** The function that toggles  reaction. */
  onToggleReaction: FeedManager<UT, AT>['onToggleReaction'];
  /** The feed group part of the feed that the activity should be reposted to
   * when pressing the RepostButton, e.g. `user` when posting to your own profile
   * defaults to 'user' feed */
  feedGroup?: string;
  /** The user_id part of the feed that the activity should be reposted to when
   * pressing the RepostButton */
  userId?: string;
};

export const ActivityFooter = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>(
  props: ActivityFooterProps<UT, AT>,
) => {
  return (
    <div className="raf-activity-footer">
      <div className="raf-activity-footer__left" />
      <div className="raf-activity-footer__right">
        <Flex a="center">
          <LikeButton activity={props.activity} onToggleReaction={props.onToggleReaction} />
          <RepostButton {...props} />
        </Flex>
      </div>
    </div>
  );
};

ActivityFooter.defaultProps = {
  feedGroup: 'user',
};
