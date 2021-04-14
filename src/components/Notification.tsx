import React, { SyntheticEvent } from 'react';
import { EnrichedActivity, EnrichedUser, NotificationActivityEnriched, UR } from 'getstream';
import { TFunction } from 'i18next';

import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';
import { AttachedActivity } from './AttachedActivity';
import { Dropdown } from './Dropdown';
import { Link } from './Link';
import { humanizeTimestamp, useOnClickUser, userOrDefault, OnClickUserHandler } from '../utils';
import { DefaultUT, DefaultAT, useTranslationContext, FeedManager } from '../Context';

export type NotificationProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  /** The activity group to display in this notification */
  activityGroup: NotificationActivityEnriched<UT, AT, CT, RT, CRT>;
  /** Callback to call when clicking on a notification */
  onClickNotification?: (activityGroup: NotificationActivityEnriched<UT, AT, CT, RT, CRT>) => void;
  /** Callback to call when clicking on a user in the notification */
  onClickUser?: OnClickUserHandler<UT>;
  /** Callback to mark a notification as read, if not supplied the dropdown used to mark as read will not be shown */
  onMarkAsRead?: FeedManager<UT, AT, CT, RT, CRT>['onMarkAsRead'];
};

const getUsers = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>(
  activities: Array<EnrichedActivity<UT, AT, CT, RT, CRT>>,
) => activities.map((item) => userOrDefault<UT>(item.actor));

const getHeaderText = (t: TFunction, activitiesLen: number, verb: string, actorName: string, activityVerb: string) => {
  if (activitiesLen === 1) {
    switch (verb) {
      case 'like':
        return t('{{ actorName }} liked your {{ activityVerb }}', { actorName, activityVerb });
      case 'repost':
        return t('{{ actorName }} reposted your {{ activityVerb }}', { actorName, activityVerb });
      case 'follow':
        return t('{{ actorName }} followed you', { actorName });
      case 'comment':
        return t('{{ actorName }} commented on your {{ activityVerb }}', { actorName, activityVerb });
      default:
        console.warn('No notification styling found for your verb, please create your own custom Notification group.');
        return '';
    }
  }

  if (activitiesLen > 1 && activitiesLen < 3) {
    switch (verb) {
      case 'like':
        return t('{{ actorName }} and 1 other liked your {{ activityVerb }}', { actorName, activityVerb });
      case 'repost':
        return t('{{ actorName }} and 1 other reposted your {{ activityVerb }}', { actorName, activityVerb });
      case 'follow':
        return t('{{ actorName }} and 1 other followed you', { actorName });
      case 'comment':
        return t('{{ actorName }} and 1 other commented on your {{ activityVerb }}', { actorName, activityVerb });
      default:
        console.warn('No notification styling found for your verb, please create your own custom Notification group.');
        return '';
    }
  }

  const countOtherActors = activitiesLen - 1;
  switch (verb) {
    case 'like':
      return t('{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}', {
        actorName,
        activityVerb,
        countOtherActors,
      });
    case 'repost':
      return t('{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}', {
        actorName,
        activityVerb,
        countOtherActors,
      });
    case 'follow':
      return t('{{ actorName }} and {{ countOtherActors }} others followed you', {
        actorName,
        countOtherActors,
      });
    case 'comment':
      return t('{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}', {
        actorName,
        activityVerb,
        countOtherActors,
      });
    default:
      console.warn('No notification styling found for your verb, please create your own custom Notification group.');
      return '';
  }
};

export const Notification = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>({
  activityGroup,
  onMarkAsRead,
  onClickUser,
  onClickNotification,
}: NotificationProps<UT, AT, CT, RT, CRT>) => {
  const { t, tDateTimeParser } = useTranslationContext();
  const { activities } = activityGroup;
  const [latestActivity, ...restOfActivities] = activities;

  if (typeof latestActivity.object === 'string') return null;

  const lastObject = latestActivity.object as EnrichedActivity;
  const lastActor = userOrDefault(latestActivity.actor);
  const headerText = getHeaderText(t, activities.length, latestActivity.verb, lastActor.data.name, lastObject.verb);
  const handleUserClick = useOnClickUser<UT>(onClickUser);
  const handleNotificationClick = onClickNotification
    ? (e: SyntheticEvent) => {
        e.stopPropagation();
        onClickNotification(activityGroup);
      }
    : undefined;

  return (
    <div
      onClick={handleNotificationClick}
      className={`raf-notification ${activityGroup.is_read ? 'raf-notification--read' : ''}`}
    >
      <Avatar
        onClick={handleUserClick?.(lastActor as EnrichedUser<UT>)}
        image={lastActor.data.profileImage}
        circle
        size={30}
      />

      <div className="raf-notification__content">
        <div className="raf-notification__header">
          <strong>{headerText}</strong>
          {!activityGroup.is_read && onMarkAsRead && (
            <Dropdown>
              <div>
                <Link
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(activityGroup);
                  }}
                >
                  Mark&nbsp;as&nbsp;read
                </Link>
              </div>
            </Dropdown>
          )}
        </div>
        <div>
          <small>{humanizeTimestamp(latestActivity.time, tDateTimeParser)}</small>
        </div>
        {latestActivity.verb !== 'follow' && (
          <AttachedActivity activity={latestActivity.object as EnrichedActivity<UT, AT, CT, RT, CRT>} />
        )}
      </div>

      <div className="raf-notification__extra">
        {activities.length > 1 && latestActivity.verb === 'follow' && (
          <AvatarGroup
            onClickUser={onClickUser}
            avatarSize={30}
            users={getUsers<UT, AT, CT, RT, CRT>(restOfActivities) as Array<EnrichedUser<UT>>}
          />
        )}
      </div>
    </div>
  );
};
