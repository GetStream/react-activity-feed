import React from 'react';
export var FollowButton = function (_a) {
    var _b = _a.followed, followed = _b === void 0 ? false : _b, onClick = _a.onClick, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: className !== null && className !== void 0 ? className : "raf-follow-button " + (followed ? 'raf-follow-button--active' : ''), role: "button", onClick: onClick, style: style }, followed ? 'Following' : 'Follow'));
};
//# sourceMappingURL=FollowButton.js.map