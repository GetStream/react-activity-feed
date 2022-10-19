import { __assign } from "tslib";
import React, { useEffect } from 'react';
import { Feed, useFeedContext } from '../context';
import { NewActivitiesNotification } from './NewActivitiesNotification';
import { LoadMorePaginator } from './LoadMorePaginator';
import { Notification } from './Notification';
import { LoadingIndicator as DefaultLoadingIndicator } from 'react-file-utils';
import { FeedPlaceholder } from './FeedPlaceholder';
import { smartRender } from '../utils';
var NotificationFeedInner = function (_a) {
    var Group = _a.Group, LoadingIndicator = _a.LoadingIndicator, Notifier = _a.Notifier, Paginator = _a.Paginator, Placeholder = _a.Placeholder, options = _a.options;
    var feed = useFeedContext();
    var refreshFeed = function () { return feed.refresh(options); };
    useEffect(function () {
        return function () {
            feed.activities.clear();
            feed.activityOrder.splice(0, feed.activityOrder.length);
        };
    }, [feed.feedGroup, feed.userId]);
    if (feed.refreshing && !feed.hasDoneRequest) {
        return React.createElement("div", { className: "raf-loading-indicator" }, smartRender(LoadingIndicator));
    }
    return (React.createElement(React.Fragment, null,
        smartRender(Notifier, {
            adds: feed.realtimeAdds,
            deletes: feed.realtimeDeletes,
            onClick: refreshFeed,
        }),
        feed.activities.size === 0 && feed.hasDoneRequest
            ? smartRender(Placeholder)
            : smartRender(Paginator, {
                loadNextPage: feed.loadNextPage,
                hasNextPage: feed.hasNextPage,
                refreshing: feed.refreshing,
                children: feed.activityOrder.map(function (id) {
                    var _a;
                    return smartRender(Group, {
                        activityGroup: (_a = feed.activities.get(id)) === null || _a === void 0 ? void 0 : _a.toJS(),
                        // @ts-expect-error
                        key: id,
                    });
                }),
            })));
};
/**
 * Renders a Notification feed, this component is a StreamApp consumer and must always be a child of `<StreamApp>`.
 */
export var NotificationFeed = function (_a) {
    var _b;
    var options = _a.options, userId = _a.userId, analyticsLocation = _a.analyticsLocation, doFeedRequest = _a.doFeedRequest, doActivityDeleteRequest = _a.doActivityDeleteRequest, doChildReactionAddRequest = _a.doChildReactionAddRequest, doChildReactionDeleteRequest = _a.doChildReactionDeleteRequest, doReactionAddRequest = _a.doReactionAddRequest, doReactionDeleteRequest = _a.doReactionDeleteRequest, doReactionsFilterRequest = _a.doReactionsFilterRequest, _c = _a.feedGroup, feedGroup = _c === void 0 ? 'notification' : _c, _d = _a.notify, notify = _d === void 0 ? false : _d, _e = _a.Group, Group = _e === void 0 ? Notification : _e, _f = _a.Notifier, Notifier = _f === void 0 ? NewActivitiesNotification : _f, _g = _a.Paginator, Paginator = _g === void 0 ? LoadMorePaginator : _g, _h = _a.Placeholder, Placeholder = _h === void 0 ? FeedPlaceholder : _h, _j = _a.LoadingIndicator, LoadingIndicator = _j === void 0 ? DefaultLoadingIndicator : _j;
    return (React.createElement(Feed, { feedGroup: feedGroup, userId: userId, options: __assign(__assign({}, options), { mark_seen: (_b = options === null || options === void 0 ? void 0 : options.mark_seen) !== null && _b !== void 0 ? _b : true }), notify: notify, analyticsLocation: analyticsLocation, doFeedRequest: doFeedRequest, doActivityDeleteRequest: doActivityDeleteRequest, doReactionAddRequest: doReactionAddRequest, doReactionDeleteRequest: doReactionDeleteRequest, doChildReactionAddRequest: doChildReactionAddRequest, doChildReactionDeleteRequest: doChildReactionDeleteRequest, doReactionsFilterRequest: doReactionsFilterRequest },
        React.createElement(NotificationFeedInner, { Group: Group, LoadingIndicator: LoadingIndicator, Notifier: Notifier, Paginator: Paginator, Placeholder: Placeholder, options: options })));
};
//# sourceMappingURL=NotificationFeed.js.map