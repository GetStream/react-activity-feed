import React from 'react';
import classNames from 'classnames';
import { Flex } from './Flex';
import { Avatar } from './Avatar';
import { humanizeTimestamp, textRenderer, useOnClickUser, } from '../utils';
import { useTranslationContext } from '../context';
export var CommentItem = function (_a) {
    var _b = _a.comment, user = _b.user, created_at = _b.created_at, data = _b.data, onClickHashtag = _a.onClickHashtag, onClickMention = _a.onClickMention, onClickUser = _a.onClickUser, className = _a.className, style = _a.style;
    var tDateTimeParser = useTranslationContext().tDateTimeParser;
    var handleUserClick = useOnClickUser(onClickUser);
    return (React.createElement("div", { className: classNames('raf-comment-item', className), style: style },
        React.createElement(Flex, { a: "flex-start", style: { padding: '8px 0' } }, (user === null || user === void 0 ? void 0 : user.data.profileImage) && (React.createElement(Avatar, { onClick: handleUserClick === null || handleUserClick === void 0 ? void 0 : handleUserClick(user), image: user.data.profileImage, circle: true, size: 25 }))),
        React.createElement(Flex, { d: "column", style: { flex: 1, margin: '0 8px' } },
            React.createElement("div", { className: "raf-comment-item__content" },
                React.createElement("time", { dateTime: created_at, title: created_at },
                    React.createElement("small", null, humanizeTimestamp(created_at, tDateTimeParser))),
                React.createElement("p", null,
                    React.createElement("span", { onClick: handleUserClick === null || handleUserClick === void 0 ? void 0 : handleUserClick(user), className: "raf-comment-item__author" }, user === null || user === void 0 ? void 0 : user.data.name),
                    ' ',
                    textRenderer(data.text, 'raf-comment-item', onClickMention, onClickHashtag))))));
};
//# sourceMappingURL=CommentItem.js.map