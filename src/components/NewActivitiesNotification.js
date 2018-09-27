// @flow

import React from 'react';
import Link from './Link';
import '../styles/NewActivitiesNotification.css';

export type Props = {|
  adds: Array<{}>,
  deletes: Array<{}>,
  labelSingle?: string,
  labelPlural?: string,
  onClick?: () => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/NewActivitiesNotification.md
 */
export default class NewActivitiesNotification extends React.Component<Props> {
  static defaultProps = {
    labelSingle: 'notification',
    labelPlural: 'notifications',
    adds: [],
    deletes: [],
  };
  render() {
    const addCount = this.props.adds.length;
    const deleteCount = this.props.deletes.length;
    const count = addCount + deleteCount;
    if (count === 0) {
      return null;
    }

    return (
      <div className="raf-new-activities-notification" role="button">
        <Link onClick={this.props.onClick}>
          {count} new{' '}
          {count !== 1 ? this.props.labelPlural : this.props.labelSingle}
        </Link>
      </div>
    );
  }
}
