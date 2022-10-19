import React from 'react';
import classNames from 'classnames';
import { LoadingIndicator } from 'react-file-utils';
export var Button = function (_a) {
    var _b = _a.buttonStyle, buttonStyle = _b === void 0 ? 'info' : _b, _c = _a.disabled, disabled = _c === void 0 ? false : _c, _d = _a.loading, loading = _d === void 0 ? false : _d, _e = _a.type, type = _e === void 0 ? 'button' : _e, onClick = _a.onClick, onKeyPress = _a.onKeyPress, children = _a.children, className = _a.className, style = _a.style;
    return (React.createElement("button", { className: classNames('raf-button', "raf-button--" + buttonStyle, className), onClick: onClick, onKeyPress: onKeyPress, type: type, disabled: disabled, style: style }, loading ? React.createElement(LoadingIndicator, { backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }) : children));
};
//# sourceMappingURL=Button.js.map