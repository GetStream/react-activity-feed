import React from 'react';
import { smartRender } from '../utils';
/**
 * `DropdownPanel` is a more advanced component used to create a notification dropdown for instance, it comes with three parts:
 * `Header`, `Content` and `Footer`. The content has a limited height and the `overflow` is set to `scroll`.
 */
export var DropdownPanel = function (_a) {
    var _b = _a.arrow, arrow = _b === void 0 ? false : _b, _c = _a.right, right = _c === void 0 ? false : _c, Header = _a.Header, Footer = _a.Footer, children = _a.children, className = _a.className, style = _a.style;
    return (React.createElement("div", { "data-testid": "dp-wrapper", className: className !== null && className !== void 0 ? className : "raf-dropdown-panel" + (arrow ? ' raf-dropdown-panel--arrow' : '') + " " + (right
            ? ' raf-dropdown-panel--right raf-dropdown-panel--arrow-right'
            : ' raf-dropdown-panel--left raf-dropdown-panel--arrow-left'), style: style },
        !!Header && React.createElement("div", { className: "raf-dropdown-panel__header" }, smartRender(Header)),
        React.createElement("div", { className: "raf-dropdown-panel__content" }, children),
        !!Footer && React.createElement("div", { className: "raf-dropdown-panel__footer" }, smartRender(Footer))));
};
//# sourceMappingURL=DropdownPanel.js.map