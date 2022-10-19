import React from 'react';
import classNames from 'classnames';
import { LikeButton } from './LikeButton';
import { RepostButton } from './RepostButton';
import { Flex } from './Flex';
export var ActivityFooter = function (_a) {
    var activity = _a.activity, _b = _a.feedGroup, feedGroup = _b === void 0 ? 'user' : _b, userId = _a.userId, targetFeeds = _a.targetFeeds, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-activity-footer', className), style: style },
        React.createElement("div", { className: "raf-activity-footer__left" }),
        React.createElement("div", { className: "raf-activity-footer__right" },
            React.createElement(Flex, { a: "center" },
                React.createElement(LikeButton, { activity: activity, targetFeeds: targetFeeds }),
                React.createElement(RepostButton, { activity: activity, targetFeeds: targetFeeds, feedGroup: feedGroup, userId: userId })))));
};
//# sourceMappingURL=ActivityFooter.js.map