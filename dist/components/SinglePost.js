import { __assign, __rest } from "tslib";
import React from 'react';
import { FlatFeed } from './FlatFeed';
/**
 * Shows the detail of a single activity
 */
export function SinglePost(_a) {
    var options = _a.options, activityId = _a.activityId, doFeedRequest = _a.doFeedRequest, props = __rest(_a, ["options", "activityId", "doFeedRequest"]);
    return (React.createElement(FlatFeed, __assign({}, props, { options: __assign({ withRecentReactions: true }, options), doFeedRequest: function (client, feedGroup, userId, opts) {
            if (doFeedRequest) {
                return doFeedRequest(client, feedGroup, userId, __assign(__assign({}, opts), { id_lte: activityId, id_gte: activityId, limit: 1 }));
            }
            return client.feed(feedGroup, userId).getActivityDetail(activityId, opts);
        } })));
}
//# sourceMappingURL=SinglePost.js.map