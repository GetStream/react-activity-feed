import React from 'react';

import { DefaultAT, DefaultUT } from '../context/StreamApp';
import { useTranslationContext } from '../context/TranslationContext';
import { userOrDefault, humanizeTimestamp, useOnClickUser } from '../utils';
import { ActivityProps } from './Activity';
import { UserBar } from './UserBar';

export type ActivityHeaderProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = Pick<
  ActivityProps<UT, AT>,
  'activity' | 'HeaderRight' | 'icon' | 'onClickUser' | 'className' | 'style'
>;

export const ActivityHeader = <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({
  activity,
  HeaderRight,
  icon,
  onClickUser,
  style = { padding: '8px 16px' },
  className,
}: ActivityHeaderProps<UT, AT>) => {
  const { tDateTimeParser } = useTranslationContext();

  const actor = userOrDefault<UT>(activity.actor);
  const handleUserClick = useOnClickUser<UT>(onClickUser);

  return (
    <div style={style} className={className}>
      <UserBar
        username={actor.data.name}
        avatar={actor.data.profileImage}
        onClickUser={handleUserClick?.(actor)}
        subtitle={HeaderRight ? humanizeTimestamp(activity.time, tDateTimeParser) : undefined}
        timestamp={activity.time}
        icon={icon}
        Right={HeaderRight}
      />
    </div>
  );
};
