import React from 'react';
import classNames from 'classnames';
import { Button } from './Button';
import { useTranslationContext } from '../context';
export var LoadMoreButton = function (_a) {
    var onClick = _a.onClick, _b = _a.refreshing, refreshing = _b === void 0 ? false : _b, children = _a.children, className = _a.className, style = _a.style;
    var t = useTranslationContext().t;
    return (React.createElement("div", { className: classNames('raf-load-more-button', className), style: style },
        React.createElement(Button, { onClick: onClick, buttonStyle: "info", disabled: refreshing, loading: refreshing }, children ? children : t('Load more'))));
};
//# sourceMappingURL=LoadMoreButton.js.map