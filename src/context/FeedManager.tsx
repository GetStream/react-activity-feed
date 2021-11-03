/* eslint-disable sonarjs/no-identical-functions */
import immutable from 'immutable';
import URL from 'url-parse';
import StreamAnalytics from 'stream-analytics';
import _isPlainObject from 'lodash/isPlainObject';
import _isEqual from 'lodash/isEqual';
import _remove from 'lodash/remove';
import {
  UR,
  StreamClient,
  StreamUser,
  FeedAPIResponse,
  RealTimeMessage,
  GetFeedOptions,
  Activity,
  EnrichedActivity,
  FlatActivityEnriched,
  AggregatedActivityEnriched,
  NotificationActivityEnriched,
  Reaction,
  ReactionAddOptions,
  ReactionAPIResponse,
  ReactionAddChildOptions,
  ReactionFilterAPIResponse,
  EnrichedReaction,
  EnrichedReactionAPIResponse,
} from 'getstream';

import { generateRandomId } from '../utils';
import { ErrorHandler } from '../utils/errors';
import { DefaultUT, DefaultAT } from './StreamApp';
import { FeedProps } from './Feed';
import { Subscription } from 'faye';

type CU = immutable.Collection<unknown, unknown>;

type MarkAsGroup = boolean | { id: string } | Array<{ id: string }>;

type TrackAnalytics = { trackAnalytics?: boolean };

type ResponseResult<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> =
  | FlatActivityEnriched<UT, AT, CT, RT, CRT>
  | AggregatedActivityEnriched<UT, AT, CT, RT, CRT>
  | NotificationActivityEnriched<UT, AT, CT, RT, CRT>;

export type UpdateTriggeredCallback = () => void;

export type FeedManagerProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
> = FeedProps<UT, AT, CT, RT, CRT, PT> & {
  analyticsClient: StreamAnalytics<UT> | null;
  client: StreamClient<UT, AT, CT, RT, CRT, PT>;
  errorHandler: ErrorHandler;
  user?: StreamUser<UT>;
};

export type FeedManagerState<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  activities: immutable.Map<string, immutable.Record<ResponseResult<UT, AT, CT, RT, CRT>>>;
  activityIdToPath: Record<string, Array<string | number>>;
  // Used for finding reposted activities
  activityIdToPaths: Record<string, Array<Array<string | number>>>;
  activityOrder: string[];
  childReactionsBeingToggled: Record<string, Record<string, boolean>>;
  numSubscribers: number;
  // activities created by creating a reaction with targetFeeds. It's a mapping
  // of a reaction id to an activity id.
  reactionActivities: Record<string, string>;
  // Used for finding reposted activities
  reactionIdToPaths: Record<string, Array<Array<string | number>>>;
  reactionsBeingToggled: Record<string, Record<string, boolean>>;
  realtimeAdds: RealTimeMessage<UT, AT>['new'];
  realtimeDeletes: string[];
  refreshing: boolean;
  subscription: Promise<Subscription> | null;
  unread: number;
  unseen: number;
  lastResponse?: FeedAPIResponse<UT, AT, CT, RT, CRT> | null;
  lastReverseResponse?: { next: string } | null;
};

export class FeedManager<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
> {
  registeredCallbacks: Array<UpdateTriggeredCallback>;

  props: FeedManagerProps<UT, AT, CT, RT, CRT, PT>;

  state: FeedManagerState<UT, AT, CT, RT, CRT> = {
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

  constructor(props: FeedManagerProps<UT, AT, CT, RT, CRT, PT>) {
    this.props = props;
    const initialOptions = this.getOptions();
    this.registeredCallbacks = [];

    let previousUrl = '';
    if (initialOptions.id_gte) {
      previousUrl = `?id_lt=${initialOptions.id_gte}`;
    } else if (initialOptions.id_gt) {
      previousUrl = `?id_lte=${initialOptions.id_gt}`;
    } else if (initialOptions.id_lte) {
      previousUrl = `?id_gt=${initialOptions.id_lte}`;
    } else if (initialOptions.id_lt) {
      previousUrl = `?id_gte=${initialOptions.id_lt}`;
    }

    this.state.lastReverseResponse = { next: previousUrl };
  }

  register(callback: UpdateTriggeredCallback) {
    this.registeredCallbacks.push(callback);
    this.subscribe();
  }

  unregister(callback: UpdateTriggeredCallback) {
    this.registeredCallbacks.splice(this.registeredCallbacks.indexOf(callback), 1);
    this.unsubscribe();
  }

  triggerUpdate() {
    for (const callback of this.registeredCallbacks) {
      callback();
    }
  }

  setState = (
    changed:
      | Partial<FeedManagerState<UT, AT, CT, RT, CRT>>
      | ((oldState: FeedManagerState<UT, AT, CT, RT, CRT>) => Partial<FeedManagerState<UT, AT, CT, RT, CRT>>),
  ) => {
    this.state = {
      ...this.state,
      ...(typeof changed === 'function' ? changed(this.state) : changed),
    };
    this.triggerUpdate();
  };

  trackAnalytics = (label: string, activity: { foreign_id: string }, track?: boolean) => {
    if (!track) return;

    const { client, analyticsClient, analyticsLocation, feedGroup, userId } = this.props;

    if (!analyticsClient) {
      console.warn(
        'trackAnalytics was enabled, but analytics client was not initialized. Please set the analyticsToken prop on StreamApp',
      );
      return;
    }

    analyticsClient.trackEngagement({
      label,
      feed_id: client.feed(feedGroup, userId).id,
      content: { foreign_id: activity.foreign_id },
      location: analyticsLocation,
    });
  };

  getActivityPath = (activity: Activity | string, ...rest: string[]) => {
    const activityId = typeof activity === 'string' ? activity : activity.id;

    const activityPath = this.state.activityIdToPath[activityId];
    if (activityPath === undefined) {
      return [activityId, ...rest];
    }
    return [...activityPath, ...rest];
  };

  getActivityPaths = (activity: Activity | string) => {
    const activityId = typeof activity === 'string' ? activity : activity.id;
    return this.state.activityIdToPaths[activityId];
  };

  getReactionPaths = (reaction: Reaction | string) => {
    const reactionId = typeof reaction === 'string' ? reaction : reaction.id;
    return this.state.reactionIdToPaths[reactionId];
  };

  onAddReaction = async (
    kind: string,
    activity: Activity<AT>,
    data?: RT,
    options: ReactionAddOptions & TrackAnalytics = {},
  ) => {
    if (!options.userId && this.props?.client.userId) {
      options.userId = this.props.client.userId;
    }

    let reaction: ReactionAPIResponse<RT>;
    try {
      if (this.props.doReactionAddRequest) {
        reaction = await this.props.doReactionAddRequest(kind, activity, data, options);
      } else {
        reaction = await this.props.client.reactions.add(kind, activity, data, options);
      }
    } catch (e) {
      this.props.errorHandler(e, 'add-reaction', {
        kind,
        activity,
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }

    this.trackAnalytics(kind, activity, options.trackAnalytics);
    const enrichedReaction = immutable.fromJS({ ...reaction, user: this.props.user?.full });

    this.setState((prevState) => {
      let { activities } = prevState;
      const { reactionIdToPaths } = prevState;
      for (const path of this.getActivityPaths(activity)) {
        this.removeFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);

        activities = activities
          .updateIn([...path, 'reaction_counts', kind], (v = 0) => v + 1)
          .updateIn([...path, 'own_reactions', kind], (v = immutable.List()) => v.unshift(enrichedReaction))
          .updateIn([...path, 'latest_reactions', kind], (v = immutable.List()) => v.unshift(enrichedReaction));

        this.addFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
      }

      return { activities, reactionIdToPaths };
    });
  };

  onRemoveReaction = async (kind: string, activity: Activity<AT>, id: string, options: TrackAnalytics = {}) => {
    try {
      if (this.props.doReactionDeleteRequest) {
        await this.props.doReactionDeleteRequest(id);
      } else {
        await this.props.client.reactions.delete(id);
      }
    } catch (e) {
      this.props.errorHandler(e, 'delete-reaction', {
        kind,
        activity,
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }

    this.trackAnalytics('un' + kind, activity, options.trackAnalytics);

    this.setState((prevState) => {
      let { activities } = prevState;
      const { reactionIdToPaths } = prevState;
      for (const path of this.getActivityPaths(activity)) {
        this.removeFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);

        activities = activities
          .updateIn([...path, 'reaction_counts', kind], (v = 0) => v - 1)
          .updateIn([...path, 'own_reactions', kind], (v = immutable.List()) =>
            v.remove(v.findIndex((r: CU) => r.get('id') === id)),
          )
          .updateIn([...path, 'latest_reactions', kind], (v = immutable.List()) =>
            v.remove(v.findIndex((r: CU) => r.get('id') === id)),
          );

        this.addFoundReactionIdPaths(activities.getIn(path).toJS(), reactionIdToPaths, path);
      }

      return { activities, reactionIdToPaths };
    });

    if (this.state.reactionActivities[id]) {
      this._removeActivityFromState(this.state.reactionActivities[id]);
    }
  };

  onToggleReaction = async (
    kind: string,
    activity: Activity<AT>,
    data?: RT,
    options: ReactionAddOptions & TrackAnalytics = {},
  ) => {
    const togglingReactions = this.state.reactionsBeingToggled[kind] || {};
    if (togglingReactions[activity.id]) {
      return;
    }
    togglingReactions[activity.id] = true;
    this.state.reactionsBeingToggled[kind] = togglingReactions;

    const currentReactions = this.state.activities.getIn(
      [...this.getActivityPaths(activity)[0], 'own_reactions', kind],
      immutable.List(),
    );

    const last = currentReactions.last();
    if (last) {
      await this.onRemoveReaction(kind, activity, last.get('id'), options);
    } else {
      await this.onAddReaction(kind, activity, data, options);
    }
    delete togglingReactions[activity.id];
  };

  onAddChildReaction = async (
    kind: string,
    reaction: Reaction<RT>,
    data?: CRT,
    options: ReactionAddChildOptions = {},
  ) => {
    if (!options.userId && this.props.client && this.props.client.userId) {
      options.userId = this.props.client.userId;
    }

    let childReaction;
    try {
      if (this.props.doChildReactionAddRequest) {
        childReaction = await this.props.doChildReactionAddRequest(kind, reaction, data, options);
      } else {
        childReaction = await this.props.client.reactions.addChild(kind, reaction, data, options);
      }
    } catch (e) {
      this.props.errorHandler(e, 'add-child-reaction', {
        kind,
        reaction,
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }

    // this.trackAnalytics(kind, reaction, options.trackAnalytics);
    const enrichedReaction = immutable.fromJS({ ...childReaction, user: this.props.user?.full });

    this.setState((prevState) => {
      let { activities } = prevState;
      for (const path of this.getReactionPaths(reaction)) {
        activities = activities
          .updateIn([...path, 'children_counts', kind], (v = 0) => v + 1)
          .updateIn([...path, 'own_children', kind], (v = immutable.List()) => v.unshift(enrichedReaction))
          .updateIn([...path, 'latest_children', kind], (v = immutable.List()) => v.unshift(enrichedReaction));
      }

      return { activities };
    });
  };

  onRemoveChildReaction = async (kind: string, reaction: Reaction<RT>, id: string) => {
    try {
      if (this.props.doChildReactionDeleteRequest) {
        await this.props.doChildReactionDeleteRequest(id);
      } else {
        await this.props.client.reactions.delete(id);
      }
    } catch (e) {
      this.props.errorHandler(e, 'delete-reaction', {
        kind,
        reaction,
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    // this.trackAnalytics('un' + kind, reaction, options.trackAnalytics);
    if (this.state.reactionActivities[id]) {
      this._removeActivityFromState(this.state.reactionActivities[id]);
    }

    return this.setState((prevState) => {
      let { activities } = prevState;
      for (const path of this.getReactionPaths(reaction)) {
        activities = activities
          .updateIn([...path, 'children_counts', kind], (v = 0) => v - 1)
          .updateIn([...path, 'own_children', kind], (v = immutable.List()) =>
            v.remove(v.findIndex((r: CU) => r.get('id') === id)),
          )
          .updateIn([...path, 'latest_children', kind], (v = immutable.List()) =>
            v.remove(v.findIndex((r: CU) => r.get('id') === id)),
          );
      }

      return { activities };
    });
  };

  onToggleChildReaction = async (
    kind: string,
    reaction: Reaction<RT>,
    data?: CRT,
    options: ReactionAddChildOptions = {},
  ) => {
    const togglingReactions = this.state.childReactionsBeingToggled[kind] || {};
    if (togglingReactions[reaction.id]) {
      return;
    }
    togglingReactions[reaction.id] = true;
    this.state.childReactionsBeingToggled[kind] = togglingReactions;

    const currentReactions = this.state.activities.getIn(
      [...this.getReactionPaths(reaction)[0], 'own_children', kind],
      immutable.List(),
    );

    const last = currentReactions.last();
    if (last) {
      await this.onRemoveChildReaction(kind, reaction, last.get('id'));
    } else {
      await this.onAddChildReaction(kind, reaction, data, options);
    }
    delete togglingReactions[reaction.id];
  };

  _removeActivityFromState = (activityId: string) =>
    this.setState(({ activities, activityOrder, activityIdToPath, activityIdToPaths, reactionIdToPaths }) => {
      const path = this.getActivityPath(activityId);
      let outerId: string | number | null = activityId;
      if (path.length > 1) {
        // It's an aggregated group we should update the paths of everything in
        // the list
        const groupArrayPath = path.slice(0, -1);
        activityIdToPath = this.removeFoundActivityIdPath(
          activities.getIn(groupArrayPath).toJS(),
          activityIdToPath,
          groupArrayPath,
        );
        activityIdToPaths = this.removeFoundActivityIdPaths(
          activities.getIn(groupArrayPath).toJS(),
          activityIdToPaths,
          groupArrayPath,
        );
        reactionIdToPaths = this.removeFoundReactionIdPaths(
          activities.getIn(groupArrayPath).toJS(),
          reactionIdToPaths,
          groupArrayPath,
        );
      } else {
        // Otherwise remove all things inside this activity from the path
        // objects
        // @ts-expect-error
        activityIdToPaths = this.removeFoundActivityIdPaths(activities.get(activityId).toJS(), activityIdToPaths, [
          activityId,
        ]);
        // @ts-expect-error
        reactionIdToPaths = this.removeFoundReactionIdPaths(activities.get(activityId).toJS(), reactionIdToPaths, [
          activityId,
        ]);
      }

      activities = activities.removeIn(path);
      if (path.length > 1) {
        const groupArrayPath = path.slice(0, -1);
        if (activities.getIn(groupArrayPath).size === 0) {
          outerId = path[0];
        } else {
          outerId = null;
        }
        activityIdToPath = this.addFoundActivityIdPath(
          activities.getIn(groupArrayPath).toJS(),
          activityIdToPath,
          groupArrayPath,
        );
        activityIdToPaths = this.addFoundActivityIdPaths(
          activities.getIn(groupArrayPath).toJS(),
          activityIdToPaths,
          groupArrayPath,
        );
        reactionIdToPaths = this.addFoundReactionIdPaths(
          activities.getIn(groupArrayPath).toJS(),
          reactionIdToPaths,
          groupArrayPath,
        );
      }
      if (outerId != null) {
        activityOrder = activityOrder.filter((id) => id !== outerId);
      }
      return {
        activities,
        activityOrder,
        activityIdToPaths,
        reactionIdToPaths,
        activityIdToPath,
      };
    });

  onRemoveActivity = async (activityId: string) => {
    try {
      if (this.props.doActivityDeleteRequest) {
        await this.props.doActivityDeleteRequest(activityId);
      } else {
        await this.feed().removeActivity(activityId);
      }
    } catch (e) {
      this.props.errorHandler(e, 'delete-activity', {
        activityId: this.props.feedGroup,
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    return this._removeActivityFromState(activityId);
  };

  onMarkAsRead = (group: MarkAsGroup) => this._onMarkAs('read', group);

  onMarkAsSeen = (group: MarkAsGroup) => this._onMarkAs('seen', group);

  _onMarkAs = async (type: 'seen' | 'read', group: MarkAsGroup) => {
    let groupArray: string[];
    let markArg: string | string[] | MarkAsGroup = group;
    if (group === true) {
      groupArray = this.state.activityOrder;
    } else if (Array.isArray(group)) {
      groupArray = group.map((g) => g.id);
      markArg = groupArray;
    } else {
      markArg = (group as { id: string }).id;
      groupArray = [(group as { id: string }).id];
    }

    try {
      await this.doFeedRequest({
        limit: 1,
        id_lte: this.state.activityOrder[0],
        ['mark_' + type]: markArg,
      });
    } catch (e) {
      this.props.errorHandler(e, 'get-notification-counts', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
    }
    this.setState((prevState) => {
      const counterKey = `un${type}` as 'unread' | 'unseen';
      let activities = prevState.activities;
      let counter = prevState[counterKey];
      for (const groupId of groupArray) {
        const markerPath = [groupId, 'is_' + type];
        if (activities.getIn(markerPath) !== false) {
          continue;
        }
        activities = activities.setIn(markerPath, true);
        counter--;
      }
      return { activities, [counterKey]: counter };
    });
  };

  getOptions = (extraOptions: GetFeedOptions = {}) => {
    const propOpts = { ...this.props.options };
    const { id_gt, id_gte, id_lt, id_lte, offset } = extraOptions;
    if (id_gt || id_gte || id_lt || id_lte || offset != null) {
      delete propOpts.id_gt;
      delete propOpts.id_gte;
      delete propOpts.id_lt;
      delete propOpts.id_lte;
      delete propOpts.offset;
      // @ts-expect-error
      delete propOpts.refresh;
    }

    return {
      withReactionCounts: true,
      withOwnReactions: true,
      limit: 10,
      ...propOpts,
      ...extraOptions,
    };
  };

  doFeedRequest = async (options?: GetFeedOptions) => {
    if (this.props.doFeedRequest) {
      return await this.props.doFeedRequest(this.props.client, this.props.feedGroup, this.props.userId, options);
    }
    return await this.feed().get(options);
  };

  feed = () => this.props.client.feed(this.props.feedGroup, this.props.userId);

  responseToActivityMap = (
    response: FeedAPIResponse<UT, AT, CT, RT, CRT>,
  ): immutable.Map<string, immutable.Record<ResponseResult<UT, AT, CT, RT, CRT>>> =>
    immutable.fromJS(
      // @ts-expect-error
      response.results.reduce((map: Record<string, ResponseResult>, a: ResponseResult) => {
        map[a.id] = a;
        return map;
      }, {}),
    );

  responseToActivityIdToPath = (response: FeedAPIResponse<UT, AT, CT, RT, CRT>) => {
    if (response.results.length === 0 || response.results[0].activities === undefined) {
      return {};
    }
    const results = response.results as AggregatedActivityEnriched<UT, AT, CT, RT, CRT>[];

    const map: Record<string, Array<string | number>> = {};
    for (const group of results) {
      group.activities.forEach((act, i) => {
        map[act.id] = [group.id, 'activities', i];
      });
    }
    return map;
  };

  responseToActivityIdToPaths = (
    response: FeedAPIResponse<UT, AT, CT, RT, CRT>,
    previous: FeedManagerState['activityIdToPaths'] = {},
  ) => {
    const map = previous;
    const currentPath: Array<string | number> = [];
    function addFoundActivities(obj: ResponseResult | ResponseResult[]) {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          currentPath.push(i);
          addFoundActivities(v);
          currentPath.pop();
        });
      } else if (_isPlainObject(obj)) {
        // @ts-expect-error
        if (obj.id && obj.actor && obj.verb && obj.object) {
          if (!map[obj.id]) {
            map[obj.id] = [];
          }
          map[obj.id].push([...currentPath]);
        }
        for (const k in obj) {
          currentPath.push(k);
          // @ts-expect-error
          addFoundActivities(obj[k]);
          currentPath.pop();
        }
      }
    }

    for (const a of response.results) {
      currentPath.push(a.id);
      addFoundActivities(a);
      currentPath.pop();
    }
    return map;
  };

  feedResponseToReactionIdToPaths = (
    response: FeedAPIResponse<UT, AT, CT, RT, CRT>,
    previous: FeedManagerState['reactionIdToPaths'] = {},
  ) => {
    const map = previous;
    const currentPath: Array<string | number> = [];
    function addFoundReactions(obj: ResponseResult | ResponseResult[]) {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          currentPath.push(i);
          addFoundReactions(v);
          currentPath.pop();
        });
      } else if (_isPlainObject(obj)) {
        // @ts-expect-error
        if (obj.id && obj.kind && obj.data) {
          if (!map[obj.id]) {
            map[obj.id] = [];
          }
          map[obj.id].push([...currentPath]);
        }
        for (const k in obj) {
          currentPath.push(k);
          // @ts-expect-error
          addFoundReactions(obj[k]);
          currentPath.pop();
        }
      }
    }

    for (const a of response.results) {
      currentPath.push(a.id);
      addFoundReactions(a);
      currentPath.pop();
    }
    return map;
  };

  reactionResponseToReactionIdToPaths = (
    response: ReactionFilterAPIResponse<RT, CRT, AT, UT>,
    previous: FeedManagerState['reactionIdToPaths'],
    basePath: Array<string | number>,
    oldLength: number,
  ) => {
    const map = previous;
    const currentPath = [...basePath];
    function addFoundReactions(obj: EnrichedReaction | EnrichedReaction[]) {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          currentPath.push(i);
          addFoundReactions(v);
          currentPath.pop();
        });
      } else if (_isPlainObject(obj)) {
        if (obj.id && obj.kind && obj.data) {
          if (!map[obj.id]) {
            map[obj.id] = [];
          }
          map[obj.id].push([...currentPath]);
        }
        for (const k in obj) {
          currentPath.push(k);
          // @ts-expect-error
          addFoundReactions(obj[k]);
          currentPath.pop();
        }
      }
    }

    for (const a of response.results) {
      currentPath.push(oldLength);
      addFoundReactions(a as EnrichedReactionAPIResponse);
      currentPath.pop();
      oldLength++;
    }
    return map;
  };

  removeFoundReactionIdPaths = (
    data: EnrichedReaction | EnrichedReaction[],
    previous: FeedManagerState['reactionIdToPaths'],
    basePath: Array<string | number>,
  ) => {
    const map = previous;
    const currentPath = [...basePath];
    function removeFoundReactions(obj: EnrichedReaction | EnrichedReaction[]) {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          currentPath.push(i);
          removeFoundReactions(v);
          currentPath.pop();
        });
      } else if (_isPlainObject(obj)) {
        if (obj.id && obj.kind && obj.data) {
          if (!map[obj.id]) {
            map[obj.id] = [];
          }
          _remove(map[obj.id], (path) => _isEqual(path, currentPath));
        }
        for (const k in obj) {
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

  removeFoundActivityIdPaths = (
    data: ResponseResult | ResponseResult[],
    previous: FeedManagerState['activityIdToPaths'],
    basePath: Array<string | number>,
  ) => {
    const map = previous;
    const currentPath = [...basePath];
    function addFoundActivities(obj: ResponseResult | ResponseResult[]) {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          currentPath.push(i);
          addFoundActivities(v);
          currentPath.pop();
        });
      } else if (_isPlainObject(obj)) {
        if (obj.id && (obj as Activity).actor && obj.verb && (obj as Activity).object) {
          if (!map[obj.id]) {
            map[obj.id] = [];
          }
          _remove(map[obj.id], (path) => _isEqual(path, currentPath));
        }
        for (const k in obj) {
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

  removeFoundActivityIdPath = (
    data: ResponseResult[],
    previous: FeedManagerState['activityIdToPath'],
    basePath: Array<string | number>,
  ) => {
    const map = previous;
    const currentPath = [...basePath];
    data.forEach((obj, i) => {
      currentPath.push(i);
      if (_isEqual(map[obj.id], currentPath)) {
        delete map[obj.id];
      }
      currentPath.pop();
    });
    return map;
  };

  addFoundReactionIdPaths = (
    data: EnrichedReaction | EnrichedReaction[],
    previous: FeedManagerState['reactionIdToPaths'],
    basePath: Array<string | number>,
  ) => {
    const map = previous;
    const currentPath = [...basePath];
    function addFoundReactions(obj: EnrichedReaction | EnrichedReaction[]) {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          currentPath.push(i);
          addFoundReactions(v);
          currentPath.pop();
        });
      } else if (_isPlainObject(obj)) {
        if (obj.id && obj.kind && obj.data) {
          if (!map[obj.id]) {
            map[obj.id] = [];
          }
          map[obj.id].push([...currentPath]);
        }
        for (const k in obj) {
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

  addFoundActivityIdPaths = (
    data: ResponseResult | ResponseResult[],
    previous: FeedManagerState['activityIdToPaths'],
    basePath: Array<string | number>,
  ) => {
    const map = previous;
    const currentPath = [...basePath];
    function addFoundActivities(obj: ResponseResult | ResponseResult[]) {
      if (Array.isArray(obj)) {
        obj.forEach((v, i) => {
          currentPath.push(i);
          addFoundActivities(v);
          currentPath.pop();
        });
      } else if (_isPlainObject(obj)) {
        if (obj.id && (obj as Activity).actor && obj.verb && (obj as Activity).object) {
          if (!map[obj.id]) {
            map[obj.id] = [];
          }
          map[obj.id].push([...currentPath]);
        }
        for (const k in obj) {
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

  addFoundActivityIdPath = (
    data: ResponseResult[],
    previous: FeedManagerState['activityIdToPath'],
    basePath: Array<string | number>,
  ) => {
    const map = previous;
    data.forEach((obj, i) => {
      map[obj.id] = [...basePath, i];
    });
    return map;
  };

  responseToReactionActivities = (response: FeedAPIResponse<UT, AT, CT, RT, CRT>) => {
    if (response.results.length === 0) {
      return {};
    }

    const map: Record<string, string> = {};
    function setReactionActivities(activities: EnrichedActivity<UT, AT, CT, RT, CRT>[]) {
      for (const a of activities) {
        if (a.reaction && a.reaction.id) {
          map[a.reaction.id] = a.id;
        }
      }
    }

    if (response.results[0].activities === undefined) {
      setReactionActivities(response.results as EnrichedActivity<UT, AT, CT, RT, CRT>[]);
    } else {
      const aggregatedResults = response.results as AggregatedActivityEnriched<UT, AT, CT, RT, CRT>[];

      for (const group of aggregatedResults) {
        setReactionActivities(group.activities);
      }
    }
    return map;
  };

  unseenUnreadFromResponse(response: FeedAPIResponse<UT, AT, CT, RT, CRT>) {
    let unseen = 0;
    let unread = 0;
    if (typeof response.unseen === 'number') {
      unseen = response.unseen;
    }
    if (typeof response.unread === 'number') {
      unread = response.unread;
    }
    return { unseen, unread };
  }

  refresh = async (extraOptions?: GetFeedOptions) => {
    const options = this.getOptions(extraOptions);

    await this.setState({ refreshing: true });
    let response: FeedAPIResponse<UT, AT, CT, RT, CRT>;
    try {
      response = await this.doFeedRequest(options);
    } catch (e) {
      this.setState({ refreshing: false });
      this.props.errorHandler(e, 'get-feed', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }

    const newState = {
      activityOrder: response.results.map((a: ResponseResult) => a.id),
      activities: this.responseToActivityMap(response),
      activityIdToPath: this.responseToActivityIdToPath(response),
      activityIdToPaths: this.responseToActivityIdToPaths(response),
      reactionIdToPaths: this.feedResponseToReactionIdToPaths(response),
      reactionActivities: this.responseToReactionActivities(response),
      refreshing: false,
      lastResponse: response,
      realtimeAdds: [],
      realtimeDeletes: [],
      ...this.unseenUnreadFromResponse(response),
    };

    if (options.mark_seen === true) {
      newState.unseen = 0;
    }
    if (options.mark_read === true) {
      newState.unread = 0;
    }

    return this.setState(newState);
  };

  // TODO: deprecate async in next major release
  // eslint-disable-next-line require-await
  subscribe = async () => {
    if (!this.props.notify) return;

    const feed = this.feed();
    this.setState((prevState) => {
      if (prevState.subscription) return {};

      const subscription = feed.subscribe((data) => {
        this.setState((prevState) => {
          const numActivityDiff = data.new.length - data.deleted.length;

          return {
            realtimeAdds: prevState.realtimeAdds.concat(data.new),
            realtimeDeletes: prevState.realtimeDeletes.concat(data.deleted),
            unread: prevState.unread + numActivityDiff,
            unseen: prevState.unseen + numActivityDiff,
          };
        });
      });

      subscription.then(
        () => console.log(`now listening to changes in realtime for ${this.feed().id}`),
        (err) => console.error(err),
      );

      return { subscription };
    });
  };

  unsubscribe = async () => {
    const { subscription } = this.state;
    if (!subscription || this.registeredCallbacks.length) {
      return;
    }

    try {
      await subscription;

      this.setState({ subscription: null });

      // @ts-expect-error
      subscription?.cancel();

      console.log(`stopped listening to changes in realtime for ${this.feed().id}`);
    } catch (err) {
      console.error(err);
    }
  };

  hasNextPage = () => {
    const lastResponse = this.state.lastResponse;
    return Boolean(lastResponse && lastResponse.next);
  };

  hasReverseNextPage = () => {
    const { lastReverseResponse } = this.state;
    return Boolean(lastReverseResponse && lastReverseResponse.next);
  };

  loadNextPage = async () => {
    const lastResponse = this.state.lastResponse;
    if (!lastResponse || !lastResponse.next) {
      return;
    }
    let cancel = false;
    await this.setState((prevState) => {
      if (prevState.refreshing) {
        cancel = true;
        return {};
      }
      return { refreshing: true };
    });

    if (cancel) {
      return;
    }

    const nextURL = new URL(lastResponse.next, true);
    const options = this.getOptions(nextURL.query);

    let response: FeedAPIResponse<UT, AT, CT, RT, CRT>;
    try {
      response = await this.doFeedRequest(options);
    } catch (e) {
      this.setState({ refreshing: false });
      this.props.errorHandler(e, 'get-feed-next-page', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }

    return this.setState((prevState) => {
      const activities = prevState.activities.merge(this.responseToActivityMap(response));
      const activityIdToPath = {
        ...prevState.activityIdToPath,
        ...this.responseToActivityIdToPath(response),
      };

      return {
        activityOrder: prevState.activityOrder.concat(response.results.map((a: ResponseResult) => a.id)),
        activities,
        activityIdToPath,
        activityIdToPaths: this.responseToActivityIdToPaths(response, prevState.activityIdToPaths),
        reactionIdToPaths: this.feedResponseToReactionIdToPaths(response, prevState.reactionIdToPaths),
        reactionActivities: {
          ...prevState.reactionActivities,
          ...this.responseToReactionActivities(response),
        },
        refreshing: false,
        lastResponse: response,
      };
    });
  };

  loadReverseNextPage = async () => {
    const { lastReverseResponse } = this.state;
    if (!lastReverseResponse || !lastReverseResponse.next) {
      return;
    }
    let cancel = false;
    await this.setState((prevState) => {
      if (prevState.refreshing) {
        cancel = true;
        return {};
      }
      return { refreshing: true };
    });

    if (cancel) {
      return;
    }

    const nextURL = new URL(lastReverseResponse.next, true);
    const options = this.getOptions(nextURL.query);

    let response: FeedAPIResponse<UT, AT, CT, RT, CRT>;
    try {
      response = await this.doFeedRequest(options);
    } catch (e) {
      this.setState({ refreshing: false });
      this.props.errorHandler(e, 'get-feed-next-page', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }

    return this.setState((prevState) => {
      const activities = prevState.activities.merge(this.responseToActivityMap(response));
      const activityIdToPath = {
        ...prevState.activityIdToPath,
        ...this.responseToActivityIdToPath(response),
      };

      return {
        activityOrder: response.results.map((a: ResponseResult) => a.id).concat(prevState.activityOrder),
        activities,
        activityIdToPath,
        activityIdToPaths: this.responseToActivityIdToPaths(response, prevState.activityIdToPaths),
        reactionIdToPaths: this.feedResponseToReactionIdToPaths(response, prevState.reactionIdToPaths),
        reactionActivities: {
          ...prevState.reactionActivities,
          ...this.responseToReactionActivities(response),
        },
        refreshing: false,
        lastReverseResponse: response,
      };
    });
  };

  loadNextReactions = async (
    activityId: string,
    kind: string,
    activityPath?: Array<string | number>,
    oldestToNewest?: boolean,
  ) => {
    let options: { activity_id: string; kind: string; id_gt?: string } = { activity_id: activityId, kind };

    let orderPrefix = 'latest';
    if (oldestToNewest) {
      orderPrefix = 'oldest';
    }

    if (!activityPath) {
      activityPath = this.getActivityPath(activityId);
    }
    const latestReactionsPath = [...activityPath, orderPrefix + '_reactions', kind];
    const nextUrlPath = [...activityPath, orderPrefix + '_reactions_extra', kind, 'next'];
    const refreshingPath = [...activityPath, orderPrefix + '_reactions_extra', kind, 'refreshing'];

    const reactions_extra = this.state.activities.getIn([...activityPath, orderPrefix + '_reactions_extra']);
    let nextUrl = 'https://api.stream-io-api.com/';
    if (reactions_extra) {
      nextUrl = reactions_extra.getIn([kind, 'next'], '');
    } else if (oldestToNewest) {
      // If it's the first request and oldest to newest make sure
      // order is reversed by this trick with a non existant id.
      options.id_gt = 'non-existant-' + generateRandomId();
    }

    const refreshing = this.state.activities.getIn(refreshingPath, false);

    if (!nextUrl || refreshing) {
      return;
    }

    this.setState((prevState) => ({ activities: prevState.activities.setIn(refreshingPath, true) }));

    options = { ...URL(nextUrl, true).query, ...options };

    let response: ReactionFilterAPIResponse<RT, CRT, AT, UT>;
    try {
      if (this.props.doReactionsFilterRequest) {
        response = await this.props.doReactionsFilterRequest(options);
      } else {
        response = await this.props.client.reactions.filter(options);
      }
    } catch (e) {
      this.setState({ refreshing: false });
      this.props.errorHandler(e, 'get-reactions-next-page', { options });
      return;
    }
    this.setState((prevState) => ({
      activities: prevState.activities
        .setIn(refreshingPath, false)
        .setIn(nextUrlPath, response.next)
        .updateIn(latestReactionsPath, (v = immutable.List()) => v.concat(immutable.fromJS(response.results))),
      reactionIdToPaths: this.reactionResponseToReactionIdToPaths(
        response,
        prevState.reactionIdToPaths,
        latestReactionsPath,
        prevState.activities.getIn(latestReactionsPath, immutable.List()).toJS().length,
      ),
    }));
  };

  refreshUnreadUnseen = async () => {
    let response: FeedAPIResponse<UT, AT, CT, RT, CRT>;
    try {
      response = await this.doFeedRequest({ limit: 0 });
    } catch (e) {
      this.props.errorHandler(e, 'get-notification-counts', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    return this.setState(this.unseenUnreadFromResponse(response));
  };
}
