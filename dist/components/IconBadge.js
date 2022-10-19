import React from 'react';
import classNames from 'classnames';
import { BellIcon } from './Icons';
export var IconBadge = function (_a) {
    var children = _a.children, onClick = _a.onClick, hidden = _a.hidden, _b = _a.unseen, unseen = _b === void 0 ? 0 : _b, showNumber = _a.showNumber, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-icon-badge', className), role: "button", onClick: onClick, style: style }, children !== null && children !== void 0 ? children : React.createElement(BellIcon, null),
        unseen > 0 && !hidden && (React.createElement("div", { className: "raf-icon-badge__badge", "data-testid": "unseen-wrapper" }, showNumber && React.createElement("p", { "data-testid": "unseen-count" }, unseen)))));
};
//# sourceMappingURL=IconBadge.js.map