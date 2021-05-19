import React, { useEffect } from 'react';
import { EnrichedActivity, UR } from 'getstream';
import { LoadingIndicator as DefaultLoadingIndicator, LoadingIndicatorProps } from 'react-file-utils';

import { Activity as DefaultActivity, ActivityProps } from './Activity';
import { NewActivitiesNotification, NewActivitiesNotificationProps } from './NewActivitiesNotification';
import { LoadMorePaginator, LoadMorePaginatorProps } from './LoadMorePaginator';
import { FeedPlaceholder, FeedPlaceholderProps } from './FeedPlaceholder';
import { smartRender, ElementOrComponentOrLiteralType } from '../utils';
import {
  Feed,
  useFeedContext,
  useTranslationContext,
  DefaultAT,
  DefaultUT,
  FeedManagerProps,
  FeedProps,
} from '../context';

type FlatFeedInnerProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
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

export type FlatFeedProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
> = Partial<FlatFeedInnerProps<UT, AT, CT, RT, CRT>> &
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
  >;

const DefaultNotifier = (props: NewActivitiesNotificationProps) => (
  <NewActivitiesNotification labelPlural="activities" labelSingle="activity" {...props} />
);

const FlatFeedInner = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  Activity,
  Notifier,
  Placeholder,
  Paginator,
  LoadingIndicator,
  options,
}: FlatFeedInnerProps<UT, AT, CT, RT, CRT>) => {
  const feed = useFeedContext<UT, AT, CT, RT, CRT, PT>();
  const { t } = useTranslationContext();

  const refreshFeed = () => feed.refresh(options);

  useEffect(() => {
    refreshFeed();
  }, []);

  if (feed.refreshing && !feed.hasDoneRequest) {
    return <div className="raf-loading-indicator">{smartRender<LoadingIndicatorProps>(LoadingIndicator)}</div>;
  }

  return (
    <>
      {smartRender<NewActivitiesNotificationProps>(Notifier, {
        adds: feed.realtimeAdds,
        deletes: feed.realtimeDeletes,
        onClick: feed.hasReverseNextPage ? feed.loadReverseNextPage : refreshFeed,
        labelFunction: feed.hasReverseNextPage ? () => t('Load activities') : undefined,
      })}

      {feed.activities.size === 0 && feed.hasDoneRequest
        ? smartRender<FeedPlaceholderProps>(Placeholder)
        : smartRender<LoadMorePaginatorProps>(Paginator, {
            loadNextPage: feed.loadNextPage,
            hasNextPage: feed.hasNextPage,
            refreshing: feed.refreshing,
            children: feed.activityOrder.map((id) =>
              smartRender<ActivityProps<UT, AT, CT, RT, CRT>>(Activity, {
                activity: feed.activities.get(id)?.toJS() as EnrichedActivity<UT, AT, CT, RT, CRT>,
                feedGroup: feed.feedGroup,
                userId: feed.userId,
                // @ts-expect-error
                key: id,
              }),
            ),
          })}
    </>
  );
};

/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 */
export const FlatFeed = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR,
  PT extends UR = UR
>({
  userId,
  options,
  analyticsLocation,
  doFeedRequest,
  doActivityDeleteRequest,
  doChildReactionAddRequest,
  doChildReactionDeleteRequest,
  doReactionAddRequest,
  doReactionDeleteRequest,
  doReactionsFilterRequest,
  feedGroup = 'timeline',
  notify = false,
  Activity = DefaultActivity,
  Notifier = DefaultNotifier,
  Placeholder = FeedPlaceholder,
  Paginator = LoadMorePaginator,
  LoadingIndicator = DefaultLoadingIndicator,
}: FlatFeedProps<UT, AT, CT, RT, CRT, PT>) => {
  return (
    <Feed<UT, AT, CT, RT, CRT, PT>
      feedGroup={feedGroup}
      userId={userId}
      options={options}
      notify={notify}
      analyticsLocation={analyticsLocation}
      doFeedRequest={doFeedRequest}
      doActivityDeleteRequest={doActivityDeleteRequest}
      doReactionAddRequest={doReactionAddRequest}
      doReactionDeleteRequest={doReactionDeleteRequest}
      doChildReactionAddRequest={doChildReactionAddRequest}
      doChildReactionDeleteRequest={doChildReactionDeleteRequest}
      doReactionsFilterRequest={doReactionsFilterRequest}
    >
      <FlatFeedInner<UT, AT, CT, RT, CRT>
        Activity={Activity}
        Notifier={Notifier}
        Placeholder={Placeholder}
        Paginator={Paginator}
        LoadingIndicator={LoadingIndicator}
        options={options}
      />
    </Feed>
  );
};
