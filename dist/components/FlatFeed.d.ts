/// <reference types="react" />
import { UR } from 'getstream';
import { LoadingIndicatorProps } from 'react-file-utils';
import { ActivityProps } from './Activity';
import { NewActivitiesNotificationProps } from './NewActivitiesNotification';
import { LoadMorePaginatorProps } from './LoadMorePaginator';
import { FeedPlaceholderProps } from './FeedPlaceholder';
import { ElementOrComponentOrLiteralType } from '../utils';
import { DefaultAT, DefaultUT, FeedManagerProps, FeedProps } from '../context';
declare type FlatFeedInnerProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = {
    /** The component used to render an activity in the feed
     * #Activity (Component)#
     */
    Activity: ElementOrComponentOrLiteralType<ActivityProps<UT, AT, CT, RT, CRT>>;
    /** Component to show when the feed is refreshing
     * #LoadingIndicator (Component)#
     */
    LoadingIndicator: ElementOrComponentOrLiteralType<LoadingIndicatorProps>;
    /** The component to use to render new activities notification
     * #Notifier (NewActivitiesNotification Component)#
     */
    Notifier: ElementOrComponentOrLiteralType<NewActivitiesNotificationProps>;
    /** By default pagination is done with a "Load more" button, you can use
     * [InfiniteScrollPaginator](/components/infinite-scroll) to enable infinite scrolling
     * #LoadMorePaginator (Component)#
     */
    Paginator: ElementOrComponentOrLiteralType<LoadMorePaginatorProps>;
    /** Component to show when there are no activities in the feed
     * #FeedPlaceholder (Component)#
     */
    Placeholder: ElementOrComponentOrLiteralType<FeedPlaceholderProps>;
    /** Read options for the API client (eg. limit, ranking, ...) */
    options?: FeedProps['options'];
};
export declare type FlatFeedProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = Partial<FlatFeedInnerProps<UT, AT, CT, RT, CRT>> & Pick<FeedManagerProps<UT, AT, CT, RT, CRT, PT>, 'analyticsLocation' | 'doActivityDeleteRequest' | 'doChildReactionAddRequest' | 'doChildReactionDeleteRequest' | 'doFeedRequest' | 'doReactionAddRequest' | 'doReactionDeleteRequest' | 'doReactionsFilterRequest' | 'feedGroup' | 'notify' | 'userId'>;
/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 */
export declare const FlatFeed: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ userId, options, analyticsLocation, doFeedRequest, doActivityDeleteRequest, doChildReactionAddRequest, doChildReactionDeleteRequest, doReactionAddRequest, doReactionDeleteRequest, doReactionsFilterRequest, feedGroup, notify, Activity, Notifier, Placeholder, Paginator, LoadingIndicator, }: FlatFeedProps<UT, AT, CT, RT, CRT, PT>) => JSX.Element;
export {};
//# sourceMappingURL=FlatFeed.d.ts.map