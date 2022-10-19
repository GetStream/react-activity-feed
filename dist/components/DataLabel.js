import React from 'react';
import classNames from 'classnames';
export var DataLabel = function (_a) {
    var _b = _a.data, data = _b === void 0 ? 'data' : _b, _c = _a.label, label = _c === void 0 ? 'label' : _c, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-data-label', className), style: style },
        React.createElement("span", { className: "raf-data-label__label" }, label),
        React.createElement("span", { className: "raf-data-label__data" }, data)));
};
//# sourceMappingURL=DataLabel.js.map