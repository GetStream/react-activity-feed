import React from 'react';
import '../styles/Notification.css';
import Avatar from './Avatar';
import Link from './Link';
import AttachedActivity from './AttachedActivity';

/**
 * Component is described here.
 *
 * @example ./examples/Notification.md
 */
export default class Notification extends React.Component {
  render() {
    return (
      <div className="raf-notification">
        <Avatar circle size={30} />
        <div className="raf-notification__content">
          <p>
            <strong>Actor</strong> followed you
          </p>
          <p>
            <small>12 minutes ago</small>
          </p>
          {this.props.attachedActivity ? (
            <AttachedActivity
              author={'Josh'}
              content="Winds 2 is the Open Source megalocosmos flat earth effect on anti-gravity food chemicals..."
            />
          ) : null}
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
