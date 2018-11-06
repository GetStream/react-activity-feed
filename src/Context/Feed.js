// @flow

import * as React from 'react';
import immutable from 'immutable';
import URL from 'url-parse';
import _ from 'lodash';
import type {
  FeedRequestOptions,
  FeedResponse,
  ReactionRequestOptions,
} from 'getstream';
import type {
  BaseActivityResponse,
  BaseAppCtx,
  BaseUserSession,
  ToggleReactionCallbackFunction,
  AddReactionCallbackFunction,
  RemoveReactionCallbackFunction,
} from '../types';

import type { AppCtx } from './StreamApp';
import { StreamApp } from './StreamApp';

export const FeedContext = React.createContext({});

// type FR = FeedResponse<Object, Object>;
type FR = FeedResponse<{}, {}>;
export type FeedCtx = {|
  feedGroup: string,
  userId?: string,
  activityOrder: Array<string>,
  activities: any,
  unread: number,
  unseen: number,
  refresh: (extraOptions?: FeedRequestOptions) => Promise<mixed>,
  refreshUnreadUnseen: () => Promise<mixed>,
  loadNextReactions: (activityId: string, kind: string) => Promise<mixed>,
  loadNextPage: () => Promise<mixed>,
  hasNextPage: boolean,
  refreshing: boolean,
  realtimeAdds: Array<{}>,
  realtimeDeletes: Array<{}>,
  onToggleReaction: ToggleReactionCallbackFunction,
  onAddReaction: AddReactionCallbackFunction,
  onRemoveReaction: RemoveReactionCallbackFunction,
  onRemoveActivity: (activityId: string, kind: string) => Promise<mixed>,
  getActivityPath: (
    activity: BaseActivityResponse | string,
    ...Array<string>
  ) => Array<string>,
|};

export type FeedProps = {|
  feedGroup: string,
  userId?: string,
  options?: FeedRequestOptions,
  analyticsLocation?: string,
  notify?: boolean,
  //** the feed read hander (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    session: BaseUserSession,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<{}, {}>>,
  children?: React.Node,
|};

type FeedManagerState = {|
  activityOrder: Array<string>,
  activities: any,
  refreshing: boolean,
  lastResponse: ?FR,
  realtimeAdds: Array<{}>,
  realtimeDeletes: Array<{}>,
  subscription: ?any,
  activityIdToPath: { [string]: Array<string> },
  unread: number,
  unseen: number,
  numSubscribers: number,
  reactionsBeingToggled: { [kind: string]: { [activityId: string]: boolean } },
|};

export class FeedManager {
  props: FeedInnerProps;
  state: FeedManagerState = {
    activityOrder: [],
    activities: immutable.Map(),
    activityIdToPath: {},
    lastResponse: null,
    refreshing: false,
    realtimeAdds: [],
    realtimeDeletes: [],
    subscription: null,
    unread: 0,
    unseen: 0,
    numSubscribers: 0,
    reactionsBeingToggled: {},
  };
  registeredCallbacks: Array<() => mixed>;

  constructor(props: FeedInnerProps) {
    this.props = props;
    this.registeredCallbacks = [];
  }

  register(callback: () => mixed) {
    this.registeredCallbacks.push(callback);
    this.subscribe();
  }
  unregister(callback: () => mixed) {
    this.registeredCallbacks.splice(this.registeredCallbacks.indexOf(callback));
    this.unsubscribe();
  }

  triggerUpdate() {
    for (const callback of this.registeredCallbacks) {
      callback();
    }
  }

  setState = (
    changed:
      | $Shape<FeedManagerState>
      | ((FeedManagerState) => $Shape<FeedManagerState>),
  ) => {
    if (typeof changed === 'function') {
      changed = changed(this.state);
    }
    this.state = { ...this.state, ...changed };
    this.triggerUpdate();
  };

  trackAnalytics = (
    label: string,
    activity: BaseActivityResponse,
    track: ?boolean,
  ) => {
    const analyticsClient = this.props.analyticsClient;

    if (!track || !analyticsClient) {
      return;
    }

    const feed = this.props.session.feed(
      this.props.feedGroup,
      this.props.userId,
    );

    analyticsClient.trackEngagement({
      label,
      feed_id: feed.id,
      content: {
        foreign_id: activity.foreign_id,
      },
      location: this.props.analyticsLocation,
    });
  };

  getActivityPath = (
    activity: BaseActivityResponse | string,
    ...rest: Array<string>
  ) => {
    let activityId;
    if (typeof activity === 'string') {
      activityId = activity;
    } else {
      activityId = activity.id;
    }

    const activityPath = this.state.activityIdToPath[activityId];
    if (activityPath === undefined) {
      return [activityId, ...rest];
    }
    return [...activityPath, ...rest];
  };

  onAddReaction = async (
    kind: string,
    activity: BaseActivityResponse,
    options: { trackAnalytics?: boolean } & ReactionRequestOptions<{}> = {},
  ) => {
    let reaction;
    try {
      reaction = await this.props.session.react(kind, activity, options);
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
    const enrichedReaction = immutable.fromJS({
      ...reaction,
      user: this.props.user.full,
    });

    this.setState((prevState) => {
      const activities = prevState.activities
        .updateIn(
          this.getActivityPath(activity, 'reaction_counts', kind),
          (v = 0) => v + 1,
        )
        .updateIn(
          this.getActivityPath(activity, 'own_reactions', kind),
          (v = immutable.List()) => v.unshift(enrichedReaction),
        )
        .updateIn(
          this.getActivityPath(activity, 'latest_reactions', kind),
          (v = immutable.List()) => v.unshift(enrichedReaction),
        );

      return { activities };
    });
  };

  onRemoveReaction = async (
    kind: string,
    activity: BaseActivityResponse,
    id: string,
    options: { trackAnalytics?: boolean } = {},
  ) => {
    try {
      await this.props.session.reactions.delete(id);
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

    return this.setState((prevState) => {
      const activities = prevState.activities
        .updateIn(
          this.getActivityPath(activity, 'reaction_counts', kind),
          (v = 0) => v - 1,
        )
        .updateIn(
          this.getActivityPath(activity, 'own_reactions', kind),
          (v = immutable.List()) =>
            v.remove(v.findIndex((r) => r.get('id') === id)),
        )
        .updateIn(
          this.getActivityPath(activity, 'latest_reactions', kind),
          (v = immutable.List()) =>
            v.remove(v.findIndex((r) => r.get('id') === id)),
        );
      return { activities };
    });
  };

  onToggleReaction = async (
    kind: string,
    activity: BaseActivityResponse,
    options: { trackAnalytics?: boolean } & ReactionRequestOptions<{}> = {},
  ) => {
    const togglingReactions = this.state.reactionsBeingToggled[kind] || {};
    if (togglingReactions[activity.id]) {
      return;
    }
    togglingReactions[activity.id] = true;
    this.state.reactionsBeingToggled[kind] = togglingReactions;

    const currentReactions = this.state.activities.getIn(
      this.getActivityPath(activity, 'own_reactions', kind),
      immutable.List(),
    );

    const last = currentReactions.last();
    if (last) {
      await this.onRemoveReaction(kind, activity, last.get('id'), options);
    } else {
      await this.onAddReaction(kind, activity, options);
    }
    delete togglingReactions[activity.id];
  };

  onRemoveActivity = async (activityId: string) => {
    try {
      await this.feed().removeActivity(activityId);
    } catch (e) {
      this.props.errorHandler(e, 'delete-activity', {
        activityId: this.props.feedGroup,
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    return this.setState((prevState) => {
      const activities = prevState.activities.removeIn(
        this.getActivityPath(activityId),
        (v = 0) => v - 1,
      );
      const activityOrder = prevState.activityOrder.filter(
        (id) => id !== activityId,
      );
      return { activities, activityOrder };
    });
  };

  getOptions = (extraOptions?: FeedRequestOptions): FeedRequestOptions => ({
    withReactionCounts: true,
    withOwnReactions: true,
    limit: 10,
    ...this.props.options,
    ...extraOptions,
  });

  doFeedRequest = (options: FeedRequestOptions): Promise<FR> => {
    if (this.props.doFeedRequest) {
      return this.props.doFeedRequest(
        this.props.session,
        this.props.feedGroup,
        this.props.userId,
        options,
      );
    }
    return this.feed().get(options);
  };

  feed = () => this.props.session.feed(this.props.feedGroup, this.props.userId);

  responseToActivityMap = (response: FR) =>
    immutable.fromJS(
      response.results.reduce((map, a) => {
        map[a.id] = a;
        return map;
      }, {}),
    );

  responseToActivityIdToPath = (response: FR) => {
    if (
      response.results.length === 0 ||
      response.results[0].activities === undefined
    ) {
      return {};
    }
    const aggregatedResponse = (response: any);

    const map = {};
    for (const group of aggregatedResponse.results) {
      group.activities.forEach((act, i) => {
        map[act.id] = [group.id, 'activities', i];
      });
    }
    return map;
  };

  unseenUnreadFromResponse(response: FR) {
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

  refresh = async (extraOptions: FeedRequestOptions) => {
    const options = this.getOptions(extraOptions);

    await this.setState({ refreshing: true });
    let response: FR;
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
      activityOrder: response.results.map((a) => a.id),
      activities: this.responseToActivityMap(response),
      activityIdToPath: this.responseToActivityIdToPath(response),
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

  subscribe = async () => {
    if (this.props.notify) {
      const feed = this.feed();
      await this.setState((prevState) => {
        if (prevState.subscription) {
          return {};
        }
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
          () => {
            console.log(
              `now listening to changes in realtime for ${this.feed().id}`,
            );
          },
          (err) => {
            console.error(err);
          },
        );
        return { subscription };
      });
    }
  };

  unsubscribe = async () => {
    const { subscription } = this.state;
    if (!subscription) {
      return;
    }
    await subscription;
    if (this.registeredCallbacks.length === 0) {
      try {
        await subscription.cancel();
        console.log(
          `stopped listening to changes in realtime for ${this.feed().id}`,
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  hasNextPage = () => {
    const lastResponse = this.state.lastResponse;
    return Boolean(lastResponse && lastResponse.next);
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

    let response: FR;
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
      const activities = prevState.activities.merge(
        this.responseToActivityMap(response),
      );
      const activityIdToPath = {
        ...prevState.activityIdToPath,
        ...this.responseToActivityIdToPath(response),
      };
      return {
        activityOrder: prevState.activityOrder.concat(
          response.results.map((a) => a.id),
        ),
        activities,
        activityIdToPath,
        refreshing: false,
        lastResponse: response,
      };
    });
  };

  loadNextReactions = async (activityId: string, kind: string) => {
    const nextUrlPath = this.getActivityPath(
      activityId,
      'latest_reactions_extra',
      kind,
      'next',
    );
    const refreshingPath = this.getActivityPath(
      activityId,
      'latest_reactions_extra',
      kind,
      'refreshing',
    );
    const nextUrl = this.state.activities.getIn(nextUrlPath, '');
    const refreshing = this.state.activities.getIn(refreshingPath, false);

    if (!nextUrl || refreshing) {
      return;
    }

    this.setState((prevState) => ({
      activities: prevState.activities.setIn(refreshingPath, true),
    }));

    const options = {
      ...URL(nextUrl, true).query,
      activity_id: activityId,
      kind,
    };

    let response;
    try {
      response = await this.props.session.reactions.filter(options);
    } catch (e) {
      this.setState({ refreshing: false });
      this.props.errorHandler(e, 'get-reactions-next-page', {
        options,
      });
      return;
    }
    this.setState((prevState) => ({
      activities: prevState.activities
        .setIn(refreshingPath, false)
        .setIn(nextUrlPath, response.next)
        .updateIn(
          this.getActivityPath(activityId, 'latest_reactions', kind),
          (v = immutable.List()) =>
            v.concat(immutable.fromJS(response.results)),
        ),
    }));
  };

  refreshUnreadUnseen = async () => {
    let response: FR;
    try {
      response = await this.doFeedRequest({ limit: 1 });
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

type FeedState = {|
  manager: FeedManager,
|};

export class Feed extends React.Component<FeedProps, FeedState> {
  // Used to avoid unmount-remount behaviour, which causes
  // unsubscribe-subscribe behaviour.
  _appCtxWrapperFunc = (appCtx: AppCtx<any>) => (
    <FeedInner {...this.props} {...appCtx} />
  );

  render() {
    return <StreamApp.Consumer>{this._appCtxWrapperFunc}</StreamApp.Consumer>;
  }
}

type FeedInnerProps = {| ...FeedProps, ...BaseAppCtx |};
class FeedInner extends React.Component<FeedInnerProps, FeedState> {
  constructor(props: FeedInnerProps) {
    super(props);
    const feedId = props.session.feed(props.feedGroup, props.userId).id;
    let manager = props.sharedFeedManagers[feedId];
    if (!manager) {
      manager = new FeedManager(props);
    }

    this.state = {
      manager,
    };
  }
  boundForceUpdate = () => this.forceUpdate();

  componentDidMount() {
    return this.state.manager.register(this.boundForceUpdate);
  }

  componentDidUpdate(prevProps) {
    const sessionDifferent = this.props.session !== prevProps.session;
    const notifyDifferent = this.props.notify !== prevProps.notify;
    const feedDifferent =
      this.props.userId !== prevProps.userId ||
      this.props.feedGroup !== prevProps.feedGroup;
    const optionsDifferent = !_.isEqual(this.props.options, prevProps.options);
    const doFeedRequestDifferent =
      this.props.doFeedRequest !== prevProps.doFeedRequest;

    if (
      sessionDifferent ||
      feedDifferent ||
      optionsDifferent ||
      doFeedRequestDifferent
    ) {
      // TODO: Implement
    }
    if (sessionDifferent || feedDifferent || notifyDifferent) {
      // TODO: Implement
    }
  }

  componentWillUnmount() {
    return this.state.manager.unregister(this.boundForceUpdate);
  }

  getCtx = () => {
    const { manager } = this.state;
    const state = manager.state;
    return {
      getActivityPath: manager.getActivityPath,
      onToggleReaction: manager.onToggleReaction,
      onAddReaction: manager.onAddReaction,
      onRemoveReaction: manager.onRemoveReaction,
      onRemoveActivity: manager.onRemoveActivity,
      refresh: manager.refresh,
      refreshUnreadUnseen: manager.refreshUnreadUnseen,
      loadNextReactions: manager.loadNextReactions,
      loadNextPage: manager.loadNextPage,
      hasNextPage: manager.hasNextPage(),
      feedGroup: this.props.feedGroup,
      userId: this.props.userId,
      activityOrder: state.activityOrder,
      activities: state.activities,
      realtimeAdds: state.realtimeAdds,
      realtimeDeletes: state.realtimeDeletes,
      refreshing: state.refreshing,
      unread: state.unread,
      unseen: state.unseen,
    };
  };

  render() {
    return (
      <FeedContext.Provider value={this.getCtx()}>
        {this.props.children}
      </FeedContext.Provider>
    );
  }
}
