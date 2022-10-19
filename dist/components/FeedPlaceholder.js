import React from 'react';
import classNames from 'classnames';
import { useTranslationContext } from '../context';
export var FeedPlaceholder = function (_a) {
    var text = _a.text, className = _a.className, style = _a.style;
    var t = useTranslationContext().t;
    return (React.createElement("div", { className: classNames('raf-feed-placeholder', className), style: style },
        React.createElement("p", null, text || t('No data to display...'))));
};
//# sourceMappingURL=FeedPlaceholder.js.map