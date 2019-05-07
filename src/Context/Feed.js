// @flow

import * as React from 'react';
import _isEqual from 'lodash/isEqual';

import type { FeedRequestOptions, FeedResponse } from 'getstream';
import type {
  BaseActivityResponse,
  BaseActivityGroupResponse,
  BaseAppCtx,
  BaseClient,
  BaseReaction,
  ToggleReactionCallbackFunction,
  AddReactionCallbackFunction,
  RemoveReactionCallbackFunction,
  ToggleChildReactionCallbackFunction,
  AddChildReactionCallbackFunction,
  RemoveChildReactionCallbackFunction,
} from '../types';
import type { AppCtx } from './StreamApp';
import { StreamApp } from './StreamApp';
import { FeedManager } from './FeedManager';

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
  loadNextReactions: (
    activityId: string,
    kind: string,
    activityPath?: ?Array<string>,
    oldestToNewest?: boolean,
  ) => Promise<mixed>,
  loadNextPage: () => Promise<mixed>,
  hasNextPage: boolean,
  loadReverseNextPage: () => Promise<mixed>,
  hasReverseNextPage: boolean,
  refreshing: boolean,
  hasDoneRequest: boolean,
  realtimeAdds: Array<{}>,
  realtimeDeletes: Array<{}>,
  onToggleReaction: ToggleReactionCallbackFunction,
  onAddReaction: AddReactionCallbackFunction,
  onRemoveReaction: RemoveReactionCallbackFunction,
  onToggleChildReaction: ToggleChildReactionCallbackFunction,
  onAddChildReaction: AddChildReactionCallbackFunction,
  onRemoveChildReaction: RemoveChildReactionCallbackFunction,
  onRemoveActivity: (activityId: string) => Promise<mixed>,
  onMarkAsRead: (
    group:
      | true
      | BaseActivityGroupResponse
      | $ReadOnlyArray<BaseActivityGroupResponse>,
  ) => Promise<mixed>,
  onMarkAsSeen: (
    group:
      | true
      | BaseActivityGroupResponse
      | $ReadOnlyArray<BaseActivityGroupResponse>,
  ) => Promise<mixed>,
  getActivityPath: (
    activity: BaseActivityResponse | string,
    ...Array<string>
  ) => Array<string>,
|};

export type FeedProps = {|
  /** The feed group part of the feed */
  feedGroup: string,
  /** The user_id part of the feed */
  userId?: string,
  /** Read options for the API client (eg. limit, ranking, ...) */
  options?: FeedRequestOptions,
  /** If true, feed shows the Notifier component when new activities are added */
  notify?: boolean,
  /** The feed read handler (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    client: BaseClient,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<{}, {}>>,
  /** Override activity delete request */
  doActivityDeleteRequest?: (id: string) => mixed,
  /* Components to display in the feed */
  children?: React.Node,
  /** Override reaction add request */
  doReactionAddRequest?: (
    kind: string,
    activity: BaseActivityResponse,
    data?: {},
    options: {},
  ) => mixed,
  /** Override reaction delete request */
  doReactionDeleteRequest?: (id: string) => mixed,
  /** Override child reaction add request */
  doChildReactionAddRequest?: (
    kind: string,
    activity: BaseReaction,
    data?: {},
    options: {},
  ) => mixed,
  /** Override child reaction delete request */
  doChildReactionDeleteRequest?: (id: string) => mixed,
  /** Override reactions filter request */
  doReactionsFilterRequest?: (options: {}) => Promise<Object>,
  /** The location that should be used for analytics when liking in the feed,
   * this is only useful when you have analytics enabled for your app. */
  analyticsLocation?: string,
|};

export class Feed extends React.Component<FeedProps> {
  // Used to avoid unmount-remount behaviour, which causes
  // unsubscribe-subscribe behaviour.
  _appCtxWrapperFunc = (appCtx: AppCtx<any>) => (
    <FeedInner {...this.props} {...appCtx} />
  );

  render() {
    return <StreamApp.Consumer>{this._appCtxWrapperFunc}</StreamApp.Consumer>;
  }
}

export type FeedInnerProps = {| ...FeedProps, ...BaseAppCtx |};

type FeedState = {|
  manager: FeedManager,
|};

class FeedInner extends React.Component<FeedInnerProps, FeedState> {
  constructor(props: FeedInnerProps) {
    super(props);
    const feedId = props.client.feed(props.feedGroup, props.userId).id;
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
    const clientDifferent = this.props.client !== prevProps.client;
    const notifyDifferent = this.props.notify !== prevProps.notify;
    const feedDifferent =
      this.props.userId !== prevProps.userId ||
      this.props.feedGroup !== prevProps.feedGroup;
    const optionsDifferent = !_isEqual(this.props.options, prevProps.options);
    const doFeedRequestDifferent =
      this.props.doFeedRequest !== prevProps.doFeedRequest;

    if (
      clientDifferent ||
      feedDifferent ||
      optionsDifferent ||
      doFeedRequestDifferent
    ) {
      // TODO: Implement
    }
    if (clientDifferent || feedDifferent || notifyDifferent) {
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
      onToggleChildReaction: manager.onToggleChildReaction,
      onAddChildReaction: manager.onAddChildReaction,
      onRemoveChildReaction: manager.onRemoveChildReaction,
      onRemoveActivity: manager.onRemoveActivity,
      onMarkAsRead: manager.onMarkAsRead,
      onMarkAsSeen: manager.onMarkAsSeen,
      hasDoneRequest: state.lastResponse != null,
      refresh: manager.refresh,
      refreshUnreadUnseen: manager.refreshUnreadUnseen,
      loadNextReactions: manager.loadNextReactions,
      loadNextPage: manager.loadNextPage,
      hasNextPage: manager.hasNextPage(),
      loadReverseNextPage: manager.loadReverseNextPage,
      hasReverseNextPage: manager.hasReverseNextPage(),
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
