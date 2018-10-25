// @flow
import React from 'react';
import { userOrDefault } from '../utils';
import type { ActivityData } from '../types';

type Props = {|
  activity: ActivityData,
|};

/**
 * Component is described here.
 *
 * @example ./examples/AttachedActivity.md
 */
export default class AttachedActivity extends React.Component<Props> {
  render() {
    const { activity } = this.props;
    const actor = userOrDefault(activity.actor);

    if (
      activity.verb === 'repost' ||
      activity.verb === 'post' ||
      activity.verb === 'comment'
    ) {
      return (
        <div className="raf-attached-activity">
          <p className="raf-attached-activity__author">
            <strong>{actor.data.name}</strong>
          </p>
          <p className="raf-attached-activity__content">{activity.object}</p>
        </div>
      );
    }

    return null;
  }
}
