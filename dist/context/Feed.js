import { __assign } from "tslib";
import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { FeedManager } from './FeedManager';
import { useStreamContext } from './StreamApp';
import isEqual from 'lodash/isEqual';
export var FeedContext = React.createContext({});
export var FeedProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return React.createElement(FeedContext.Provider, { value: value }, children);
};
export var useFeedContext = function () { return useContext(FeedContext); };
export function Feed(props) {
    var _a = useStreamContext(), analyticsClient = _a.analyticsClient, client = _a.client, user = _a.user, errorHandler = _a.errorHandler, sharedFeedManagers = _a.sharedFeedManagers;
    var feedGroup = props.feedGroup, userId = props.userId, children = props.children, options = props.options, notify = props.notify;
    var _b = useState(0), setForceUpdateState = _b[1];
    var optionsReference = useRef();
    if (!isEqual(optionsReference.current, options))
        optionsReference.current = options;
    var feedId = client === null || client === void 0 ? void 0 : client.feed(feedGroup, userId).id;
    var manager = useMemo(function () {
        if (!feedId)
            return null;
        // TODO: check if any of the clients changed
        return (sharedFeedManagers[feedId] ||
            new FeedManager(__assign(__assign({}, props), { analyticsClient: analyticsClient, client: client, user: user, errorHandler: errorHandler })));
    }, [feedId]);
    useEffect(function () {
        var forceUpdate = function () { return setForceUpdateState(function (prevState) { return prevState + 1; }); };
        if (manager)
            manager.props.notify = notify;
        manager === null || manager === void 0 ? void 0 : manager.register(forceUpdate);
        return function () { return manager === null || manager === void 0 ? void 0 : manager.unregister(forceUpdate); };
    }, [manager, notify]);
    useEffect(function () {
        if (!manager)
            return;
        if (optionsReference.current) {
            manager.props.options = optionsReference.current;
        }
        manager.refresh();
    }, [manager, optionsReference.current]);
    if (!manager)
        return null;
    var ctx = {
        feedGroup: feedGroup,
        userId: userId,
        feedManager: manager,
        getActivityPath: manager.getActivityPath,
        onToggleReaction: manager.onToggleReaction,
        onAddReaction: manager.onAddReaction,
        onRemoveReaction: manager.onRemoveReaction,
        onToggleChildReaction: manager.onToggleChildReaction,
        onAddChildReaction: manager.onAddChildReaction,
        onRemoveChildReaction: manager.onRemoveChildReaction,
        onRemoveActivity: manager.onRemoveActivity,
        onMarkAsRead: manager.onMarkAsRead,
        onMarkAsSeen: manager.onMarkAsSeen,
        refresh: manager.refresh,
        refreshUnreadUnseen: manager.refreshUnreadUnseen,
        loadNextReactions: manager.loadNextReactions,
        loadNextPage: manager.loadNextPage,
        hasNextPage: manager.hasNextPage(),
        loadReverseNextPage: manager.loadReverseNextPage,
        hasReverseNextPage: manager.hasReverseNextPage(),
        activityOrder: manager.state.activityOrder,
        activities: manager.state.activities,
        realtimeAdds: manager.state.realtimeAdds,
        realtimeDeletes: manager.state.realtimeDeletes,
        refreshing: manager.state.refreshing,
        unread: manager.state.unread,
        unseen: manager.state.unseen,
        hasDoneRequest: manager.state.lastResponse != null,
    };
    return React.createElement(FeedProvider, { value: ctx }, children);
}
//# sourceMappingURL=Feed.js.map