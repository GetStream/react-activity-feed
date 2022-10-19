import React from 'react';
import classNames from 'classnames';
export var Title = function (_a) {
    var _b = _a.size, size = _b === void 0 ? 18 : _b, children = _a.children, className = _a.className, _c = _a.style, style = _c === void 0 ? { fontSize: size } : _c;
    return (React.createElement("div", { className: classNames('raf-title', className), style: style }, children));
};
//# sourceMappingURL=Title.js.map