// @flow
import React from 'react';
import Avatar from './Avatar';
import AvatarGroup from './AvatarGroup';
import AttachedActivity from './AttachedActivity';
import Dropdown from './Dropdown';
import Link from './Link';

import { humanizeTimestamp, userOrDefault } from '../utils';
import type { UserResponse, BaseActivityGroupResponse } from '../types';

type Props = {
  /* The activity group to display in this notification */
  activityGroup: any,
  /* Callback to call when clicking on a notification */
  onClickNotification?: (activityGroup: BaseActivityGroupResponse) => mixed,
  /* Callback to call when clicking on a user in the notification */
  onClickUser?: (UserResponse) => mixed,
  /* Callback to mark a notification as read, if not supplied the dropdown to
   * mark as read will not bu shown */
  onMarkAsRead?: ?(
    group:
      | BaseActivityGroupResponse
      | $ReadOnlyArray<BaseActivityGroupResponse>,
  ) => Promise<mixed>,
};

/**
 * Component is described here.
 *
 * @example ./examples/Notification.md
 */
export default class Notification extends React.Component<Props> {
  getUsers = (activities: any) =>
    activities.map((item) => userOrDefault(item.actor));

  _getOnClickUser(actor: UserResponse) {
    return this.props.onClickUser
      ? (e: SyntheticEvent<>) => this.onClickUser(e, actor)
      : undefined;
  }

  onClickUser = (e: SyntheticEvent<>, actor: any) => {
    const { onClickUser } = this.props;
    if (onClickUser) {
      e.stopPropagation();
      return onClickUser(userOrDefault(actor));
    }
  };

  _getOnClickNotification() {
    return this.props.onClickNotification
      ? this.onClickNotification
      : undefined;
  }

  onClickNotification = (e: SyntheticEvent<>) => {
    const { onClickNotification } = this.props;
    if (onClickNotification) {
      e.stopPropagation();
      return onClickNotification(this.props.activityGroup);
    }
  };

  render() {
    let headerText, headerSubtext;
    const { activityGroup, onMarkAsRead } = this.props;
    const activities = activityGroup.activities;
    const latestActivity = activities[0];
    const lastActor = userOrDefault(latestActivity.actor);

    if (activities.length === 1) {
      headerText = lastActor.data.name;
    } else if (activities.length > 1 && activities.length < 1 + 1 + 1) {
      headerText = `${lastActor.data.name || 'Unknown'} and 1 other `;
    } else {
      headerText = `${lastActor.data.name ||
        'Unknown'} and ${activities.length - 1} others `;
    }

    if (typeof latestActivity.object === 'string') {
      return null;
    }

    if (latestActivity.verb === 'like') {
      headerSubtext = 'liked';
      headerSubtext += ` your ${latestActivity.object.verb}`;
      // icon = HeartIcon;
    } else if (latestActivity.verb === 'repost') {
      headerSubtext = `reposted`;
      headerSubtext += ` your ${latestActivity.object.verb}`;
      // icon = RepostIcon;
    } else if (latestActivity.verb === 'follow') {
      headerSubtext = `followed`;
      headerSubtext += ` you`;
      // icon = RepostIcon;
    } else if (latestActivity.verb === 'comment') {
      headerSubtext = `commented`;
      headerSubtext += ` on your ${latestActivity.object.verb}`;
      // icon = RepostIcon;
    } else {
      console.warn(
        'No notification styling found for your verb, please create your own custom Notification group.',
      );
      return null;
    }

    return (
      <div
        onClick={this._getOnClickNotification()}
        className={
          'raf-notification' +
          (activityGroup.is_read ? ' raf-notification--read' : '')
        }
      >
        <Avatar
          onClick={this._getOnClickUser(lastActor)}
          image={lastActor.data.profileImage}
          circle
          size={30}
        />
        <div className="raf-notification__content">
          <div className="raf-notification__header">
            <strong>{headerText}</strong> {headerSubtext}
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
            <small>{humanizeTimestamp(latestActivity.time)}</small>
          </div>
          {latestActivity.verb !== 'follow' ? (
            <AttachedActivity activity={latestActivity.object} />
          ) : null}
        </div>
        <div className="raf-notification__extra">
          {activities.length > 1 && latestActivity.verb === 'follow' ? (
            <AvatarGroup
              avatarSize={30}
              users={this.getUsers(activities.slice(1, activities.length))}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
