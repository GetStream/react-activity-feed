import React, { useEffect } from 'react';
import { NotificationActivityEnriched, UR } from 'getstream';

import { Feed, FeedManagerProps, FeedProps, DefaultUT, DefaultAT, useFeedContext } from '../context';
import { NewActivitiesNotification, NewActivitiesNotificationProps } from './NewActivitiesNotification';
import { LoadMorePaginator, LoadMorePaginatorProps } from './LoadMorePaginator';
import { Notification, NotificationProps } from './Notification';
import { LoadingIndicator as DefaultLoadingIndicator, LoadingIndicatorProps } from 'react-file-utils';
import { FeedPlaceholder, FeedPlaceholderProps } from './FeedPlaceholder';
import { smartRender, ElementOrComponentOrLiteralType } from '../utils';

type NotificationFeedInnerProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
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

export type NotificationFeedProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
> = Partial<
  NotificationFeedInnerProps<UT, AT, CT, RT, CRT> &
    Pick<
      FeedManagerProps<UT, AT, CT, RT, CRT, PT>,
      | 'analyticsLocation'
      | 'doActivityDeleteRequest'
      | 'doChildReactionAddRequest'
      | 'doChildReactionDeleteRequest'
      | 'doFeedRequest'
      | 'doReactionAddRequest'
      | 'doReactionDeleteRequest'
      | 'doReactionsFilterRequest'
      | 'feedGroup'
      | 'notify'
      | 'userId'
    >
>;

const NotificationFeedInner = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  Group,
  LoadingIndicator,
  Notifier,
  Paginator,
  Placeholder,
  options,
}: NotificationFeedInnerProps<UT, AT, CT, RT, CRT>) => {
  const feed = useFeedContext<UT, AT, CT, RT, CRT, PT>();

  const refreshFeed = () => feed.refresh(options);

  useEffect(() => {
    return () => {
      feed.activities.clear();
      feed.activityOrder.splice(0, feed.activityOrder.length);
    };
  }, [feed.feedGroup, feed.userId]);

  if (feed.refreshing && !feed.hasDoneRequest) {
    return <div className="raf-loading-indicator">{smartRender<LoadingIndicatorProps>(LoadingIndicator)}</div>;
  }

  return (
    <>
      {smartRender<NewActivitiesNotificationProps>(Notifier, {
        adds: feed.realtimeAdds,
        deletes: feed.realtimeDeletes,
        onClick: refreshFeed,
      })}

      {feed.activities.size === 0 && feed.hasDoneRequest
        ? smartRender<FeedPlaceholderProps>(Placeholder)
        : smartRender<LoadMorePaginatorProps>(Paginator, {
            loadNextPage: feed.loadNextPage,
            hasNextPage: feed.hasNextPage,
            refreshing: feed.refreshing,
            children: feed.activityOrder.map((id) =>
              smartRender<NotificationProps<UT, AT, CT, RT, CRT>>(Group, {
                activityGroup: feed.activities.get(id)?.toJS() as NotificationActivityEnriched<UT, AT, CT, RT, CRT>,
                // @ts-expect-error
                key: id,
              }),
            ),
          })}
    </>
  );
};

/**
 * Renders a Notification feed, this component is a StreamApp consumer and must always be a child of `<StreamApp>`.
 */
export const NotificationFeed = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  options,
  userId,
  analyticsLocation,
  doFeedRequest,
  doActivityDeleteRequest,
  doChildReactionAddRequest,
  doChildReactionDeleteRequest,
  doReactionAddRequest,
  doReactionDeleteRequest,
  feedGroup = 'notification',
  notify = false,
  Group = Notification,
  Notifier = NewActivitiesNotification,
  Paginator = LoadMorePaginator,
  Placeholder = FeedPlaceholder,
  LoadingIndicator = DefaultLoadingIndicator,
}: NotificationFeedProps<UT, AT, CT, RT, CRT, PT>) => {
  return (
    <Feed<UT, AT, CT, RT, CRT, PT>
      feedGroup={feedGroup}
      userId={userId}
      options={{ ...options, mark_seen: options?.mark_seen ?? true }}
      notify={notify}
      analyticsLocation={analyticsLocation}
      doFeedRequest={doFeedRequest}
      doActivityDeleteRequest={doActivityDeleteRequest}
      doReactionAddRequest={doReactionAddRequest}
      doReactionDeleteRequest={doReactionDeleteRequest}
      doChildReactionAddRequest={doChildReactionAddRequest}
      doChildReactionDeleteRequest={doChildReactionDeleteRequest}
    >
      <NotificationFeedInner<UT, AT, CT, RT, CRT, PT>
        Group={Group}
        LoadingIndicator={LoadingIndicator}
        Notifier={Notifier}
        Paginator={Paginator}
        Placeholder={Placeholder}
        options={options}
      />
    </Feed>
  );
};
