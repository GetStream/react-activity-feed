import React from 'react';
import { LoadMoreButton as DefaultLoadMoreButton } from './LoadMoreButton';
import { smartRender } from '../utils';
export var LoadMorePaginator = function (_a) {
    var _b = _a.LoadMoreButton, LoadMoreButton = _b === void 0 ? DefaultLoadMoreButton : _b, children = _a.children, reverse = _a.reverse, hasNextPage = _a.hasNextPage, refreshing = _a.refreshing, loadNextPage = _a.loadNextPage;
    return (React.createElement(React.Fragment, null,
        !reverse && children,
        hasNextPage && smartRender(LoadMoreButton, { refreshing: refreshing, onClick: loadNextPage }),
        reverse && children));
};
//# sourceMappingURL=LoadMorePaginator.js.map