// @flow
import React from 'react';
import Avatar from './Avatar';
import AvatarGroup from './AvatarGroup';
import Link from './Link';
import AttachedActivity from './AttachedActivity';

import { humanizeTimestamp, userOrDefault } from '../utils';

type Props = {
  activityGroup: any,
};

/**
 * Component is described here.
 *
 * @example ./examples/Notification.md
 */
export default class Notification extends React.Component<Props> {
  // $FlowFixMe
  getUsers = (activities: any) => {
    const users = [];
    activities.forEach((item) => users.push(item.actor.data));
    return users;
  };

  render() {
    let headerText, headerSubtext;
    const activities = this.props.activityGroup.activities;
    const lastActivity = activities[0];
    const lastActor = userOrDefault(lastActivity.actor);

    if (activities.length === 1) {
      headerText = lastActor.data.name;
    } else if (activities.length > 1 && activities.length < 1 + 1 + 1) {
      headerText = `${lastActor.data.name} and 1 other `;
    } else {
      headerText = `${lastActor.data.name} and ${activities.length -
        1} others `;
    }

    if (typeof lastActivity.object === 'string') {
      return null;
    }

    if (lastActivity.verb === 'like') {
      headerSubtext = 'liked';
      headerSubtext += ` your ${lastActivity.object.verb}`;
      // icon = HeartIcon;
    } else if (lastActivity.verb === 'repost') {
      headerSubtext = `reposted`;
      headerSubtext += ` your ${lastActivity.object.verb}`;
      // icon = RepostIcon;
    } else if (lastActivity.verb === 'follow') {
      headerSubtext = `followed`;
      headerSubtext += ` you`;
      // icon = RepostIcon;
    } else {
      return null;
    }

    this.getUsers(activities);

    return (
      <div
        className={
          'raf-notification' +
          (this.props.activityGroup.read ? ' raf-notification--read' : '')
        }
      >
        <Avatar image={lastActor.data.profileImage} circle size={30} />
        <div className="raf-notification__content">
          <p>
            <strong>{headerText}</strong> {headerSubtext}
          </p>
          <p>
            <small>{humanizeTimestamp(lastActivity.time)}</small>
          </p>
          {lastActivity.verb !== 'follow' ? (
            <AttachedActivity activity={lastActivity.object} />
          ) : null}
        </div>
        <div className="raf-notification__extra">
          {activities.length > 1 && lastActivity.verb === 'follow' ? (
            <AvatarGroup avatarSize={30} users={this.getUsers(activities)} />
          ) : (
            <p>
              {activities.length === 1 && lastActivity.verb === 'follow' ? (
                <Link>Follow</Link>
              ) : (
                <Link>View</Link>
              )}
            </p>
          )}
        </div>
      </div>
    );
  }
}
