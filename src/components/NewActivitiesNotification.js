// @flow

import React from 'react';
import Link from './Link';

export type Props = {|
  adds: Array<{}>,
  deletes: Array<{}>,
  labelSingle?: string,
  labelPlural?: string,
  /** A function that returns either the string to display or null in case no
   * notification should be displayed */
  labelFunction?: ({
    count: number,
    deleteCount: number,
    addCount: number,
    labelPlural?: string,
    labelSingle?: string,
  }) => string | null,
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

  _labelFunction = () => {
    const {
      adds,
      deletes,
      labelSingle,
      labelPlural,
      labelFunction,
    } = this.props;
    const addCount = (adds || []).length;
    const deleteCount = (deletes || []).length;
    const count = addCount + deleteCount;
    if (labelFunction) {
      return labelFunction({
        count,
        addCount,
        deleteCount,
        labelSingle,
        labelPlural,
      });
    }
    if (addCount === 0) {
      return null;
    }
    return `You have ${addCount} new ${(addCount > 1
      ? labelPlural
      : labelSingle) || ''}`;
  };
  render() {
    const label = this._labelFunction();
    if (label === null) {
      return null;
    }

    return (
      <button
        className="raf-new-activities-notification"
        type="button"
        onClick={this.props.onClick}
      >
        <Link>{label}</Link>
      </button>
    );
  }
}
