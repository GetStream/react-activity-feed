// @flow

import * as React from 'react';
import immutable from 'immutable';
import stream from 'getstream';
import URL from 'url-parse';
import _ from 'lodash';

import StreamAnalytics from 'stream-analytics';
import type {
  StreamCloudClient,
  StreamUser,
  StreamUserSession,
} from 'getstream';

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
  ErrorHandler,
} from './types';

import { handleError } from './errors';

export const StreamContext = React.createContext({
  changedUserData: () => {},
  sharedFeedManagers: {},
});

export type AppCtx<UserData> = {|
  session: StreamUserSession<UserData>,
  user: StreamUser<UserData>,
  // We cannot simply take userData from user.data, since the reference to user
  // will stay the same all the time. Because of this react won't notice that
  // the internal fields changed so it thinks it doesn't need to rerender.
  userData: ?UserData,
  changedUserData: () => void,
  changeNotificationCounts?: any,
  analyticsClient?: any,
  sharedFeedManagers: { [string]: FeedManager },
  errorHandler: ErrorHandler,
|};

type StreamAppProps<UserData> = {|
  appId: string,
  apiKey: string,
  token: string,
  options?: {},
  analyticsToken?: string,
  sharedFeeds: Array<FeedProps>,
  defaultUserData?: UserData,
  errorHandler: ErrorHandler,
  children?: React.Node,
|};

type StreamAppState<UserData> = AppCtx<UserData>;

export class StreamApp extends React.Component<
  StreamAppProps<Object>,
  StreamAppState<Object>,
> {
  static defaultProps = {
    sharedFeeds: [
      {
        feedGroup: 'notification',
        notify: true,
        options: { mark_seen: true },
      },
    ],
    errorHandler: handleError,
  };

  static Consumer = function StreamAppConsumer(props: {
    children?: (AppCtx<any>) => ?React.Element<any>,
  }) {
    return (
      <StreamContext.Consumer>
        {(appCtx) => {
          if (!props.children || !props.children.length) {
            return null;
          }
          if (!appCtx.session || !appCtx.user) {
            throw new Error(
              'This component should be a child of a StreamApp component',
            );
          }
          const Child = props.children;
          return Child(appCtx);
        }}
      </StreamContext.Consumer>
    );
  };

  constructor(props: StreamAppProps<Object>) {
    super(props);

    const client: StreamCloudClient<Object> = stream.connectCloud(
      this.props.apiKey,
      this.props.appId,
      this.props.options || {},
    );

    const session = client.createUserSession(this.props.token);

    let analyticsClient;
    if (this.props.analyticsToken) {
      analyticsClient = new StreamAnalytics({
        apiKey: this.props.apiKey,
        token: this.props.analyticsToken,
      });
      analyticsClient.setUser(session.userId);
    }
    this.state = {
      session,
      user: session.user,
      userData: session.user.data,
      changedUserData: () => {
        this.setState({ userData: this.state.user.data });
      },
      analyticsClient,
      sharedFeedManagers: {},
      errorHandler: this.props.errorHandler,
    };
    for (const feedProps of this.props.sharedFeeds) {
      const manager = new FeedManager({
        ...feedProps,
        ...this.state,
      });
      this.state.sharedFeedManagers[manager.feed().id] = manager;
    }
  }

  componentDidUpdate(prevProps: StreamAppProps<Object>) {
    const appIdDifferent = this.props.appId !== prevProps.appId;
    if (appIdDifferent) {
      //TODO: Implement
    }
  }

  async componentDidMount() {
    try {
      await this.state.user.getOrCreate(this.props.defaultUserData || {});
    } catch (e) {
      this.props.errorHandler(e, 'get-user-info', {
        userId: this.state.user.id,
      });
      return;
    }
    this.state.changedUserData();
  }

  render() {
    return (
      <StreamContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </StreamContext.Provider>
    );
  }
}

export const FeedContext = React.createContext({});

export type FeedCtx = {|
  feedGroup: string,
  userId?: string,
  activityOrder: Array<string>,
  activities: any,
  unread: number,
  unseen: number,
  refresh: (extraOptions?: FeedRequestOptions) => Promise<mixed>,
  refreshUnreadUnseen: () => Promise<mixed>,
  loadNextPage: () => Promise<mixed>,
  hasNextPage: boolean,
  refreshing: boolean,
  realtimeAdds: Array<{}>,
  realtimeDeletes: Array<{}>,
  onToggleReaction: ToggleReactionCallbackFunction,
  onAddReaction: AddReactionCallbackFunction,
  onRemoveReaction: RemoveReactionCallbackFunction,
|};

type FeedProps = {|
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
  ) => Promise<FeedResponse<Object, Object>>,
  children?: React.Node,
|};

type FeedManagerState = {|
  activityOrder: Array<string>,
  activities: any,
  refreshing: boolean,
  lastResponse: ?FeedResponse<{}, {}>,
  realtimeAdds: Array<{}>,
  realtimeDeletes: Array<{}>,
  subscription: ?any,
  activityIdToPath: { [string]: Array<string> },
  unread: number,
  unseen: number,
  numSubscribers: number,
  reactionsBeingToggled: { [kind: string]: { [activityId: string]: boolean } },
|};

class FeedManager {
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

  constructor(props) {
    this.props = props;
    this.registeredCallbacks = [];
  }

  register(callback) {
    this.registeredCallbacks.push(callback);
    this.subscribe();
  }
  unregister(callback) {
    this.registeredCallbacks.splice(this.registeredCallbacks.indexOf(callback));
    this.unsubscribe();
  }

  triggerUpdate() {
    for (const callback of this.registeredCallbacks) {
      callback();
    }
  }

  setState = (changed) => {
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

  _getActivityPath(activity, ...rest) {
    const activityPath = this.state.activityIdToPath[activity.id];
    if (activityPath === undefined) {
      return [activity.id, ...rest];
    }
    return [...activityPath, ...rest];
  }

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
          this._getActivityPath(activity, 'reaction_counts', kind),
          (v = 0) => v + 1,
        )
        .updateIn(
          this._getActivityPath(activity, 'own_reactions', kind),
          (v = immutable.List()) => v.unshift(enrichedReaction),
        )
        .updateIn(
          this._getActivityPath(activity, 'latest_reactions', kind),
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
          this._getActivityPath(activity, 'reaction_counts', kind),
          (v = 0) => v - 1,
        )
        .updateIn(
          this._getActivityPath(activity, 'own_reactions', kind),
          (v = immutable.List()) =>
            v.remove(v.findIndex((r) => r.get('id') === id)),
        )
        .updateIn(
          this._getActivityPath(activity, 'latest_reactions', kind),
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
      this._getActivityPath(activity, 'own_reactions', kind),
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

  getOptions = (extraOptions?: FeedRequestOptions): FeedRequestOptions => ({
    withReactionCounts: true,
    withOwnReactions: true,
    limit: 10,
    ...this.props.options,
    ...extraOptions,
  });

  doFeedRequest = (options: FeedRequestOptions) => {
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

  responseToActivityMap = (response) =>
    immutable.fromJS(
      response.results.reduce((map, a) => {
        map[a.id] = a;
        return map;
      }, {}),
    );

  responseToActivityIdToPath = (response) => {
    if (
      !response.results.length ||
      response.results[0].activities === undefined
    ) {
      return {};
    }
    const map = {};
    for (const group of response.results) {
      group.activities.forEach((act, i) => {
        map[act.id] = [group.id, 'activities', i];
      });
    }
    return map;
  };

  refresh = async (extraOptions) => {
    const options = this.getOptions(extraOptions);

    await this.setState({ refreshing: true });
    let response;
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
      unread: response.unread || 0,
      unseen: response.unseen || 0,
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

    let response;
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

  refreshUnreadUnseen = async () => {
    let response;
    try {
      response = await this.doFeedRequest({ limit: 1 });
    } catch (e) {
      this.props.errorHandler(e, 'get-notification-counts', {
        feedGroup: this.props.feedGroup,
        userId: this.props.userId,
      });
      return;
    }
    return this.setState({
      unread: response.unread || 0,
      unseen: response.unseen || 0,
    });
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
      onToggleReaction: manager.onToggleReaction,
      onAddReaction: manager.onAddReaction,
      onRemoveReaction: manager.onRemoveReaction,
      refresh: manager.refresh,
      refreshUnreadUnseen: manager.refreshUnreadUnseen,
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
