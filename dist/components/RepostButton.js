import { __spreadArray } from "tslib";
import React from 'react';
import { ReactionToggleIcon } from './ReactionToggleIcon';
import { useFeedContext, useStreamContext } from '../context';
import { RepostIcon, Color } from './Icons';
/**
 * A repost button ready to be embedded as Activity footer
 */
export var RepostButton = function (_a) {
    var activity = _a.activity, _b = _a.feedGroup, feedGroup = _b === void 0 ? 'user' : _b, userId = _a.userId, repostData = _a.repostData, _c = _a.targetFeeds, targetFeeds = _c === void 0 ? [] : _c, className = _a.className, style = _a.style;
    var feed = useFeedContext();
    var app = useStreamContext();
    // this to prevent reposting another repost, you can only repost an original activity to avoid nesting
    var originalActivity = activity.verb === 'repost' && typeof activity.object === 'object'
        ? activity.object
        : activity;
    return (React.createElement(ReactionToggleIcon, { counts: originalActivity.reaction_counts, own_reactions: originalActivity.own_reactions, kind: "repost", onPress: function () {
            var _a;
            return feed.onToggleReaction('repost', originalActivity, repostData, {
                targetFeeds: __spreadArray([feedGroup + ":" + (userId || ((_a = app.user) === null || _a === void 0 ? void 0 : _a.id))], targetFeeds, true),
            });
        }, activeIcon: React.createElement(RepostIcon, { style: { color: Color.Active } }), inactiveIcon: React.createElement(RepostIcon, { style: { color: Color.Inactive } }), className: className, style: style }));
};
//# sourceMappingURL=RepostButton.js.map