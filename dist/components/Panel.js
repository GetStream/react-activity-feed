import React from 'react';
import classNames from 'classnames';
export var Panel = function (_a) {
    var children = _a.children, _b = _a.panelStyle, panelStyle = _b === void 0 ? 'rounded' : _b, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: className !== null && className !== void 0 ? className : "raf-panel raf-panel--" + panelStyle, style: style }, children));
};
export var PanelContent = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-panel-content', className), style: style }, children));
};
// eslint-disable-next-line sonarjs/no-identical-functions
export var PanelFooter = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-panel-footer', className), style: style }, children));
};
// eslint-disable-next-line sonarjs/no-identical-functions
export var PanelHeading = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-panel-header', className), style: style }, children));
};
//# sourceMappingURL=Panel.js.map