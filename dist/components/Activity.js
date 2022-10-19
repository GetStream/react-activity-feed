import React from 'react';
import classNames from 'classnames';
import { ActivityContent as DefaultActivityContent } from './ActivityContent';
import { ActivityHeader as DefaultActivityHeader } from './ActivityHeader';
import { Card as DefaultCard } from './Card';
import { smartRender, } from '../utils';
var DefaultRepost = function (_a) {
    var _b = _a.Header, Header = _b === void 0 ? DefaultActivityHeader : _b, HeaderRight = _a.HeaderRight, _c = _a.Content, Content = _c === void 0 ? DefaultActivityContent : _c, activity = _a.activity, icon = _a.icon, onClickHashtag = _a.onClickHashtag, onClickMention = _a.onClickMention, onClickUser = _a.onClickUser;
    return (React.createElement("div", { className: "raf-card raf-activity raf-activity-repost" },
        smartRender(Header, { HeaderRight: HeaderRight, icon: icon, activity: activity, onClickUser: onClickUser }),
        smartRender(Content, { onClickMention: onClickMention, onClickHashtag: onClickHashtag, activity: activity })));
};
export var Activity = function (_a) {
    var _b = _a.Header, Header = _b === void 0 ? DefaultActivityHeader : _b, HeaderRight = _a.HeaderRight, _c = _a.Content, Content = _c === void 0 ? DefaultActivityContent : _c, Footer = _a.Footer, _d = _a.Card, Card = _d === void 0 ? DefaultCard : _d, activity = _a.activity, icon = _a.icon, onClickHashtag = _a.onClickHashtag, onClickMention = _a.onClickMention, onClickUser = _a.onClickUser, _e = _a.Repost, Repost = _e === void 0 ? DefaultRepost : _e, userId = _a.userId, feedGroup = _a.feedGroup, className = _a.className, style = _a.style;
    return (React.createElement("div", { className: classNames('raf-activity', className), style: style },
        smartRender(Header, { HeaderRight: HeaderRight, icon: icon, activity: activity, onClickUser: onClickUser }),
        smartRender(Content, {
            activity: activity,
            Content: Content,
            Card: Card,
            feedGroup: feedGroup,
            Footer: Footer,
            Header: Header,
            HeaderRight: HeaderRight,
            icon: icon,
            onClickHashtag: onClickHashtag,
            onClickMention: onClickMention,
            onClickUser: onClickUser,
            Repost: Repost,
            userId: userId,
        }),
        smartRender(Footer, { activity: activity, feedGroup: feedGroup, userId: userId })));
};
//# sourceMappingURL=Activity.js.map