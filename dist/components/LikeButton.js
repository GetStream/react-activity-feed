import React, { useEffect } from 'react';
import { ReactionToggleIcon } from './ReactionToggleIcon';
import { ThumbsUpIcon, Color } from './Icons';
import { useFeedContext } from '../context';
export var LikeButton = function (_a) {
    var _b, _c;
    var activity = _a.activity, reaction = _a.reaction, targetFeeds = _a.targetFeeds, className = _a.className, style = _a.style;
    var feed = useFeedContext();
    useEffect(function () {
        if (!reaction && !activity)
            console.warn('LikeButton requires an activity or reaction to work properly');
        if (reaction && activity)
            console.warn('LikeButton requires only one of the activity or reaction to work properly');
    }, []);
    return (React.createElement(ReactionToggleIcon, { className: className, style: style, counts: (_b = reaction === null || reaction === void 0 ? void 0 : reaction.children_counts) !== null && _b !== void 0 ? _b : activity === null || activity === void 0 ? void 0 : activity.reaction_counts, own_reactions: (_c = reaction === null || reaction === void 0 ? void 0 : reaction.own_children) !== null && _c !== void 0 ? _c : activity === null || activity === void 0 ? void 0 : activity.own_reactions, kind: "like", onPress: function () {
            if (reaction)
                return feed.onToggleChildReaction('like', reaction, {}, { targetFeeds: targetFeeds });
            if (activity)
                return feed.onToggleReaction('like', activity, {}, { targetFeeds: targetFeeds });
            return Promise.resolve();
        }, activeIcon: React.createElement(ThumbsUpIcon, { style: { color: Color.Active } }), inactiveIcon: React.createElement(ThumbsUpIcon, { style: { color: Color.Inactive } }), labelSingle: "like", labelPlural: "likes" }));
};
//# sourceMappingURL=LikeButton.js.map