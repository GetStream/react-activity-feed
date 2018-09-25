import React from 'react';
import '../styles/AttachedActivity.css';

/**
 * Component is described here.
 *
 * @example ./examples/AttachedActivity.md
 */
export default class AttachedActivity extends React.Component {
  render() {
    const { activity } = this.props;

    if (
      activity.verb === 'repost' ||
      activity.verb === 'post' ||
      activity.verb === 'comment'
    ) {
      return (
        <div className="raf-attached-activity">
          {activity.author ? (
            <p className="raf-attached-activity__author">
              <strong>{activity.author}</strong>
            </p>
          ) : null}
          <p className="raf-attached-activity__content">{activity.content}</p>
        </div>
      );
    }

    return null;
  }
}
