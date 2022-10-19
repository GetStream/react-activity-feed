import { __assign, __rest } from "tslib";
import React, { useCallback, useEffect, useRef, forwardRef } from 'react';
/**
 * Prevents Chrome hangups
 * See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
 */
var mousewheelListener = function (event) {
    if (event instanceof WheelEvent && event.deltaY === 1) {
        event.preventDefault();
    }
};
var calculateTopPosition = function (element) {
    if (element instanceof HTMLElement) {
        return element.offsetTop + calculateTopPosition(element.offsetParent);
    }
    return 0;
};
/**
 * Computes by recursively summing offsetTop until an element without offsetParent is reached
 */
var calculateOffset = function (element, scrollTop) {
    if (!element) {
        return 0;
    }
    return calculateTopPosition(element) + (element.offsetHeight - scrollTop - window.innerHeight);
};
export var InfiniteScroll = forwardRef(function (props, ref) {
    var children = props.children, _a = props.element, element = _a === void 0 ? 'div' : _a, _b = props.hasMore, hasMore = _b === void 0 ? false : _b, _c = props.initialLoad, initialLoad = _c === void 0 ? true : _c, _d = props.isLoading, isLoading = _d === void 0 ? false : _d, _e = props.isReverse, isReverse = _e === void 0 ? false : _e, listenToScroll = props.listenToScroll, loader = props.loader, loadMore = props.loadMore, _f = props.threshold, threshold = _f === void 0 ? 250 : _f, _g = props.useCapture, useCapture = _g === void 0 ? false : _g, _h = props.useWindow, useWindow = _h === void 0 ? true : _h, elementProps = __rest(props, ["children", "element", "hasMore", "initialLoad", "isLoading", "isReverse", "listenToScroll", "loader", "loadMore", "threshold", "useCapture", "useWindow"]);
    var scrollComponent = useRef();
    var scrollListener = useCallback(function () {
        var element = scrollComponent.current;
        if (!element)
            return;
        var parentElement = element.parentElement;
        var offset = 0;
        var reverseOffset = 0;
        if (useWindow) {
            var doc = document.documentElement || document.body.parentNode || document.body;
            var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : doc.scrollTop;
            offset = calculateOffset(element, scrollTop);
            reverseOffset = scrollTop;
        }
        else if (parentElement) {
            offset = element.scrollHeight - parentElement.scrollTop - parentElement.clientHeight;
            reverseOffset = parentElement.scrollTop;
        }
        if (listenToScroll) {
            listenToScroll(offset, reverseOffset, threshold);
        }
        // Here we make sure the element is visible as well as checking the offset
        if ((isReverse ? reverseOffset : offset) < Number(threshold) &&
            element.offsetParent !== null &&
            typeof loadMore === 'function' &&
            hasMore) {
            loadMore();
        }
    }, [hasMore, useWindow, isReverse, threshold, listenToScroll, loadMore]);
    useEffect(function () {
        var _a;
        var scrollElement = useWindow ? window : (_a = scrollComponent.current) === null || _a === void 0 ? void 0 : _a.parentNode;
        if (isLoading || !scrollElement)
            return;
        scrollElement.addEventListener('scroll', scrollListener, useCapture);
        scrollElement.addEventListener('resize', scrollListener, useCapture);
        if (initialLoad) {
            scrollListener();
        }
        return function () {
            scrollElement.removeEventListener('scroll', scrollListener, useCapture);
            scrollElement.removeEventListener('resize', scrollListener, useCapture);
        };
    }, [initialLoad, isLoading, scrollListener, useCapture, useWindow]);
    useEffect(function () {
        var _a;
        var scrollElement = useWindow ? window : (_a = scrollComponent.current) === null || _a === void 0 ? void 0 : _a.parentNode;
        scrollElement === null || scrollElement === void 0 ? void 0 : scrollElement.addEventListener('mousewheel', mousewheelListener, useCapture);
        return function () {
            scrollElement === null || scrollElement === void 0 ? void 0 : scrollElement.removeEventListener('mousewheel', mousewheelListener, useCapture);
        };
    }, [useCapture, useWindow]);
    var attributes = __assign(__assign({}, elementProps), { ref: function (element) {
            scrollComponent.current = element;
            if (typeof ref === 'function')
                ref(element);
        } });
    var childrenArray = [children];
    if (isLoading)
        childrenArray[isReverse ? 'unshift' : 'push'](loader);
    return React.createElement(element, attributes, childrenArray);
});
InfiniteScroll.displayName = 'InfiniteScroll';
//# sourceMappingURL=InfiniteScroll.js.map