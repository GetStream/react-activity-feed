import immutable from 'immutable';
import StreamAnalytics from 'stream-analytics';
import { UR, StreamClient, StreamUser, FeedAPIResponse, RealTimeMessage, GetFeedOptions, Activity, FlatActivityEnriched, AggregatedActivityEnriched, NotificationActivityEnriched, Reaction, ReactionAddOptions, ReactionAddChildOptions, ReactionFilterAPIResponse, EnrichedReaction } from 'getstream';
import { ErrorHandler } from '../utils/errors';
import { DefaultUT, DefaultAT } from './StreamApp';
import { FeedProps } from './Feed';
import { Subscription } from 'faye';
declare type MarkAsGroup = boolean | {
    id: string;
} | Array<{
    id: string;
}>;
declare type TrackAnalytics = {
    trackAnalytics?: boolean;
};
declare type ResponseResult<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = FlatActivityEnriched<UT, AT, CT, RT, CRT> | AggregatedActivityEnriched<UT, AT, CT, RT, CRT> | NotificationActivityEnriched<UT, AT, CT, RT, CRT>;
export declare type UpdateTriggeredCallback = () => void;
export declare type FeedManagerProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = FeedProps<UT, AT, CT, RT, CRT, PT> & {
    analyticsClient: StreamAnalytics<UT> | null;
    client: StreamClient<UT, AT, CT, RT, CRT, PT>;
    errorHandler: ErrorHandler;
    user?: StreamUser<UT>;
};
export declare type FeedManagerState<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = {
    activities: immutable.Map<string, immutable.Record<ResponseResult<UT, AT, CT, RT, CRT>>>;
    activityIdToPath: Record<string, Array<string | number>>;
    activityIdToPaths: Record<string, Array<Array<string | number>>>;
    activityOrder: string[];
    childReactionsBeingToggled: Record<string, Record<string, boolean>>;
    numSubscribers: number;
    reactionActivities: Record<string, string>;
    reactionIdToPaths: Record<string, Array<Array<string | number>>>;
    reactionsBeingToggled: Record<string, Record<string, boolean>>;
    realtimeAdds: RealTimeMessage<UT, AT>['new'];
    realtimeDeletes: string[];
    refreshing: boolean;
    subscription: Promise<Subscription> | null;
    unread: number;
    unseen: number;
    lastResponse?: FeedAPIResponse<UT, AT, CT, RT, CRT> | null;
    lastReverseResponse?: {
        next: string;
    } | null;
};
export declare class FeedManager<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> {
    registeredCallbacks: Array<UpdateTriggeredCallback>;
    props: FeedManagerProps<UT, AT, CT, RT, CRT, PT>;
    state: FeedManagerState<UT, AT, CT, RT, CRT>;
    constructor(props: FeedManagerProps<UT, AT, CT, RT, CRT, PT>);
    register(callback: UpdateTriggeredCallback): void;
    unregister(callback: UpdateTriggeredCallback): void;
    triggerUpdate(): void;
    setState: (changed: Partial<FeedManagerState<UT, AT, CT, RT, CRT>> | ((oldState: FeedManagerState<UT, AT, CT, RT, CRT>) => Partial<FeedManagerState<UT, AT, CT, RT, CRT>>)) => void;
    trackAnalytics: (label: string, activity: {
        foreign_id: string;
    }, track?: boolean | undefined) => void;
    getActivityPath: (activity: Activity | string, ...rest: string[]) => (string | number)[];
    getActivityPaths: (activity: Activity | string) => (string | number)[][];
    getReactionPaths: (reaction: Reaction | string) => (string | number)[][];
    onAddReaction: (kind: string, activity: Activity<AT>, data?: RT | undefined, options?: ReactionAddOptions & TrackAnalytics) => Promise<void>;
    onRemoveReaction: (kind: string, activity: Activity<AT>, id: string, options?: TrackAnalytics) => Promise<void>;
    onToggleReaction: (kind: string, activity: Activity<AT>, data?: RT | undefined, options?: ReactionAddOptions & TrackAnalytics) => Promise<void>;
    onAddChildReaction: (kind: string, reaction: Reaction<RT>, data?: CRT | undefined, options?: ReactionAddChildOptions) => Promise<void>;
    onRemoveChildReaction: (kind: string, reaction: Reaction<RT>, id: string) => Promise<void>;
    onToggleChildReaction: (kind: string, reaction: Reaction<RT>, data?: CRT | undefined, options?: ReactionAddChildOptions) => Promise<void>;
    _removeActivityFromState: (activityId: string) => void;
    onRemoveActivity: (activityId: string) => Promise<void>;
    onMarkAsRead: (group: MarkAsGroup) => Promise<void>;
    onMarkAsSeen: (group: MarkAsGroup) => Promise<void>;
    _onMarkAs: (type: 'seen' | 'read', group: MarkAsGroup) => Promise<void>;
    getOptions: (extraOptions?: GetFeedOptions) => {
        id_gt?: string | undefined;
        id_gte?: string | undefined;
        id_lt?: string | undefined;
        id_lte?: string | undefined;
        limit: number;
        enrich?: boolean | undefined;
        ownReactions?: boolean | undefined;
        reactionKindsFilter?: string | undefined;
        recentReactionsLimit?: number | undefined;
        withOwnChildren?: boolean | undefined;
        withOwnReactions: boolean;
        withReactionCounts: boolean;
        withRecentReactions?: boolean | undefined;
        offset?: number | undefined;
        ranking?: string | undefined;
        session?: string | undefined;
        mark_read?: boolean | string[] | "current" | undefined;
        mark_seen?: boolean | string[] | "current" | undefined;
    };
    doFeedRequest: (options?: GetFeedOptions | undefined) => Promise<FeedAPIResponse<UT, AT, CT, RT, CRT>>;
    feed: () => import("getstream").StreamFeed<UT, AT, CT, RT, CRT, PT>;
    responseToActivityMap: (response: FeedAPIResponse<UT, AT, CT, RT, CRT>) => immutable.Map<string, immutable.Record<ResponseResult<UT, AT, CT, RT, CRT>>>;
    responseToActivityIdToPath: (response: FeedAPIResponse<UT, AT, CT, RT, CRT>) => Record<string, (string | number)[]>;
    responseToActivityIdToPaths: (response: FeedAPIResponse<UT, AT, CT, RT, CRT>, previous?: FeedManagerState['activityIdToPaths']) => Record<string, (string | number)[][]>;
    feedResponseToReactionIdToPaths: (response: FeedAPIResponse<UT, AT, CT, RT, CRT>, previous?: FeedManagerState['reactionIdToPaths']) => Record<string, (string | number)[][]>;
    reactionResponseToReactionIdToPaths: (response: ReactionFilterAPIResponse<RT, CRT, AT, UT>, previous: FeedManagerState['reactionIdToPaths'], basePath: Array<string | number>, oldLength: number) => Record<string, (string | number)[][]>;
    removeFoundReactionIdPaths: (data: EnrichedReaction | EnrichedReaction[], previous: FeedManagerState['reactionIdToPaths'], basePath: Array<string | number>) => Record<string, (string | number)[][]>;
    removeFoundActivityIdPaths: (data: ResponseResult | ResponseResult[], previous: FeedManagerState['activityIdToPaths'], basePath: Array<string | number>) => Record<string, (string | number)[][]>;
    removeFoundActivityIdPath: (data: ResponseResult[], previous: FeedManagerState['activityIdToPath'], basePath: Array<string | number>) => Record<string, (string | number)[]>;
    addFoundReactionIdPaths: (data: EnrichedReaction | EnrichedReaction[], previous: FeedManagerState['reactionIdToPaths'], basePath: Array<string | number>) => Record<string, (string | number)[][]>;
    addFoundActivityIdPaths: (data: ResponseResult | ResponseResult[], previous: FeedManagerState['activityIdToPaths'], basePath: Array<string | number>) => Record<string, (string | number)[][]>;
    addFoundActivityIdPath: (data: ResponseResult[], previous: FeedManagerState['activityIdToPath'], basePath: Array<string | number>) => Record<string, (string | number)[]>;
    responseToReactionActivities: (response: FeedAPIResponse<UT, AT, CT, RT, CRT>) => Record<string, string>;
    unseenUnreadFromResponse(response: FeedAPIResponse<UT, AT, CT, RT, CRT>): {
        unseen: number;
        unread: number;
    };
    refresh: (extraOptions?: GetFeedOptions | undefined) => Promise<void>;
    subscribe: () => Promise<void>;
    unsubscribe: () => Promise<void>;
    hasNextPage: () => boolean;
    hasReverseNextPage: () => boolean;
    loadNextPage: () => Promise<void>;
    loadReverseNextPage: () => Promise<void>;
    loadNextReactions: (activityId: string, kind: string, activityPath?: (string | number)[] | undefined, oldestToNewest?: boolean | undefined) => Promise<void>;
    refreshUnreadUnseen: () => Promise<void>;
}
export {};
//# sourceMappingURL=FeedManager.d.ts.map