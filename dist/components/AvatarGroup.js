import React from 'react';
import classNames from 'classnames';
import { useOnClickUser } from '../utils';
import { Avatar } from './Avatar';
export function AvatarGroup(_a) {
    var _b = _a.limit, limit = _b === void 0 ? 5 : _b, _c = _a.users, users = _c === void 0 ? [] : _c, _d = _a.avatarSize, avatarSize = _d === void 0 ? 30 : _d, onClickUser = _a.onClickUser, className = _a.className, style = _a.style;
    var handleUserClick = useOnClickUser(onClickUser);
    return (React.createElement("div", { className: classNames('raf-avatar-group', className), style: style }, users.slice(0, limit).map(function (user, i) {
        var _a;
        return (React.createElement("div", { className: "raf-avatar-group__avatar", key: "avatar-" + i },
            React.createElement(Avatar, { onClick: handleUserClick === null || handleUserClick === void 0 ? void 0 : handleUserClick(user), image: (_a = user.data) === null || _a === void 0 ? void 0 : _a.profileImage, size: avatarSize, circle: true })));
    })));
}
//# sourceMappingURL=AvatarGroup.js.map