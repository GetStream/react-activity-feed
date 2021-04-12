import React from 'react';

import { DefaultAT, DefaultUT } from '../Context/StreamApp';
import { useTranslationContext } from '../Context/TranslationContext';
import { userOrDefault, humanizeTimestamp } from '../utils';
import { ActivityProps } from './Activity';
import { UserBar } from './UserBar';

export type ActivityHeaderProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = Pick<
  ActivityProps<UT, AT>,
  'activity' | 'HeaderRight' | 'icon' | 'onClickUser'
>;

export const ActivityHeader = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  activity,
  HeaderRight,
  icon,
  onClickUser,
}: ActivityHeaderProps<UT, AT>) => {
  const { tDateTimeParser } = useTranslationContext();

  const actor = userOrDefault<UT>(activity.actor);
  return (
    <div style={{ padding: '8px 16px' }}>
      <UserBar
        username={actor.data.name}
        avatar={actor.data.profileImage}
        onClickUser={onClickUser ? () => onClickUser(actor) : undefined}
        subtitle={HeaderRight ? humanizeTimestamp(activity.time, tDateTimeParser) : undefined}
        timestamp={activity.time}
        icon={icon}
        Right={HeaderRight}
      />
    </div>
  );
};
