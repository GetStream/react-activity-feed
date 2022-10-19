import { __assign } from "tslib";
import React from 'react';
import classNames from 'classnames';
export var Flex = function (_a) {
    var j = _a.j, a = _a.a, js = _a.js, _b = _a.d, d = _b === void 0 ? 'row' : _b, _c = _a.w, w = _c === void 0 ? 'nowrap' : _c, style = _a.style, children = _a.children, className = _a.className;
    return (React.createElement("div", { className: classNames('raf-flex', className), style: __assign({ justifyContent: j, alignItems: a, justifySelf: js, flexDirection: d, flexWrap: w }, style) }, children));
};
//# sourceMappingURL=Flex.js.map