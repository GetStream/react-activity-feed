import React from 'react';
import classNames from 'classnames';
import { Title } from './Title';
export var TimeHeader = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-time-header', className), style: style },
        React.createElement(Title, { size: 14 }, children),
        React.createElement("div", { className: "raf-time-header__line" })));
};
//# sourceMappingURL=TimeHeader.js.map