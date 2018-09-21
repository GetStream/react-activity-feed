import React from 'react';
import '../styles/Notification.css';

import Avatar from './Avatar';
import Link from './Link';

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
