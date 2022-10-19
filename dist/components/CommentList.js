import React from 'react';
import { smartRender } from '../utils';
import { ReactionList } from './ReactionList';
import { LoadMorePaginator } from './LoadMorePaginator';
import { CommentItem as DefaultCommentItem } from './CommentItem';
export var CommentList = function (_a) {
    var _b = _a.Paginator, Paginator = _b === void 0 ? LoadMorePaginator : _b, _c = _a.CommentItem, CommentItem = _c === void 0 ? DefaultCommentItem : _c, activityId = _a.activityId, activityPath = _a.activityPath, _d = _a.oldestToNewest, oldestToNewest = _d === void 0 ? false : _d, _e = _a.reverseOrder, reverseOrder = _e === void 0 ? false : _e;
    return (React.createElement(ReactionList, { Paginator: Paginator, activityId: activityId, reactionKind: "comment", Reaction: function (_a) {
            var comment = _a.reaction;
            return (React.createElement(React.Fragment, null, smartRender(CommentItem, { comment: comment })));
        }, activityPath: activityPath, oldestToNewest: oldestToNewest, reverseOrder: reverseOrder }));
};
//# sourceMappingURL=CommentList.js.map