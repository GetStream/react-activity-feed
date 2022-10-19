import { __assign, __rest } from "tslib";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Feed, useFeedContext } from '../context';
import { smartRender } from '../utils';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { NotificationFeed } from './NotificationFeed';
import { DropdownPanel } from './DropdownPanel';
import { IconBadge } from './IconBadge';
var NotificationDropdownInner = function (_a) {
    var width = _a.width, Footer = _a.Footer, Header = _a.Header, Icon = _a.Icon, right = _a.right, className = _a.className, style = _a.style, feedProps = __rest(_a, ["width", "Footer", "Header", "Icon", "right", "className", "style"]);
    var feed = useFeedContext();
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, function () { return setOpen(false); }, open);
    useEffect(function () {
        feed.refreshUnreadUnseen();
    }, []);
    var onIconBadgeClick = useCallback(function () {
        setOpen(function (open) { return !open; });
    }, []);
    return (React.createElement("div", { className: classNames('raf-notification-dropdown', className), style: style },
        React.createElement(IconBadge, { showNumber: true, unseen: feed.unseen, hidden: !feedProps.notify, onClick: onIconBadgeClick }, Icon && smartRender(Icon)),
        React.createElement("div", { ref: dropdownRef, style: { maxWidth: width }, className: "raf-notification-dropdown__panel" + (open ? ' raf-notification-dropdown__panel--open' : '') + (right ? ' raf-notification-dropdown__panel--right' : '') }, open && (React.createElement(DropdownPanel, { arrow: true, right: right, Header: Header, Footer: Footer },
            React.createElement(NotificationFeed, __assign({}, feedProps)))))));
};
/**
 * IMPORTANT: Changing most of the props below doesn't result in the desired effect.
 * These settings related to feed management should be changed in the `sharedFeeds` prop of the [`StreamApp`](#streamapp) component.
 */
export var NotificationDropdown = function (_a) {
    var _b;
    var _c = _a.width, width = _c === void 0 ? 475 : _c, Footer = _a.Footer, Header = _a.Header, Icon = _a.Icon, right = _a.right, _d = _a.feedGroup, feedGroup = _d === void 0 ? 'notification' : _d, options = _a.options, feedProps = __rest(_a, ["width", "Footer", "Header", "Icon", "right", "feedGroup", "options"]);
    var optionsWithDefaults = __assign(__assign({}, options), { mark_seen: (_b = options === null || options === void 0 ? void 0 : options.mark_seen) !== null && _b !== void 0 ? _b : true });
    return (React.createElement(Feed, __assign({}, feedProps, { feedGroup: feedGroup, options: optionsWithDefaults }),
        React.createElement(NotificationDropdownInner, __assign({ width: width, Footer: Footer, Header: Header, Icon: Icon, right: right }, feedProps, { feedGroup: feedGroup, options: optionsWithDefaults }))));
};
//# sourceMappingURL=NotificationDropdown.js.map