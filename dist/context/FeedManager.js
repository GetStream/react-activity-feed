import { __assign, __awaiter, __generator, __spreadArray } from "tslib";
/* eslint-disable sonarjs/no-identical-functions */
import immutable from 'immutable';
import URL from 'url-parse';
import _isPlainObject from 'lodash/isPlainObject';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import { generateRandomId } from '../utils';
var FeedManager = /** @class */ (function () {
    function FeedManager(props) {
        var _this = this;
        this.state = {
            activityOrder: [],
            activities: immutable.Map(),
            activityIdToPath: {},
            activityIdToPaths: {},
            reactionIdToPaths: {},
            reactionActivities: {},
            lastResponse: null,
            lastReverseResponse: null,
            refreshing: false,
            realtimeAdds: [],
            realtimeDeletes: [],
            subscription: null,
            unread: 0,
            unseen: 0,
            numSubscribers: 0,
            reactionsBeingToggled: {},
            childReactionsBeingToggled: {},
        };
        this.setState = function (changed) {
            _this.state = __assign(__assign({}, _this.state), (typeof changed === 'function' ? changed(_this.state) : changed));
            _this.triggerUpdate();
        };
        this.trackAnalytics = function (label, activity, track) {
            if (!track)
                return;
            var _a = _this.props, client = _a.client, analyticsClient = _a.analyticsClient, analyticsLocation = _a.analyticsLocation, feedGroup = _a.feedGroup, userId = _a.userId;
            if (!analyticsClient) {
                console.warn('trackAnalytics was enabled, but analytics client was not initialized. Please set the analyticsToken prop on StreamApp');
                return;
            }
            analyticsClient.trackEngagement({
                label: label,
                feed_id: client.feed(feedGroup, userId).id,
                content: { foreign_id: activity.foreign_id },
                location: analyticsLocation,
            });
        };
        this.getActivityPath = function (activity) {
            var rest = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rest[_i - 1] = arguments[_i];
            }
            var activityId = typeof activity === 'string' ? activity : activity.id;
            var activityPath = _this.state.activityIdToPath[activityId];
            if (activityPath === undefined) {
                return __spreadArray([activityId], rest, true);
            }
            return __spreadArray(__spreadArray([], activityPath, true), rest, true);
        };
        this.getActivityPaths = function (activity) {
            var activityId = typeof activity === 'string' ? activity : activity.id;
            return _this.state.activityIdToPaths[activityId];
        };
        this.getReactionPaths = function (reaction) {
            var reactionId = typeof reaction === 'string' ? reaction : reaction.id;
            return _this.state.reactionIdToPaths[reactionId];
        };
        this.onAddReaction = function (kind, activity, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var reaction, e_1, enrichedReaction;
                var _this = this;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!options.userId && ((_a = this.props) === null || _a === void 0 ? void 0 : _a.client.userId)) {
                                options.userId = this.props.client.userId;
                            }
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 6, , 7]);
                            if (!this.props.doReactionAddRequest) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.props.doReactionAddRequest(kind, activity, data, options)];
                        case 2:
                            reaction = _c.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.props.client.reactions.add(kind, activity, data, options)];
                        case 4:
                            reaction = _c.sent();
                            _c.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_1 = _c.sent();
                            this.props.errorHandler(e_1, 'add-reaction', {
                                kind: kind,
                                activity: activity,
                                feedGroup: this.props.feedGroup,
                                userId: this.props.userId,
                            });
                            return [2 /*return*/];
                        case 7:
                            this.trackAnalytics(kind, activity, options.trackAnalytics);
                            enrichedReaction = immutable.fromJS(__assign(__assign({}, reaction), { user: (_b = this.props.user) === null || _b === void 0 ? void 0 : _b.full }));
                            this.setState(function (prevState) {
                                var activities = prevState.activities;
                                var reactionIdToPaths = prevState.reactionIdToPaths;
                                for (var _i = 0, _a = _this.getActivityPaths(activity); _i < _a.length; _i++) {
                                    var path = _a[_i];
                                    _this.removeFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
                                    activities = activities
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['reaction_counts', kind], false), function (v) {
                                        if (v === void 0) { v = 0; }
                                        return v + 1;
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['own_reactions', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.unshift(enrichedReaction);
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['latest_reactions', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.unshift(enrichedReaction);
                                    });
                                    _this.addFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
                                }
                                return { activities: activities, reactionIdToPaths: reactionIdToPaths };
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.onRemoveReaction = function (kind, activity, id, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var e_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            if (!this.props.doReactionDeleteRequest) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.props.doReactionDeleteRequest(id)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.props.client.reactions.delete(id)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            e_2 = _a.sent();
                            this.props.errorHandler(e_2, 'delete-reaction', {
                                kind: kind,
                                activity: activity,
                                feedGroup: this.props.feedGroup,
                                userId: this.props.userId,
                            });
                            return [2 /*return*/];
                        case 6:
                            this.trackAnalytics('un' + kind, activity, options.trackAnalytics);
                            this.setState(function (prevState) {
                                var activities = prevState.activities;
                                var reactionIdToPaths = prevState.reactionIdToPaths;
                                for (var _i = 0, _a = _this.getActivityPaths(activity); _i < _a.length; _i++) {
                                    var path = _a[_i];
                                    _this.removeFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
                                    activities = activities
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['reaction_counts', kind], false), function (v) {
                                        if (v === void 0) { v = 0; }
                                        return v - 1;
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['own_reactions', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.remove(v.findIndex(function (r) { return r.get('id') === id; }));
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['latest_reactions', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.remove(v.findIndex(function (r) { return r.get('id') === id; }));
                                    });
                                    _this.addFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
                                }
                                return { activities: activities, reactionIdToPaths: reactionIdToPaths };
                            });
                            if (this.state.reactionActivities[id]) {
                                this._removeActivityFromState(this.state.reactionActivities[id]);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.onToggleReaction = function (kind, activity, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var togglingReactions, currentReactions, last;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            togglingReactions = this.state.reactionsBeingToggled[kind] || {};
                            if (togglingReactions[activity.id]) {
                                return [2 /*return*/];
                            }
                            togglingReactions[activity.id] = true;
                            this.state.reactionsBeingToggled[kind] = togglingReactions;
                            currentReactions = this.state.activities.getIn(__spreadArray(__spreadArray([], this.getActivityPaths(activity)[0], true), ['own_reactions', kind], false), immutable.List());
                            last = currentReactions.last();
                            if (!last) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.onRemoveReaction(kind, activity, last.get('id'), options)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.onAddReaction(kind, activity, data, options)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            delete togglingReactions[activity.id];
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.onAddChildReaction = function (kind, reaction, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var childReaction, e_3, enrichedReaction;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!options.userId && this.props.client && this.props.client.userId) {
                                options.userId = this.props.client.userId;
                            }
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 6, , 7]);
                            if (!this.props.doChildReactionAddRequest) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.props.doChildReactionAddRequest(kind, reaction, data, options)];
                        case 2:
                            childReaction = _b.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.props.client.reactions.addChild(kind, reaction, data, options)];
                        case 4:
                            childReaction = _b.sent();
                            _b.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_3 = _b.sent();
                            this.props.errorHandler(e_3, 'add-child-reaction', {
                                kind: kind,
                                reaction: reaction,
                                feedGroup: this.props.feedGroup,
                                userId: this.props.userId,
                            });
                            return [2 /*return*/];
                        case 7:
                            enrichedReaction = immutable.fromJS(__assign(__assign({}, childReaction), { user: (_a = this.props.user) === null || _a === void 0 ? void 0 : _a.full }));
                            this.setState(function (prevState) {
                                var activities = prevState.activities;
                                for (var _i = 0, _a = _this.getReactionPaths(reaction); _i < _a.length; _i++) {
                                    var path = _a[_i];
                                    activities = activities
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['children_counts', kind], false), function (v) {
                                        if (v === void 0) { v = 0; }
                                        return v + 1;
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['own_children', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.unshift(enrichedReaction);
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['latest_children', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.unshift(enrichedReaction);
                                    });
                                }
                                return { activities: activities };
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        this.onRemoveChildReaction = function (kind, reaction, id) { return __awaiter(_this, void 0, void 0, function () {
            var e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!this.props.doChildReactionDeleteRequest) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.doChildReactionDeleteRequest(id)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.props.client.reactions.delete(id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_4 = _a.sent();
                        this.props.errorHandler(e_4, 'delete-reaction', {
                            kind: kind,
                            reaction: reaction,
                            feedGroup: this.props.feedGroup,
                            userId: this.props.userId,
                        });
                        return [2 /*return*/];
                    case 6:
                        // this.trackAnalytics('un' + kind, reaction, options.trackAnalytics);
                        if (this.state.reactionActivities[id]) {
                            this._removeActivityFromState(this.state.reactionActivities[id]);
                        }
                        return [2 /*return*/, this.setState(function (prevState) {
                                var activities = prevState.activities;
                                for (var _i = 0, _a = _this.getReactionPaths(reaction); _i < _a.length; _i++) {
                                    var path = _a[_i];
                                    activities = activities
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['children_counts', kind], false), function (v) {
                                        if (v === void 0) { v = 0; }
                                        return v - 1;
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['own_children', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.remove(v.findIndex(function (r) { return r.get('id') === id; }));
                                    })
                                        .updateIn(__spreadArray(__spreadArray([], path, true), ['latest_children', kind], false), function (v) {
                                        if (v === void 0) { v = immutable.List(); }
                                        return v.remove(v.findIndex(function (r) { return r.get('id') === id; }));
                                    });
                                }
                                return { activities: activities };
                            })];
                }
            });
        }); };
        this.onToggleChildReaction = function (kind, reaction, data, options) {
            if (options === void 0) { options = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var togglingReactions, currentReactions, last;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            togglingReactions = this.state.childReactionsBeingToggled[kind] || {};
                            if (togglingReactions[reaction.id]) {
                                return [2 /*return*/];
                            }
                            togglingReactions[reaction.id] = true;
                            this.state.childReactionsBeingToggled[kind] = togglingReactions;
                            currentReactions = this.state.activities.getIn(__spreadArray(__spreadArray([], this.getReactionPaths(reaction)[0], true), ['own_children', kind], false), immutable.List());
                            last = currentReactions.last();
                            if (!last) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.onRemoveChildReaction(kind, reaction, last.get('id'))];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.onAddChildReaction(kind, reaction, data, options)];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            delete togglingReactions[reaction.id];
                            return [2 /*return*/];
                    }
                });
            });
        };
        this._removeActivityFromState = function (activityId) {
            return _this.setState(function (_a) {
                var activities = _a.activities, activityOrder = _a.activityOrder, activityIdToPath = _a.activityIdToPath, activityIdToPaths = _a.activityIdToPaths, reactionIdToPaths = _a.reactionIdToPaths;
                var path = _this.getActivityPath(activityId);
                var outerId = activityId;
                if (path.length > 1) {
                    // It's an aggregated group we should update the paths of everything in
                    // the list
                    var groupArrayPath = path.slice(0, -1);
                    activityIdToPath = _this.removeFoundActivityIdPath(activities.getIn(groupArrayPath).toJS(), activityIdToPath, groupArrayPath);
                    activityIdToPaths = _this.removeFoundActivityIdPaths(activities.getIn(groupArrayPath).toJS(), activityIdToPaths, groupArrayPath);
                    reactionIdToPaths = _this.removeFoundReactionIdPaths(activities.getIn(groupArrayPath).toJS(), reactionIdToPaths, groupArrayPath);
                }
                else {
                    // Otherwise remove all things inside this activity from the path
                    // objects
                    // @ts-expect-error
                    activityIdToPaths = _this.removeFoundActivityIdPaths(activities.get(activityId).toJS(), activityIdToPaths, [
                        activityId,
                    ]);
                    // @ts-expect-error
                    reactionIdToPaths = _this.removeFoundReactionIdPaths(activities.get(activityId).toJS(), reactionIdToPaths, [
                        activityId,
                    ]);
                }
                activities = activities.removeIn(path);
                if (path.length > 1) {
                    var groupArrayPath = path.slice(0, -1);
                    if (activities.getIn(groupArrayPath).size === 0) {
                        outerId = path[0];
                    }
                    else {
                        outerId = null;
                    }
                    activityIdToPath = _this.addFoundActivityIdPath(activities.getIn(groupArrayPath).toJS(), activityIdToPath, groupArrayPath);
                    activityIdToPaths = _this.addFoundActivityIdPaths(activities.getIn(groupArrayPath).toJS(), activityIdToPaths, groupArrayPath);
                    reactionIdToPaths = _this.addFoundReactionIdPaths(activities.getIn(groupArrayPath).toJS(), reactionIdToPaths, groupArrayPath);
                }
                if (outerId != null) {
                    activityOrder = activityOrder.filter(function (id) { return id !== outerId; });
                }
                return {
                    activities: activities,
                    activityOrder: activityOrder,
                    activityIdToPaths: activityIdToPaths,
                    reactionIdToPaths: reactionIdToPaths,
                    activityIdToPath: activityIdToPath,
                };
            });
        };
        this.onRemoveActivity = function (activityId) { return __awaiter(_this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!this.props.doActivityDeleteRequest) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.doActivityDeleteRequest(activityId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.feed().removeActivity(activityId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_5 = _a.sent();
                        this.props.errorHandler(e_5, 'delete-activity', {
                            activityId: this.props.feedGroup,
                            feedGroup: this.props.feedGroup,
                            userId: this.props.userId,
                        });
                        return [2 /*return*/];
                    case 6: return [2 /*return*/, this._removeActivityFromState(activityId)];
                }
            });
        }); };
        this.onMarkAsRead = function (group) { return _this._onMarkAs('read', group); };
        this.onMarkAsSeen = function (group) { return _this._onMarkAs('seen', group); };
        this._onMarkAs = function (type, group) { return __awaiter(_this, void 0, void 0, function () {
            var groupArray, markArg, e_6;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        markArg = group;
                        if (group === true) {
                            groupArray = this.state.activityOrder;
                        }
                        else if (Array.isArray(group)) {
                            groupArray = group.map(function (g) { return g.id; });
                            markArg = groupArray;
                        }
                        else {
                            markArg = group.id;
                            groupArray = [group.id];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.doFeedRequest((_a = {
                                    limit: 1,
                                    id_lte: this.state.activityOrder[0]
                                },
                                _a['mark_' + type] = markArg,
                                _a))];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _b.sent();
                        this.props.errorHandler(e_6, 'get-notification-counts', {
                            feedGroup: this.props.feedGroup,
                            userId: this.props.userId,
                        });
                        return [3 /*break*/, 4];
                    case 4:
                        this.setState(function (prevState) {
                            var _a;
                            var counterKey = "un" + type;
                            var activities = prevState.activities;
                            var counter = prevState[counterKey];
                            for (var _i = 0, groupArray_1 = groupArray; _i < groupArray_1.length; _i++) {
                                var groupId = groupArray_1[_i];
                                var markerPath = [groupId, 'is_' + type];
                                if (activities.getIn(markerPath) !== false) {
                                    continue;
                                }
                                activities = activities.setIn(markerPath, true);
                                counter--;
                            }
                            return _a = { activities: activities }, _a[counterKey] = counter, _a;
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        this.getOptions = function (extraOptions) {
            if (extraOptions === void 0) { extraOptions = {}; }
            var propOpts = __assign({}, _this.props.options);
            var id_gt = extraOptions.id_gt, id_gte = extraOptions.id_gte, id_lt = extraOptions.id_lt, id_lte = extraOptions.id_lte, offset = extraOptions.offset;
            if (id_gt || id_gte || id_lt || id_lte || offset != null) {
                delete propOpts.id_gt;
                delete propOpts.id_gte;
                delete propOpts.id_lt;
                delete propOpts.id_lte;
                delete propOpts.offset;
                // @ts-expect-error
                delete propOpts.refresh;
            }
            return __assign(__assign({ withReactionCounts: true, withOwnReactions: true, limit: 10 }, propOpts), extraOptions);
        };
        this.doFeedRequest = function (options) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.doFeedRequest) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.doFeedRequest(this.props.client, this.props.feedGroup, this.props.userId, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.feed().get(options)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.feed = function () { return _this.props.client.feed(_this.props.feedGroup, _this.props.userId); };
        this.responseToActivityMap = function (response) {
            return immutable.fromJS(
            // @ts-expect-error
            response.results.reduce(function (map, a) {
                map[a.id] = a;
                return map;
            }, {}));
        };
        this.responseToActivityIdToPath = function (response) {
            if (response.results.length === 0 || response.results[0].activities === undefined) {
                return {};
            }
            var results = response.results;
            var map = {};
            var _loop_1 = function (group) {
                group.activities.forEach(function (act, i) {
                    map[act.id] = [group.id, 'activities', i];
                });
            };
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var group = results_1[_i];
                _loop_1(group);
            }
            return map;
        };
        this.responseToActivityIdToPaths = function (response, previous) {
            if (previous === void 0) { previous = {}; }
            var map = previous;
            var currentPath = [];
            function addFoundActivities(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function (v, i) {
                        currentPath.push(i);
                        addFoundActivities(v);
                        currentPath.pop();
                    });
                }
                else if (_isPlainObject(obj)) {
                    // @ts-expect-error
                    if (obj.id && obj.actor && obj.verb && obj.object) {
                        if (!map[obj.id]) {
                            map[obj.id] = [];
                        }
                        map[obj.id].push(__spreadArray([], currentPath, true));
                    }
                    for (var k in obj) {
                        currentPath.push(k);
                        // @ts-expect-error
                        addFoundActivities(obj[k]);
                        currentPath.pop();
                    }
                }
            }
            for (var _i = 0, _a = response.results; _i < _a.length; _i++) {
                var a = _a[_i];
                currentPath.push(a.id);
                addFoundActivities(a);
                currentPath.pop();
            }
            return map;
        };
        this.feedResponseToReactionIdToPaths = function (response, previous) {
            if (previous === void 0) { previous = {}; }
            var map = previous;
            var currentPath = [];
            function addFoundReactions(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function (v, i) {
                        currentPath.push(i);
                        addFoundReactions(v);
                        currentPath.pop();
                    });
                }
                else if (_isPlainObject(obj)) {
                    // @ts-expect-error
                    if (obj.id && obj.kind && obj.data) {
                        if (!map[obj.id]) {
                            map[obj.id] = [];
                        }
                        map[obj.id].push(__spreadArray([], currentPath, true));
                    }
                    for (var k in obj) {
                        currentPath.push(k);
                        // @ts-expect-error
                        addFoundReactions(obj[k]);
                        currentPath.pop();
                    }
                }
            }
            for (var _i = 0, _a = response.results; _i < _a.length; _i++) {
                var a = _a[_i];
                currentPath.push(a.id);
                addFoundReactions(a);
                currentPath.pop();
            }
            return map;
        };
        this.reactionResponseToReactionIdToPaths = function (response, previous, basePath, oldLength) {
            var map = previous;
            var currentPath = __spreadArray([], basePath, true);
            function addFoundReactions(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function (v, i) {
                        currentPath.push(i);
                        addFoundReactions(v);
                        currentPath.pop();
                    });
                }
                else if (_isPlainObject(obj)) {
                    if (obj.id && obj.kind && obj.data) {
                        if (!map[obj.id]) {
                            map[obj.id] = [];
                        }
                        map[obj.id].push(__spreadArray([], currentPath, true));
                    }
                    for (var k in obj) {
                        currentPath.push(k);
                        // @ts-expect-error
                        addFoundReactions(obj[k]);
                        currentPath.pop();
                    }
                }
            }
            for (var _i = 0, _a = response.results; _i < _a.length; _i++) {
                var a = _a[_i];
                currentPath.push(oldLength);
                addFoundReactions(a);
                currentPath.pop();
                oldLength++;
            }
            return map;
        };
        this.removeFoundReactionIdPaths = function (data, previous, basePath) {
            var map = previous;
            var currentPath = __spreadArray([], basePath, true);
            function removeFoundReactions(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function (v, i) {
                        currentPath.push(i);
                        removeFoundReactions(v);
                        currentPath.pop();
                    });
                }
                else if (_isPlainObject(obj)) {
                    if (obj.id && obj.kind && obj.data) {
                        if (!map[obj.id]) {
                            map[obj.id] = [];
                        }
                        _remove(map[obj.id], function (path) { return _isEqual(path, currentPath); });
                    }
                    for (var k in obj) {
                        currentPath.push(k);
                        // @ts-expect-error
                        removeFoundReactions(obj[k]);
                        currentPath.pop();
                    }
                }
            }
            removeFoundReactions(data);
            return map;
        };
        this.removeFoundActivityIdPaths = function (data, previous, basePath) {
            var map = previous;
            var currentPath = __spreadArray([], basePath, true);
            function addFoundActivities(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function (v, i) {
                        currentPath.push(i);
                        addFoundActivities(v);
                        currentPath.pop();
                    });
                }
                else if (_isPlainObject(obj)) {
                    if (obj.id && obj.actor && obj.verb && obj.object) {
                        if (!map[obj.id]) {
                            map[obj.id] = [];
                        }
                        _remove(map[obj.id], function (path) { return _isEqual(path, currentPath); });
                    }
                    for (var k in obj) {
                        currentPath.push(k);
                        // @ts-expect-error
                        addFoundActivities(obj[k]);
                        currentPath.pop();
                    }
                }
            }
            addFoundActivities(data);
            return map;
        };
        this.removeFoundActivityIdPath = function (data, previous, basePath) {
            var map = previous;
            var currentPath = __spreadArray([], basePath, true);
            data.forEach(function (obj, i) {
                currentPath.push(i);
                if (_isEqual(map[obj.id], currentPath)) {
                    delete map[obj.id];
                }
                currentPath.pop();
            });
            return map;
        };
        this.addFoundReactionIdPaths = function (data, previous, basePath) {
            var map = previous;
            var currentPath = __spreadArray([], basePath, true);
            function addFoundReactions(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function (v, i) {
                        currentPath.push(i);
                        addFoundReactions(v);
                        currentPath.pop();
                    });
                }
                else if (_isPlainObject(obj)) {
                    if (obj.id && obj.kind && obj.data) {
                        if (!map[obj.id]) {
                            map[obj.id] = [];
                        }
                        map[obj.id].push(__spreadArray([], currentPath, true));
                    }
                    for (var k in obj) {
                        currentPath.push(k);
                        // @ts-expect-error
                        addFoundReactions(obj[k]);
                        currentPath.pop();
                    }
                }
            }
            addFoundReactions(data);
            return map;
        };
        this.addFoundActivityIdPaths = function (data, previous, basePath) {
            var map = previous;
            var currentPath = __spreadArray([], basePath, true);
            function addFoundActivities(obj) {
                if (Array.isArray(obj)) {
                    obj.forEach(function (v, i) {
                        currentPath.push(i);
                        addFoundActivities(v);
                        currentPath.pop();
                    });
                }
                else if (_isPlainObject(obj)) {
                    if (obj.id && obj.actor && obj.verb && obj.object) {
                        if (!map[obj.id]) {
                            map[obj.id] = [];
                        }
                        map[obj.id].push(__spreadArray([], currentPath, true));
                    }
                    for (var k in obj) {
                        currentPath.push(k);
                        // @ts-expect-error
                        addFoundActivities(obj[k]);
                        currentPath.pop();
                    }
                }
            }
            addFoundActivities(data);
            return map;
        };
        this.addFoundActivityIdPath = function (data, previous, basePath) {
            var map = previous;
            data.forEach(function (obj, i) {
                map[obj.id] = __spreadArray(__spreadArray([], basePath, true), [i], false);
            });
            return map;
        };
        this.responseToReactionActivities = function (response) {
            if (response.results.length === 0) {
                return {};
            }
            var map = {};
            function setReactionActivities(activities) {
                for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
                    var a = activities_1[_i];
                    if (a.reaction && a.reaction.id) {
                        map[a.reaction.id] = a.id;
                    }
                }
            }
            if (response.results[0].activities === undefined) {
                setReactionActivities(response.results);
            }
            else {
                var aggregatedResults = response.results;
                for (var _i = 0, aggregatedResults_1 = aggregatedResults; _i < aggregatedResults_1.length; _i++) {
                    var group = aggregatedResults_1[_i];
                    setReactionActivities(group.activities);
                }
            }
            return map;
        };
        this.refresh = function (extraOptions) { return __awaiter(_this, void 0, void 0, function () {
            var options, response, e_7, newState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.getOptions(extraOptions);
                        return [4 /*yield*/, this.setState({ refreshing: true })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.doFeedRequest(options)];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_7 = _a.sent();
                        this.setState({ refreshing: false });
                        this.props.errorHandler(e_7, 'get-feed', {
                            feedGroup: this.props.feedGroup,
                            userId: this.props.userId,
                        });
                        return [2 /*return*/];
                    case 5:
                        newState = __assign({ activityOrder: response.results.map(function (a) { return a.id; }), activities: this.responseToActivityMap(response), activityIdToPath: this.responseToActivityIdToPath(response), activityIdToPaths: this.responseToActivityIdToPaths(response), reactionIdToPaths: this.feedResponseToReactionIdToPaths(response), reactionActivities: this.responseToReactionActivities(response), refreshing: false, lastResponse: response, realtimeAdds: [], realtimeDeletes: [] }, this.unseenUnreadFromResponse(response));
                        if (options.mark_seen === true) {
                            newState.unseen = 0;
                        }
                        if (options.mark_read === true) {
                            newState.unread = 0;
                        }
                        return [2 /*return*/, this.setState(newState)];
                }
            });
        }); };
        // TODO: deprecate async in next major release
        // eslint-disable-next-line require-await
        this.subscribe = function () { return __awaiter(_this, void 0, void 0, function () {
            var feed;
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.props.notify)
                    return [2 /*return*/];
                feed = this.feed();
                this.setState(function (prevState) {
                    if (prevState.subscription)
                        return {};
                    var subscription = feed.subscribe(function (data) {
                        _this.setState(function (prevState) {
                            var numActivityDiff = data.new.length - data.deleted.length;
                            return {
                                realtimeAdds: prevState.realtimeAdds.concat(data.new),
                                realtimeDeletes: prevState.realtimeDeletes.concat(data.deleted),
                                unread: prevState.unread + numActivityDiff,
                                unseen: prevState.unseen + numActivityDiff,
                            };
                        });
                    });
                    subscription.then(function () { return console.log("now listening to changes in realtime for " + _this.feed().id); }, function (err) { return console.error(err); });
                    return { subscription: subscription };
                });
                return [2 /*return*/];
            });
        }); };
        this.unsubscribe = function () { return __awaiter(_this, void 0, void 0, function () {
            var subscription, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subscription = this.state.subscription;
                        if (!subscription || this.registeredCallbacks.length) {
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, subscription];
                    case 2:
                        _a.sent();
                        this.setState({ subscription: null });
                        // @ts-expect-error
                        subscription === null || subscription === void 0 ? void 0 : subscription.cancel();
                        console.log("stopped listening to changes in realtime for " + this.feed().id);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.hasNextPage = function () {
            var lastResponse = _this.state.lastResponse;
            return Boolean(lastResponse && lastResponse.next);
        };
        this.hasReverseNextPage = function () {
            var lastReverseResponse = _this.state.lastReverseResponse;
            return Boolean(lastReverseResponse && lastReverseResponse.next);
        };
        this.loadNextPage = function () { return __awaiter(_this, void 0, void 0, function () {
            var lastResponse, cancel, nextURL, options, response, e_8;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastResponse = this.state.lastResponse;
                        if (!lastResponse || !lastResponse.next) {
                            return [2 /*return*/];
                        }
                        cancel = false;
                        return [4 /*yield*/, this.setState(function (prevState) {
                                if (prevState.refreshing) {
                                    cancel = true;
                                    return {};
                                }
                                return { refreshing: true };
                            })];
                    case 1:
                        _a.sent();
                        if (cancel) {
                            return [2 /*return*/];
                        }
                        nextURL = new URL(lastResponse.next, true);
                        options = this.getOptions(nextURL.query);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.doFeedRequest(options)];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_8 = _a.sent();
                        this.setState({ refreshing: false });
                        this.props.errorHandler(e_8, 'get-feed-next-page', {
                            feedGroup: this.props.feedGroup,
                            userId: this.props.userId,
                        });
                        return [2 /*return*/];
                    case 5: return [2 /*return*/, this.setState(function (prevState) {
                            var activities = prevState.activities.merge(_this.responseToActivityMap(response));
                            var activityIdToPath = __assign(__assign({}, prevState.activityIdToPath), _this.responseToActivityIdToPath(response));
                            return {
                                activityOrder: prevState.activityOrder.concat(response.results.map(function (a) { return a.id; })),
                                activities: activities,
                                activityIdToPath: activityIdToPath,
                                activityIdToPaths: _this.responseToActivityIdToPaths(response, prevState.activityIdToPaths),
                                reactionIdToPaths: _this.feedResponseToReactionIdToPaths(response, prevState.reactionIdToPaths),
                                reactionActivities: __assign(__assign({}, prevState.reactionActivities), _this.responseToReactionActivities(response)),
                                refreshing: false,
                                lastResponse: response,
                            };
                        })];
                }
            });
        }); };
        this.loadReverseNextPage = function () { return __awaiter(_this, void 0, void 0, function () {
            var lastReverseResponse, cancel, nextURL, options, response, e_9;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lastReverseResponse = this.state.lastReverseResponse;
                        if (!lastReverseResponse || !lastReverseResponse.next) {
                            return [2 /*return*/];
                        }
                        cancel = false;
                        return [4 /*yield*/, this.setState(function (prevState) {
                                if (prevState.refreshing) {
                                    cancel = true;
                                    return {};
                                }
                                return { refreshing: true };
                            })];
                    case 1:
                        _a.sent();
                        if (cancel) {
                            return [2 /*return*/];
                        }
                        nextURL = new URL(lastReverseResponse.next, true);
                        options = this.getOptions(nextURL.query);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.doFeedRequest(options)];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_9 = _a.sent();
                        this.setState({ refreshing: false });
                        this.props.errorHandler(e_9, 'get-feed-next-page', {
                            feedGroup: this.props.feedGroup,
                            userId: this.props.userId,
                        });
                        return [2 /*return*/];
                    case 5: return [2 /*return*/, this.setState(function (prevState) {
                            var activities = prevState.activities.merge(_this.responseToActivityMap(response));
                            var activityIdToPath = __assign(__assign({}, prevState.activityIdToPath), _this.responseToActivityIdToPath(response));
                            return {
                                activityOrder: response.results.map(function (a) { return a.id; }).concat(prevState.activityOrder),
                                activities: activities,
                                activityIdToPath: activityIdToPath,
                                activityIdToPaths: _this.responseToActivityIdToPaths(response, prevState.activityIdToPaths),
                                reactionIdToPaths: _this.feedResponseToReactionIdToPaths(response, prevState.reactionIdToPaths),
                                reactionActivities: __assign(__assign({}, prevState.reactionActivities), _this.responseToReactionActivities(response)),
                                refreshing: false,
                                lastReverseResponse: response,
                            };
                        })];
                }
            });
        }); };
        this.loadNextReactions = function (activityId, kind, activityPath, oldestToNewest) { return __awaiter(_this, void 0, void 0, function () {
            var options, orderPrefix, latestReactionsPath, nextUrlPath, refreshingPath, reactions_extra, nextUrl, refreshing, response, e_10;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = { activity_id: activityId, kind: kind };
                        orderPrefix = 'latest';
                        if (oldestToNewest) {
                            orderPrefix = 'oldest';
                        }
                        if (!activityPath) {
                            activityPath = this.getActivityPath(activityId);
                        }
                        latestReactionsPath = __spreadArray(__spreadArray([], activityPath, true), [orderPrefix + '_reactions', kind], false);
                        nextUrlPath = __spreadArray(__spreadArray([], activityPath, true), [orderPrefix + '_reactions_extra', kind, 'next'], false);
                        refreshingPath = __spreadArray(__spreadArray([], activityPath, true), [orderPrefix + '_reactions_extra', kind, 'refreshing'], false);
                        reactions_extra = this.state.activities.getIn(__spreadArray(__spreadArray([], activityPath, true), [orderPrefix + '_reactions_extra'], false));
                        nextUrl = 'https://api.stream-io-api.com/';
                        if (reactions_extra) {
                            nextUrl = reactions_extra.getIn([kind, 'next'], '');
                        }
                        else if (oldestToNewest) {
                            // If it's the first request and oldest to newest make sure
                            // order is reversed by this trick with a non existant id.
                            options.id_gt = 'non-existant-' + generateRandomId();
                        }
                        refreshing = this.state.activities.getIn(refreshingPath, false);
                        if (!nextUrl || refreshing) {
                            return [2 /*return*/];
                        }
                        this.setState(function (prevState) { return ({ activities: prevState.activities.setIn(refreshingPath, true) }); });
                        options = __assign(__assign({}, URL(nextUrl, true).query), options);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!this.props.doReactionsFilterRequest) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.props.doReactionsFilterRequest(options)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.props.client.reactions.filter(options)];
                    case 4:
                        response = _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        e_10 = _a.sent();
                        this.setState({ refreshing: false });
                        this.props.errorHandler(e_10, 'get-reactions-next-page', { options: options });
                        return [2 /*return*/];
                    case 7:
                        this.setState(function (prevState) { return ({
                            activities: prevState.activities
                                .setIn(refreshingPath, false)
                                .setIn(nextUrlPath, response.next)
                                .updateIn(latestReactionsPath, function (v) {
                                if (v === void 0) { v = immutable.List(); }
                                return v.concat(immutable.fromJS(response.results));
                            }),
                            reactionIdToPaths: _this.reactionResponseToReactionIdToPaths(response, prevState.reactionIdToPaths, latestReactionsPath, prevState.activities.getIn(latestReactionsPath, immutable.List()).toJS().length),
                        }); });
                        return [2 /*return*/];
                }
            });
        }); };
        this.refreshUnreadUnseen = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.doFeedRequest({ limit: 0 })];
                    case 1:
                        response = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_11 = _a.sent();
                        this.props.errorHandler(e_11, 'get-notification-counts', {
                            feedGroup: this.props.feedGroup,
                            userId: this.props.userId,
                        });
                        return [2 /*return*/];
                    case 3: return [2 /*return*/, this.setState(this.unseenUnreadFromResponse(response))];
                }
            });
        }); };
        this.props = props;
        var initialOptions = this.getOptions();
        this.registeredCallbacks = [];
        var previousUrl = '';
        if (initialOptions.id_gte) {
            previousUrl = "?id_lt=" + initialOptions.id_gte;
        }
        else if (initialOptions.id_gt) {
            previousUrl = "?id_lte=" + initialOptions.id_gt;
        }
        else if (initialOptions.id_lte) {
            previousUrl = "?id_gt=" + initialOptions.id_lte;
        }
        else if (initialOptions.id_lt) {
            previousUrl = "?id_gte=" + initialOptions.id_lt;
        }
        this.state.lastReverseResponse = { next: previousUrl };
    }
    FeedManager.prototype.register = function (callback) {
        this.registeredCallbacks.push(callback);
        this.subscribe();
    };
    FeedManager.prototype.unregister = function (callback) {
        this.registeredCallbacks.splice(this.registeredCallbacks.indexOf(callback), 1);
        this.unsubscribe();
    };
    FeedManager.prototype.triggerUpdate = function () {
        for (var _i = 0, _a = this.registeredCallbacks; _i < _a.length; _i++) {
            var callback = _a[_i];
            callback();
        }
    };
    FeedManager.prototype.unseenUnreadFromResponse = function (response) {
        var unseen = 0;
        var unread = 0;
        if (typeof response.unseen === 'number') {
            unseen = response.unseen;
        }
        if (typeof response.unread === 'number') {
            unread = response.unread;
        }
        return { unseen: unseen, unread: unread };
    };
    return FeedManager;
}());
export { FeedManager };
//# sourceMappingURL=FeedManager.js.map