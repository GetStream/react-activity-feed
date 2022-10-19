import React from 'react';
import { LoadingIndicator as DefaultLoadingIndicator } from 'react-file-utils';
import { InfiniteScroll } from './InfiniteScroll';
import { smartRender } from '../utils';
export var InfiniteScrollPaginator = function (props) {
    var children = props.children, hasNextPage = props.hasNextPage, _a = props.Loader, Loader = _a === void 0 ? DefaultLoadingIndicator : _a, loadNextPage = props.loadNextPage, refreshing = props.refreshing, reverse = props.reverse, threshold = props.threshold, useWindow = props.useWindow;
    return (React.createElement(InfiniteScroll, { hasMore: hasNextPage, isLoading: refreshing, isReverse: reverse, loader: React.createElement(React.Fragment, { key: "loading-indicator" }, smartRender(Loader)), loadMore: loadNextPage, threshold: threshold, useWindow: useWindow }, children));
};
//# sourceMappingURL=InfiniteScrollPaginator.js.map