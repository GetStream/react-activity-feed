import { __assign, __awaiter, __generator } from "tslib";
import React, { useContext, useEffect, useState } from 'react';
import StreamAnalytics from 'stream-analytics';
import { connect } from 'getstream';
import { FeedManager } from './FeedManager';
import { handleError } from '../utils/errors';
import { Streami18n } from '../i18n/Streami18n';
import { TranslationProvider } from './TranslationContext';
export var StreamContext = React.createContext({
    analyticsClient: null,
    client: null,
    errorHandler: handleError,
    sharedFeedManagers: {},
});
export var StreamAppProvider = function (_a) {
    var children = _a.children, value = _a.value;
    return React.createElement(StreamContext.Provider, { value: value }, children);
};
export var useStreamContext = function () { return useContext(StreamContext); };
/**
 * Manages the connection with Stream. Any components that should talk to
 * Stream should be a child of this component.
 */
export function StreamApp(_a) {
    var _this = this;
    var apiKey = _a.apiKey, appId = _a.appId, _b = _a.errorHandler, errorHandler = _b === void 0 ? handleError : _b, i18nInstance = _a.i18nInstance, token = _a.token, analyticsToken = _a.analyticsToken, children = _a.children, defaultUserData = _a.defaultUserData, options = _a.options, _c = _a.sharedFeeds, sharedFeeds = _c === void 0 ? [{ feedGroup: 'notification', notify: true, options: { mark_seen: true } }] : _c;
    var _d = useState(null), client = _d[0], setClient = _d[1];
    var _e = useState(), user = _e[0], setUser = _e[1];
    var _f = useState(null), analyticsClient = _f[0], setAnalyticsClient = _f[1];
    var _g = useState(), userData = _g[0], setUserDate = _g[1];
    var _h = useState(), translator = _h[0], setTranslator = _h[1];
    var _j = useState({}), sharedFeedManagers = _j[0], setSharedFeedManagers = _j[1];
    useEffect(function () {
        var streami18n = i18nInstance && i18nInstance instanceof Streami18n ? i18nInstance : new Streami18n({ language: 'en' });
        streami18n.getTranslators().then(setTranslator);
        streami18n.registerSetLanguageCallback(function (t) {
            return setTranslator(function (prevState) { return (__assign(__assign({}, prevState), { t: t })); });
        });
    }, [i18nInstance]);
    var getUserInfo = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var data, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, user.getOrCreate((defaultUserData || { name: 'Unknown' }))];
                case 1:
                    data = (_a.sent()).data;
                    setUserDate(data);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    errorHandler(e_1, 'get-user-info', { userId: user.id });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        var client = connect(apiKey, token, appId, options || {});
        var analyticsClient = null;
        if (analyticsToken) {
            analyticsClient = new StreamAnalytics({ apiKey: apiKey, token: analyticsToken });
            analyticsClient.setUser(client.userId);
        }
        var feeds = {};
        for (var _i = 0, sharedFeeds_1 = sharedFeeds; _i < sharedFeeds_1.length; _i++) {
            var feedProps = sharedFeeds_1[_i];
            var manager = new FeedManager(__assign(__assign({}, feedProps), { client: client, analyticsClient: analyticsClient, errorHandler: errorHandler, user: user }));
            feeds[manager.feed().id] = manager;
        }
        setClient(client);
        setUser(client.currentUser);
        setAnalyticsClient(analyticsClient);
        setSharedFeedManagers(feeds);
        getUserInfo(client.currentUser);
        return function () { var _a; return (_a = client.fayeClient) === null || _a === void 0 ? void 0 : _a.disconnect(); };
    }, [apiKey, token, appId, analyticsClient]);
    if (!(translator === null || translator === void 0 ? void 0 : translator.t))
        return null;
    return (React.createElement(StreamAppProvider, { value: { client: client, analyticsClient: analyticsClient, errorHandler: errorHandler, userData: userData, user: user, sharedFeedManagers: sharedFeedManagers } },
        React.createElement(TranslationProvider, { value: translator },
            React.createElement(React.Fragment, null, children || 'You are connected to Stream, Throw some components in here!'))));
}
//# sourceMappingURL=StreamApp.js.map