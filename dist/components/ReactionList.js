import { __spreadArray } from "tslib";
import React, { useEffect } from 'react';
import immutable from 'immutable';
import { LoadMorePaginator } from './LoadMorePaginator';
import { useFeedContext } from '../context';
import { smartRender } from '../utils';
export var ReactionList = function (_a) {
    var activityId = _a.activityId, Reaction = _a.Reaction, reactionKind = _a.reactionKind, defaultActivityPath = _a.activityPath, _b = _a.oldestToNewest, oldestToNewest = _b === void 0 ? false : _b, _c = _a.Paginator, Paginator = _c === void 0 ? LoadMorePaginator : _c, _d = _a.reverseOrder, reverseOrder = _d === void 0 ? false : _d;
    var feed = useFeedContext();
    var activityPath = defaultActivityPath || feed.getActivityPath(activityId);
    var orderPrefix = oldestToNewest ? 'oldest' : 'latest';
    var reactionsExtra = feed.activities.getIn(__spreadArray(__spreadArray([], activityPath, true), [orderPrefix + '_reactions_extra'], false));
    var hasNextPage = reactionsExtra ? !!reactionsExtra.getIn([reactionKind, 'next'], '') : true;
    var reactions = feed.activities.getIn(__spreadArray(__spreadArray([], activityPath, true), [orderPrefix + '_reactions', reactionKind], false), immutable.List());
    var refreshing = feed.activities.getIn(__spreadArray(__spreadArray([], activityPath, true), [orderPrefix + '_reactions_extra', reactionKind, 'refreshing'], false), false);
    if (reverseOrder)
        reactions = reactions.reverse();
    var loadNextPage = function () {
        feed.loadNextReactions(activityId, reactionKind, activityPath, oldestToNewest);
    };
    useEffect(function () {
        if (oldestToNewest && reactionsExtra) {
            loadNextPage();
        }
    }, []);
    return (React.createElement(React.Fragment, null, smartRender(Paginator, {
        loadNextPage: loadNextPage,
        hasNextPage: hasNextPage,
        refreshing: refreshing,
        reverse: reverseOrder,
        children: reactions.map(function (reaction) {
            return smartRender(Reaction, {
                reaction: reaction.toJS(),
                key: reaction.get('id'),
            });
        }),
    })));
};
//# sourceMappingURL=ReactionList.js.map