import React from 'react';
import classNames from 'classnames';
import { Link } from './Link';
import { useTranslationContext } from '../context';
var generateText = function (count, word) { return "You have " + count + " new " + word; };
export var NewActivitiesNotification = function (_a) {
    var _b = _a.adds, adds = _b === void 0 ? [] : _b, _c = _a.deletes, deletes = _c === void 0 ? [] : _c, labelPlural = _a.labelPlural, labelSingle = _a.labelSingle, onClick = _a.onClick, labelFunction = _a.labelFunction, className = _a.className, style = _a.style;
    var t = useTranslationContext().t;
    var attributes = {
        addCount: adds.length,
        deleteCount: deletes.length,
        count: adds.length + deletes.length,
        labelPlural: labelPlural,
        labelSingle: labelSingle,
    };
    var defaultLabelFunction = labelFunction !== null && labelFunction !== void 0 ? labelFunction : (function (_a) {
        var addCount = _a.addCount, labelPlural = _a.labelPlural, labelSingle = _a.labelSingle;
        if (!addCount)
            return null;
        if (addCount > 1)
            return labelPlural
                ? generateText(addCount, labelPlural)
                : t('You have {{ notificationCount }} new notifications', {
                    notificationCount: addCount,
                });
        return labelSingle ? generateText(1, labelSingle) : t('You have 1 new notification');
    });
    var label = defaultLabelFunction(attributes);
    if (!label)
        return null;
    return (React.createElement("button", { className: classNames('raf-new-activities-notification', className), type: "button", onClick: onClick, style: style },
        React.createElement(Link, null, label)));
};
//# sourceMappingURL=NewActivitiesNotification.js.map