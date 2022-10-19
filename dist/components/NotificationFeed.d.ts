/// <reference types="react" />
import { UR } from 'getstream';
import { FeedManagerProps, FeedProps, DefaultUT, DefaultAT } from '../context';
import { NewActivitiesNotificationProps } from './NewActivitiesNotification';
import { LoadMorePaginatorProps } from './LoadMorePaginator';
import { NotificationProps } from './Notification';
import { LoadingIndicatorProps } from 'react-file-utils';
import { FeedPlaceholderProps } from './FeedPlaceholder';
import { ElementOrComponentOrLiteralType } from '../utils';
declare type NotificationFeedInnerProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = {
    /** the component used to render a grouped notifications in the feed
     * #Notification (Component)#
     */
    Group: ElementOrComponentOrLiteralType<NotificationProps<UT, AT, CT, RT, CRT>>;
    /** Component to show when the feed is refreshing
     * #LoadingIndicator (Component)#
     */
    LoadingIndicator: ElementOrComponentOrLiteralType<LoadingIndicatorProps>;
    /** The component to use to render new activities notification
     * #NewActivitiesNotification (Component)#
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
export declare type NotificationFeedProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = Partial<NotificationFeedInnerProps<UT, AT, CT, RT, CRT> & Pick<FeedManagerProps<UT, AT, CT, RT, CRT, PT>, 'analyticsLocation' | 'doActivityDeleteRequest' | 'doChildReactionAddRequest' | 'doChildReactionDeleteRequest' | 'doFeedRequest' | 'doReactionAddRequest' | 'doReactionDeleteRequest' | 'doReactionsFilterRequest' | 'feedGroup' | 'notify' | 'userId'>>;
/**
 * Renders a Notification feed, this component is a StreamApp consumer and must always be a child of `<StreamApp>`.
 */
export declare const NotificationFeed: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ options, userId, analyticsLocation, doFeedRequest, doActivityDeleteRequest, doChildReactionAddRequest, doChildReactionDeleteRequest, doReactionAddRequest, doReactionDeleteRequest, doReactionsFilterRequest, feedGroup, notify, Group, Notifier, Paginator, Placeholder, LoadingIndicator, }: Partial<NotificationFeedInnerProps<UT, AT, CT, RT, CRT> & Pick<FeedManagerProps<UT, AT, CT, RT, CRT, PT>, "doFeedRequest" | "feedGroup" | "userId" | "notify" | "analyticsLocation" | "doActivityDeleteRequest" | "doChildReactionAddRequest" | "doChildReactionDeleteRequest" | "doReactionAddRequest" | "doReactionDeleteRequest" | "doReactionsFilterRequest">>) => JSX.Element;
export {};
//# sourceMappingURL=NotificationFeed.d.ts.map