// @flow
import React from 'react';
import { userOrDefault } from '../utils';
import type { ActivityData } from '../types';

import { Thumbnail } from 'react-file-utils';

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
    const images =
      activity.attachments !== undefined &&
      activity.attachments.images !== undefined
        ? activity.attachments.images
        : [];
    const actor = userOrDefault(activity.actor);

    if (
      activity.verb === 'repost' ||
      activity.verb === 'post' ||
      activity.verb === 'comment'
    ) {
      return (
        <div className="raf-attached-activity">
          {images.length === 0 && (
            <React.Fragment>
              <p className="raf-attached-activity__author">
                <strong>{actor.data.name}</strong>
              </p>
              <p className="raf-attached-activity__content">
                {activity.object}
              </p>
            </React.Fragment>
          )}
          {images.length > 0 && (
            <div className="raf-attached-activity__images">
              {images.slice(0, 5).map((image, i) => (
                <Thumbnail image={image} size={50} key={`image-${i}`} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  }
}
