import React from 'react';
import { Avatar } from './Avatar';
import { AvatarGroup } from './AvatarGroup';
import { AttachedActivity } from './AttachedActivity';
import { Dropdown } from './Dropdown';
import { Link } from './Link';
import { humanizeTimestamp, useOnClickUser, userOrDefault, } from '../utils';
import { useTranslationContext } from '../context';
var getUsers = function (activities) { return activities.map(function (item) { return userOrDefault(item.actor); }); };
var getHeaderText = function (t, activitiesLen, verb, actorName, activityVerb) {
    if (activitiesLen === 1) {
        switch (verb) {
            case 'like':
                return t('{{ actorName }} liked your {{ activityVerb }}', { actorName: actorName, activityVerb: activityVerb });
            case 'repost':
                return t('{{ actorName }} reposted your {{ activityVerb }}', { actorName: actorName, activityVerb: activityVerb });
            case 'follow':
                return t('{{ actorName }} followed you', { actorName: actorName });
            case 'comment':
                return t('{{ actorName }} commented on your {{ activityVerb }}', { actorName: actorName, activityVerb: activityVerb });
            default:
                console.warn('No notification styling found for your verb, please create your own custom Notification group.');
                return '';
        }
    }
    if (activitiesLen > 1 && activitiesLen < 3) {
        switch (verb) {
            case 'like':
                return t('{{ actorName }} and 1 other liked your {{ activityVerb }}', { actorName: actorName, activityVerb: activityVerb });
            case 'repost':
                return t('{{ actorName }} and 1 other reposted your {{ activityVerb }}', { actorName: actorName, activityVerb: activityVerb });
            case 'follow':
                return t('{{ actorName }} and 1 other followed you', { actorName: actorName });
            case 'comment':
                return t('{{ actorName }} and 1 other commented on your {{ activityVerb }}', { actorName: actorName, activityVerb: activityVerb });
            default:
                console.warn('No notification styling found for your verb, please create your own custom Notification group.');
                return '';
        }
    }
    var countOtherActors = activitiesLen - 1;
    switch (verb) {
        case 'like':
            return t('{{ actorName }} and {{ countOtherActors }} others liked your {{ activityVerb }}', {
                actorName: actorName,
                activityVerb: activityVerb,
                countOtherActors: countOtherActors,
            });
        case 'repost':
            return t('{{ actorName }} and {{ countOtherActors }} others reposted your {{ activityVerb }}', {
                actorName: actorName,
                activityVerb: activityVerb,
                countOtherActors: countOtherActors,
            });
        case 'follow':
            return t('{{ actorName }} and {{ countOtherActors }} others followed you', {
                actorName: actorName,
                countOtherActors: countOtherActors,
            });
        case 'comment':
            return t('{{ actorName }} and {{ countOtherActors }} others commented on your {{ activityVerb }}', {
                actorName: actorName,
                activityVerb: activityVerb,
                countOtherActors: countOtherActors,
            });
        default:
            console.warn('No notification styling found for your verb, please create your own custom Notification group.');
            return '';
    }
};
export var Notification = function (_a) {
    var activityGroup = _a.activityGroup, onMarkAsRead = _a.onMarkAsRead, onClickUser = _a.onClickUser, onClickNotification = _a.onClickNotification, className = _a.className, style = _a.style;
    var _b = useTranslationContext(), t = _b.t, tDateTimeParser = _b.tDateTimeParser;
    var activities = activityGroup.activities;
    var latestActivity = activities[0], restOfActivities = activities.slice(1);
    if (typeof latestActivity.object === 'string')
        return null;
    var lastObject = latestActivity.object;
    var lastActor = userOrDefault(latestActivity.actor);
    var headerText = getHeaderText(t, activities.length, latestActivity.verb, lastActor.data.name, lastObject.verb);
    var handleUserClick = useOnClickUser(onClickUser);
    var handleNotificationClick = onClickNotification
        ? function (e) {
            e.stopPropagation();
            onClickNotification(activityGroup);
        }
        : undefined;
    return (React.createElement("div", { onClick: handleNotificationClick, className: className !== null && className !== void 0 ? className : "raf-notification " + (activityGroup.is_read ? 'raf-notification--read' : ''), style: style },
        React.createElement(Avatar, { onClick: handleUserClick === null || handleUserClick === void 0 ? void 0 : handleUserClick(lastActor), image: lastActor.data.profileImage, circle: true, size: 30 }),
        React.createElement("div", { className: "raf-notification__content" },
            React.createElement("div", { className: "raf-notification__header" },
                React.createElement("strong", null, headerText),
                !activityGroup.is_read && onMarkAsRead && (React.createElement(Dropdown, null,
                    React.createElement("div", null,
                        React.createElement(Link, { onClick: function (e) {
                                e.stopPropagation();
                                onMarkAsRead(activityGroup);
                            } }, "Mark\u00A0as\u00A0read"))))),
            React.createElement("div", null,
                React.createElement("small", null, humanizeTimestamp(latestActivity.time, tDateTimeParser))),
            latestActivity.verb !== 'follow' && (React.createElement(AttachedActivity, { activity: latestActivity.object }))),
        React.createElement("div", { className: "raf-notification__extra" }, activities.length > 1 && latestActivity.verb === 'follow' && (React.createElement(AvatarGroup, { onClickUser: onClickUser, avatarSize: 30, users: getUsers(restOfActivities) })))));
};
//# sourceMappingURL=Notification.js.map