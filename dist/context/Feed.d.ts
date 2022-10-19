import React, { PropsWithChildren } from 'react';
import { Activity, GetFeedOptions, ReactionAPIResponse, StreamClient, ReactionAddOptions, UR, Reaction, FeedAPIResponse, ReactionAddChildOptions, ReactionFilterAPIResponse, ReactionFilterConditions } from 'getstream';
import { FeedManager } from './FeedManager';
import { DefaultAT, DefaultUT } from './StreamApp';
export declare type FeedContextValue<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = {
    feedGroup: string;
    feedManager: FeedManager<UT, AT, CT, RT, CRT, PT>;
    hasDoneRequest: boolean;
    hasNextPage: boolean;
    hasReverseNextPage: boolean;
    userId?: string;
} & Pick<FeedManager<UT, AT, CT, RT, CRT, PT>, 'loadNextPage' | 'loadNextReactions' | 'loadReverseNextPage' | 'onAddChildReaction' | 'onAddReaction' | 'onMarkAsRead' | 'onMarkAsSeen' | 'onRemoveActivity' | 'onRemoveChildReaction' | 'onRemoveReaction' | 'onToggleChildReaction' | 'onToggleReaction' | 'getActivityPath' | 'refresh' | 'refreshUnreadUnseen'> & Pick<FeedManager<UT, AT, CT, RT, CRT, PT>['state'], 'activities' | 'activityOrder' | 'realtimeAdds' | 'realtimeDeletes' | 'refreshing' | 'unread' | 'unseen'>;
declare type DeleteRequestFn = (id: string) => Promise<void | unknown>;
export declare type FeedProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = {
    /** The feed group part of the feed */
    feedGroup: string;
    /** The location that should be used for analytics when liking in the feed,
     * this is only useful when you have analytics enabled for your app. */
    analyticsLocation?: string;
    /** Override activity delete request */
    children?: React.ReactNode;
    doActivityDeleteRequest?: DeleteRequestFn;
    /** Override child reaction add request */
    doChildReactionAddRequest?: (kind: string, reaction: Reaction<RT>, data?: CRT, options?: ReactionAddChildOptions) => Promise<ReactionAPIResponse<CRT>>;
    /** Override child reaction delete request */
    doChildReactionDeleteRequest?: DeleteRequestFn;
    /** The feed read handler (change only for advanced/complex use-cases) */
    doFeedRequest?: (client: StreamClient<UT, AT, CT, RT, CRT, PT>, feedGroup: string, userId?: string, options?: GetFeedOptions) => Promise<FeedAPIResponse<UT, AT, CT, RT, CRT>>;
    /** Override reaction add request */
    doReactionAddRequest?: (kind: string, activity: Activity<AT>, data?: RT, options?: ReactionAddOptions) => Promise<ReactionAPIResponse<RT>>;
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
export declare const FeedContext: React.Context<UR | FeedContextValue<DefaultUT, DefaultAT, UR, UR, UR, UR>>;
export declare const FeedProvider: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ children, value, }: React.PropsWithChildren<{
    value: FeedContextValue<UT, AT, CT, RT, CRT, PT>;
}>) => JSX.Element;
export declare const useFeedContext: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>() => FeedContextValue<UT, AT, CT, RT, CRT, PT>;
export declare function Feed<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>(props: FeedProps<UT, AT, CT, RT, CRT, PT>): JSX.Element | null;
export {};
//# sourceMappingURL=Feed.d.ts.map