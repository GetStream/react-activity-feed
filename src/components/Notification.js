import React from 'react';
import Avatar from './Avatar';
import AvatarGroup from './AvatarGroup';
import { AttachedActivity } from './AttachedActivity';
import Dropdown from './Dropdown';
import { Link } from './Link';

import { humanizeTimestamp, userOrDefault } from '../utils';

import { withTranslationContext } from '../Context';

/**
 * Component is described here.
 *
 * @example ./examples/Notification.md
 */
class Notification extends React.Component {
  getUsers = (activities) => activities.map((item) => userOrDefault(item.actor));

  _getOnClickUser(actor) {
    return this.props.onClickUser ? (e) => this.onClickUser(e, actor) : undefined;
  }

  onClickUser = (e, actor) => {
    const { onClickUser } = this.props;
    if (onClickUser) {
      e.stopPropagation();
      return onClickUser(userOrDefault(actor));
    }
  };

  _getOnClickNotification() {
    return this.props.onClickNotification ? this.onClickNotification : undefined;
  }

  onClickNotification = (e) => {
    const { onClickNotification } = this.props;
    if (onClickNotification) {
      e.stopPropagation();
      return onClickNotification(this.props.activityGroup);
    }
  };

  render() {
    let headerText, headerSubtext;
    const { activityGroup, onMarkAsRead, t, tDateTimeParser } = this.props;
    const activities = activityGroup.activities;
    const latestActivity = activities[0];
    const lastActor = userOrDefault(latestActivity.actor);

    if (typeof latestActivity.object === 'string') {
      return null;
    }

    if (activities.length === 1) {
      switch (latestActivity.verb) {
        case 'like':
          headerText = t('{{ actorName }} liked your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        case 'repost':
          headerText = t('{{ actorName }} reposted your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        case 'follow':
          headerText = t('{{ actorName }} followed you', {
            actorName: lastActor.data.name,
          });
          break;
        case 'comment':
          headerText = t('{{ actorName }} commented on your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        default:
          console.warn(
            'No notification styling found for your verb, please create your own custom Notification group.',
          );
      }
    } else if (activities.length > 1 && activities.length < 1 + 1 + 1) {
      switch (latestActivity.verb) {
        case 'like':
          headerText = t('{{ actorName }} and 1 other liked your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        case 'repost':
          headerText = t('{{ actorName }} and 1 other reposted your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        case 'follow':
          headerText = t('{{ actorName }} and 1 other followed you', {
            actorName: lastActor.data.name,
          });
          break;
        case 'comment':
          headerText = t('{{ actorName }} and 1 other commented on your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        default:
          console.warn(
            'No notification styling found for your verb, please create your own custom Notification group.',
          );
      }
    } else {
      switch (latestActivity.verb) {
        case 'like':
          headerText = t('{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        case 'repost':
          headerText = t('{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        case 'follow':
          headerText = t('{{ actorName }} and {{ countOtherActors }} others followed you', {
            actorName: lastActor.data.name,
          });
          break;
        case 'comment':
          headerText = t('{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}', {
            actorName: lastActor.data.name,
            activityVerb: latestActivity.object.verb,
          });
          break;
        default:
          console.warn(
            'No notification styling found for your verb, please create your own custom Notification group.',
          );
      }
    }

    return (
      <div
        onClick={this._getOnClickNotification()}
        className={'raf-notification' + (activityGroup.is_read ? ' raf-notification--read' : '')}
      >
        <Avatar onClick={this._getOnClickUser(lastActor)} image={lastActor.data.profileImage} circle size={30} />
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
            <small>{humanizeTimestamp(latestActivity.time, tDateTimeParser)}</small>
          </div>
          {latestActivity.verb !== 'follow' ? <AttachedActivity activity={latestActivity.object} /> : null}
        </div>
        <div className="raf-notification__extra">
          {activities.length > 1 && latestActivity.verb === 'follow' ? (
            <AvatarGroup
              onClickUser={this.props.onClickUser}
              avatarSize={30}
              users={this.getUsers(activities.slice(1, activities.length))}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default withTranslationContext(Notification);
