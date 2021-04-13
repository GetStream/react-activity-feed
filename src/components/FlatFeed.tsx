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
} from '../Context';

type FlatFeedInnerProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  /** The component used to render an activity in the feed */
  Activity: ElementOrComponentOrLiteralType<ActivityProps<UT, AT, CT, RT, CRT>>;
  /** Component to show when the feed is refreshing **/
  LoadingIndicator: ElementOrComponentOrLiteralType<LoadingIndicatorProps>;
  /** The component to use to render new activities notification */
  Notifier: ElementOrComponentOrLiteralType<NewActivitiesNotificationProps>;
  /** By default pagination is done with a "Load more" button, you can use
   * InfiniteScrollPaginator to enable infinite scrolling */
  Paginator: ElementOrComponentOrLiteralType<LoadMorePaginatorProps>;
  /** Component to show when there are no activities in the feed **/
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
> = Partial<FlatFeedInnerProps<UT, AT, CT, RT, CRT>> & {
  /** The location that should be used for analytics when liking in the feed,
   * this is only useful when you have analytics enabled for your app. */
  analyticsLocation?: string;
  /** Override activity delete request */
  doActivityDeleteRequest?: FeedManagerProps<UT, AT, CT, RT, CRT, PT>['doActivityDeleteRequest'];
  /** Override child reaction add request */
  doChildReactionAddRequest?: FeedManagerProps<UT, AT, CT, RT, CRT, PT>['doChildReactionAddRequest'];
  /** Override child reaction delete request */
  doChildReactionDeleteRequest?: FeedManagerProps<UT, AT, CT, RT, CRT, PT>['doChildReactionDeleteRequest'];
  /** The feed read handler (change only for advanced/complex use-cases) */
  doFeedRequest?: FeedManagerProps<UT, AT, CT, RT, CRT, PT>['doFeedRequest'];
  /** Override reaction add request */
  doReactionAddRequest?: FeedManagerProps<UT, AT, CT, RT, CRT, PT>['doReactionAddRequest'];
  /** Override reaction delete request */
  doReactionDeleteRequest?: FeedManagerProps<UT, AT, CT, RT, CRT, PT>['doReactionDeleteRequest'];
  /** Override reactions filter request */
  doReactionsFilterRequest?: FeedManagerProps<UT, AT, CT, RT, CRT, PT>['doReactionsFilterRequest'];
  /** The feed group part of the feed that should be displayed */
  feedGroup?: string;
  /** If true, feed shows the Notifier component when new activities are added */
  notify?: boolean;
  /** The user_id part of the feed that should be displayed */
  userId?: string;
};

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
                // @ts-expect-error
                key: id,
                activity: feed.activities.get(id)?.toJS() as EnrichedActivity<UT, AT, CT, RT, CRT>,
                onToggleReaction: feed.onToggleReaction,
                onAddReaction: feed.onAddReaction,
                onRemoveReaction: feed.onRemoveReaction,
                onToggleChildReaction: feed.onToggleChildReaction,
                onAddChildReaction: feed.onAddChildReaction,
                onRemoveChildReaction: feed.onRemoveChildReaction,
                onRemoveActivity: feed.onRemoveActivity,
                feedGroup: feed.feedGroup,
                userId: feed.userId,
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
