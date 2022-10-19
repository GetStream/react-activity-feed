import React from 'react';
import classNames from 'classnames';
export var Link = function (_a) {
    var to = _a.to, children = _a.children, onClick = _a.onClick, className = _a.className, style = _a.style;
    return (React.createElement("a", { href: to, className: classNames('raf-link', className), onClick: onClick, style: style }, children));
};
//# sourceMappingURL=Link.js.map