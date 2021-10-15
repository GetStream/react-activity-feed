import React, { PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  GetFeedOptions,
  ReactionAPIResponse,
  StreamClient,
  ReactionAddOptions,
  UR,
  Reaction,
  FeedAPIResponse,
  ReactionAddChildOptions,
  ReactionFilterAPIResponse,
  ReactionFilterConditions,
} from 'getstream';

import { FeedManager } from './FeedManager';
import { DefaultAT, DefaultUT, useStreamContext } from './StreamApp';

export type FeedContextValue<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
> = {
  feedGroup: string;
  feedManager: FeedManager<UT, AT, CT, RT, CRT, PT>;
  hasDoneRequest: boolean;
  hasNextPage: boolean;
  hasReverseNextPage: boolean;
  userId?: string;
} & Pick<
  FeedManager<UT, AT, CT, RT, CRT, PT>,
  | 'loadNextPage'
  | 'loadNextReactions'
  | 'loadReverseNextPage'
  | 'onAddChildReaction'
  | 'onAddReaction'
  | 'onMarkAsRead'
  | 'onMarkAsSeen'
  | 'onRemoveActivity'
  | 'onRemoveChildReaction'
  | 'onRemoveReaction'
  | 'onToggleChildReaction'
  | 'onToggleReaction'
  | 'getActivityPath'
  | 'refresh'
  | 'refreshUnreadUnseen'
> &
  Pick<
    FeedManager<UT, AT, CT, RT, CRT, PT>['state'],
    'activities' | 'activityOrder' | 'realtimeAdds' | 'realtimeDeletes' | 'refreshing' | 'unread' | 'unseen'
  >;

type DeleteRequestFn = (id: string) => Promise<void | unknown>;

export type FeedProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
> = {
  /** The feed group part of the feed */
  feedGroup: string;
  /** The location that should be used for analytics when liking in the feed,
   * this is only useful when you have analytics enabled for your app. */
  analyticsLocation?: string;
  /** Override activity delete request */
  /* Components to display in the feed */
  children?: React.ReactNode;
  doActivityDeleteRequest?: DeleteRequestFn;
  /** Override child reaction add request */
  doChildReactionAddRequest?: (
    kind: string,
    reaction: Reaction<RT>,
    data?: CRT,
    options?: ReactionAddChildOptions,
  ) => Promise<ReactionAPIResponse<CRT>>;
  /** Override child reaction delete request */
  doChildReactionDeleteRequest?: DeleteRequestFn;
  /** The feed read handler (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    client: StreamClient<UT, AT, CT, RT, CRT, PT>,
    feedGroup: string,
    userId?: string,
    options?: GetFeedOptions,
  ) => Promise<FeedAPIResponse<UT, AT, CT, RT, CRT>>;
  /** Override reaction add request */
  doReactionAddRequest?: (
    kind: string,
    activity: Activity<AT>,
    data?: RT,
    options?: ReactionAddOptions,
  ) => Promise<ReactionAPIResponse<RT>>;
  /** Override reaction delete request */
  doReactionDeleteRequest?: DeleteRequestFn;
  /** Override reactions filter request */
  doReactionsFilterRequest?: (options: ReactionFilterConditions) => Promise<ReactionFilterAPIResponse<RT, CRT, AT, UT>>;
  /** If true, feed shows the Notifier component when new activities are added */
  notify?: boolean;
  /** Read options for the API client (eg. limit, ranking, ...) */
  options?: GetFeedOptions;
  /** The user_id part of the feed */
  userId?: string;
};

export const FeedContext = React.createContext<FeedContextValue | UR>({});

export const FeedProvider = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  children,
  value,
}: PropsWithChildren<{
  value: FeedContextValue<UT, AT, CT, RT, CRT, PT>;
}>) => <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;

export const useFeedContext = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>() => useContext(FeedContext) as FeedContextValue<UT, AT, CT, RT, CRT, PT>;

export function Feed<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>(props: FeedProps<UT, AT, CT, RT, CRT, PT>) {
  const { analyticsClient, client, user, errorHandler, sharedFeedManagers } = useStreamContext<
    UT,
    AT,
    CT,
    RT,
    CRT,
    PT
  >();
  const { feedGroup, userId, children } = props;
  const [, setForceUpdateState] = useState(0);

  const manager = useMemo(() => {
    if (!client) return null;
    // const clientDifferent = this.props.client !== prevProps.client;
    // const notifyDifferent = this.props.notify !== prevProps.notify;
    // const feedDifferent = this.props.userId !== prevProps.userId || this.props.feedGroup !== prevProps.feedGroup;
    // const optionsDifferent = !_isEqual(this.props.options, prevProps.options);
    // if (clientDifferent || feedDifferent || optionsDifferent || notifyDifferent)
    //   TODO: Implement
    const feedId = client.feed(feedGroup, userId).id;
    return (
      sharedFeedManagers[feedId] ||
      new FeedManager<UT, AT, CT, RT, CRT, PT>({ ...props, analyticsClient, client, user, errorHandler })
    );
  }, [feedGroup, userId]);

  useEffect(() => {
    const forceUpdate = () => setForceUpdateState((prevState) => prevState + 1);
    manager?.register(forceUpdate);
    return () => manager?.unregister(forceUpdate);
  }, [manager]);

  if (!manager) return null;

  const ctx = {
    feedGroup,
    userId,
    feedManager: manager,
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
    refresh: manager.refresh,
    refreshUnreadUnseen: manager.refreshUnreadUnseen,
    loadNextReactions: manager.loadNextReactions,
    loadNextPage: manager.loadNextPage,
    hasNextPage: manager.hasNextPage(),
    loadReverseNextPage: manager.loadReverseNextPage,
    hasReverseNextPage: manager.hasReverseNextPage(),
    activityOrder: manager.state.activityOrder,
    activities: manager.state.activities,
    realtimeAdds: manager.state.realtimeAdds,
    realtimeDeletes: manager.state.realtimeDeletes,
    refreshing: manager.state.refreshing,
    unread: manager.state.unread,
    unseen: manager.state.unseen,
    hasDoneRequest: manager.state.lastResponse != null,
  };

  return <FeedProvider value={ctx}>{children}</FeedProvider>;
}
