import React from 'react';
import { useTranslationContext } from '../context/TranslationContext';
import { userOrDefault, humanizeTimestamp, useOnClickUser } from '../utils';
import { UserBar } from './UserBar';
export var ActivityHeader = function (_a) {
    var activity = _a.activity, HeaderRight = _a.HeaderRight, icon = _a.icon, onClickUser = _a.onClickUser, _b = _a.style, style = _b === void 0 ? { padding: '8px 16px' } : _b, className = _a.className;
    var tDateTimeParser = useTranslationContext().tDateTimeParser;
    var actor = userOrDefault(activity.actor);
    var handleUserClick = useOnClickUser(onClickUser);
    return (React.createElement("div", { style: style, className: className },
        React.createElement(UserBar, { username: actor.data.name, avatar: actor.data.profileImage, onClickUser: handleUserClick === null || handleUserClick === void 0 ? void 0 : handleUserClick(actor), subtitle: HeaderRight ? humanizeTimestamp(activity.time, tDateTimeParser) : undefined, timestamp: activity.time, icon: icon, Right: HeaderRight })));
};
//# sourceMappingURL=ActivityHeader.js.map