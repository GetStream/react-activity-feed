import React from 'react';
import { EnrichedActivity, UR } from 'getstream';

import LikeButton from './LikeButton';
import RepostButton from './RepostButton';
import { Flex } from './Flex';
import { DefaultAT } from '../Context/StreamApp';

type ActivityFooterProps<AT extends DefaultAT = DefaultAT> = {
  activity: EnrichedActivity<UR, AT>;
  feedGroup?: string;
  onToggleReaction?: () => void;
};

export function ActivityFooter<AT extends DefaultAT = DefaultAT>(props: ActivityFooterProps<AT>) {
  const { activity, onToggleReaction } = props;

  return (
    <div className="raf-activity-footer">
      <div className="raf-activity-footer__left" />
      <div className="raf-activity-footer__right">
        <Flex a="center">
          <LikeButton activity={activity} onToggleReaction={onToggleReaction} />
          <RepostButton {...props} />
        </Flex>
      </div>
    </div>
  );
}
