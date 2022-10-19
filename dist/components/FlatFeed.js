import { __assign } from "tslib";
import React from 'react';
import { LoadingIndicator as DefaultLoadingIndicator } from 'react-file-utils';
import { Activity as DefaultActivity } from './Activity';
import { NewActivitiesNotification } from './NewActivitiesNotification';
import { LoadMorePaginator } from './LoadMorePaginator';
import { FeedPlaceholder } from './FeedPlaceholder';
import { smartRender } from '../utils';
import { Feed, useFeedContext, useTranslationContext, } from '../context';
var DefaultNotifier = function (props) { return (React.createElement(NewActivitiesNotification, __assign({ labelPlural: "activities", labelSingle: "activity" }, props))); };
var FlatFeedInner = function (_a) {
    var Activity = _a.Activity, Notifier = _a.Notifier, Placeholder = _a.Placeholder, Paginator = _a.Paginator, LoadingIndicator = _a.LoadingIndicator, options = _a.options;
    var feed = useFeedContext();
    var t = useTranslationContext().t;
    var refreshFeed = function () { return feed.refresh(options); };
    if (feed.refreshing && !feed.hasDoneRequest) {
        return React.createElement("div", { className: "raf-loading-indicator" }, smartRender(LoadingIndicator));
    }
    return (React.createElement(React.Fragment, null,
        smartRender(Notifier, {
            adds: feed.realtimeAdds,
            deletes: feed.realtimeDeletes,
            onClick: feed.hasReverseNextPage ? feed.loadReverseNextPage : refreshFeed,
            labelFunction: feed.hasReverseNextPage ? function () { return t('Load activities'); } : undefined,
        }),
        feed.activities.size === 0 && feed.hasDoneRequest
            ? smartRender(Placeholder)
            : smartRender(Paginator, {
                loadNextPage: feed.loadNextPage,
                hasNextPage: feed.hasNextPage,
                refreshing: feed.refreshing,
                children: feed.activityOrder.map(function (id) {
                    var _a;
                    return smartRender(Activity, {
                        activity: (_a = feed.activities.get(id)) === null || _a === void 0 ? void 0 : _a.toJS(),
                        feedGroup: feed.feedGroup,
                        userId: feed.userId,
                        // @ts-expect-error
                        key: id,
                    });
                }),
            })));
};
/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 */
export var FlatFeed = function (_a) {
    var userId = _a.userId, options = _a.options, analyticsLocation = _a.analyticsLocation, doFeedRequest = _a.doFeedRequest, doActivityDeleteRequest = _a.doActivityDeleteRequest, doChildReactionAddRequest = _a.doChildReactionAddRequest, doChildReactionDeleteRequest = _a.doChildReactionDeleteRequest, doReactionAddRequest = _a.doReactionAddRequest, doReactionDeleteRequest = _a.doReactionDeleteRequest, doReactionsFilterRequest = _a.doReactionsFilterRequest, _b = _a.feedGroup, feedGroup = _b === void 0 ? 'timeline' : _b, _c = _a.notify, notify = _c === void 0 ? false : _c, _d = _a.Activity, Activity = _d === void 0 ? DefaultActivity : _d, _e = _a.Notifier, Notifier = _e === void 0 ? DefaultNotifier : _e, _f = _a.Placeholder, Placeholder = _f === void 0 ? FeedPlaceholder : _f, _g = _a.Paginator, Paginator = _g === void 0 ? LoadMorePaginator : _g, _h = _a.LoadingIndicator, LoadingIndicator = _h === void 0 ? DefaultLoadingIndicator : _h;
    return (React.createElement(Feed, { feedGroup: feedGroup, userId: userId, options: options, notify: notify, analyticsLocation: analyticsLocation, doFeedRequest: doFeedRequest, doActivityDeleteRequest: doActivityDeleteRequest, doReactionAddRequest: doReactionAddRequest, doReactionDeleteRequest: doReactionDeleteRequest, doChildReactionAddRequest: doChildReactionAddRequest, doChildReactionDeleteRequest: doChildReactionDeleteRequest, doReactionsFilterRequest: doReactionsFilterRequest },
        React.createElement(FlatFeedInner, { Activity: Activity, Notifier: Notifier, Placeholder: Placeholder, Paginator: Paginator, LoadingIndicator: LoadingIndicator, options: options })));
};
//# sourceMappingURL=FlatFeed.js.map