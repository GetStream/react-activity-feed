// @flow
import React from 'react';
import '../styles/Notification.css';
import Avatar from './Avatar';
import Link from './Link';
// import AttachedActivity from './AttachedActivity';

import type { NotificationActivities } from '../types';
import { humanizeTimestamp, userOrDefault } from '../utils';

type Props = {
  activities: NotificationActivities,
};

/**
 * Component is described here.
 *
 * @example ./examples/Notification.md
 */
export default class Notification extends React.Component<Props> {
  render() {
    // START PASTED FROM RN LIB
    let headerText, headerSubtext;
    const lastActivity = this.props.activities[0];
    const lastActor = userOrDefault(lastActivity.actor);

    if (this.props.activities.length === 1) {
      headerText = lastActor.data.name;
    } else if (this.props.activities.length > 1 + 1) {
      headerText = `${lastActor.data.name} and 1 other`;
    } else {
      headerText = `${lastActor.data.name} and ${this.props.activities.length -
        1} others `;
    }

    if (typeof lastActivity.object === 'string') {
      return null;
    }

    if (lastActivity.verb === 'heart') {
      headerSubtext = 'liked';
      // icon = HeartIcon;
    } else if (lastActivity.verb === 'repost') {
      headerSubtext = `reposted`;
      // icon = RepostIcon;
    } else {
      return null;
    }

    headerSubtext += ` your ${lastActivity.object.verb}`;

    // END PASTED FROM RN LIB
    return (
      <div className="raf-notification">
        <Avatar image={lastActor.data.profileImage} circle size={30} />
        <div className="raf-notification__content">
          <p>
            <strong>{headerText}</strong> {headerSubtext}
          </p>
          <p>
            <small>{humanizeTimestamp(lastActivity.time)}</small>
          </p>
          {/* { this.props.attachedActivity ? (
            <AttachedActivity
              author={'Josh'}
              content="Winds 2 is the Open Source megalocosmos flat earth effect on anti-gravity food chemicals..."
            />
          ) : null} */}
        </div>
        <div className="raf-notification__extra">
          <p>
            <Link>Follow</Link>
          </p>
        </div>
      </div>
    );
  }
}
