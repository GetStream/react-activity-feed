// @flow

import React from 'react';
import Link from './Link';
import '../styles/NewActivitiesNotification.css';

export type Props = {|
  labelSingle?: string,
  labelPlural?: string,
  count?: number,
|};

/**
 * Component is described here.
 *
 * @example ./examples/NewActivitiesNotification.md
 */
export default class NewActivitiesNotification extends React.Component<Props> {
  render() {
    return (
      <div className="raf-new-activities-notification" role="button">
        <Link>{this.props.count || 1} new activity</Link>
      </div>
    );
  }
}
