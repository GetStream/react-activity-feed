import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { IconButton } from 'react-file-utils';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
export var Dropdown = function (_a) {
    var children = _a.children, className = _a.className, style = _a.style;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var dropdownBoxReference = useRef(null);
    useOnClickOutside(dropdownBoxReference, function () { return setIsOpen(false); }, isOpen);
    return (React.createElement("div", { className: classNames('raf-dropdown', className), style: style },
        React.createElement(IconButton, { onClick: function () { return setIsOpen(function (pv) { return !pv; }); } },
            React.createElement("svg", { className: "raf-dropdown__button", width: "12", height: "8", viewBox: "0 0 12 8", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { d: "M1.41 0L6 4.77 10.59 0 12 1.469l-6 6.25-6-6.25z", fill: "#A0B2B8", fillRule: "evenodd" }))),
        isOpen && (React.createElement("div", { className: "raf-dropdown__box", ref: dropdownBoxReference }, children))));
};
//# sourceMappingURL=Dropdown.js.map