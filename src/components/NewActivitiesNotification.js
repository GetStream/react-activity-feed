import React from 'react';
import { Link } from './Link';
import { withTranslationContext } from '../Context';

/**
 * Component is described here.
 *
 * @example ./examples/NewActivitiesNotification.md
 */
class NewActivitiesNotification extends React.Component {
  static defaultProps = {
    adds: [],
    deletes: [],
  };

  _labelFunction = () => {
    const { adds, deletes, labelSingle, labelPlural, labelFunction, t } = this.props;
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
    let singleNotificationText = '';
    let pluralNotificationText = '';

    if (labelSingle) {
      singleNotificationText = `You have 1 new ${labelSingle}`;
    } else {
      singleNotificationText = t('You have 1 new notification');
    }

    if (labelPlural) {
      pluralNotificationText = `You have ${addCount} new ${labelPlural}`;
    } else {
      pluralNotificationText = t('You have {{ notificationCount }} new notifications', {
        notificationCount: addCount,
      });
    }

    return addCount > 1 ? pluralNotificationText : singleNotificationText;
  };
  render() {
    const label = this._labelFunction();
    if (label === null) {
      return null;
    }

    return (
      <button className="raf-new-activities-notification" type="button" onClick={this.props.onClick}>
        <Link>{label}</Link>
      </button>
    );
  }
}

export default withTranslationContext(NewActivitiesNotification);
