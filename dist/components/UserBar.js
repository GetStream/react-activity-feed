import React, { useMemo } from 'react';
import classNames from 'classnames';
import { humanizeTimestamp } from '../utils';
import { Avatar } from './Avatar';
import { smartRender } from '../utils';
import { useTranslationContext } from '../context';
export var UserBar = function (_a) {
    var time = _a.time, timestamp = _a.timestamp, Right = _a.Right, subtitle = _a.subtitle, icon = _a.icon, AfterUsername = _a.AfterUsername, username = _a.username, onClickUser = _a.onClickUser, avatar = _a.avatar, className = _a.className, style = _a.style;
    var tDateTimeParser = useTranslationContext().tDateTimeParser;
    var _b = useMemo(function () { return [
        !time && timestamp ? humanizeTimestamp(timestamp, tDateTimeParser) : time,
        timestamp ? tDateTimeParser(timestamp).toJSON() : undefined,
    ]; }, [timestamp, tDateTimeParser]), humanReadableTimestamp = _b[0], parsedTimestamp = _b[1];
    return (React.createElement("div", { className: classNames('raf-user-bar', className), style: style },
        avatar && React.createElement(Avatar, { onClick: onClickUser, size: 50, circle: true, image: avatar }),
        React.createElement("div", { className: "raf-user-bar__details" },
            React.createElement("p", { "data-testid": "user-bar-username", className: "raf-user-bar__username", onClick: onClickUser }, username),
            AfterUsername,
            icon && React.createElement("img", { src: icon, alt: "icon" }),
            subtitle && (React.createElement("p", { className: "raf-user-bar__subtitle" },
                React.createElement("time", { dateTime: parsedTimestamp, title: parsedTimestamp }, subtitle)))),
        smartRender(Right, {}, React.createElement("p", { className: "raf-user-bar__extra" },
            React.createElement("time", { dateTime: parsedTimestamp, title: parsedTimestamp }, humanReadableTimestamp)))));
};
//# sourceMappingURL=UserBar.js.map