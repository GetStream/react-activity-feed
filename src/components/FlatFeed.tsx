import * as React from 'react';
import { LoadingIndicator } from 'react-file-utils';
import {
  Feed,
  FeedContext,
  FeedCtx,
  Streami18Ctx,
  withTranslationContext,
} from '../Context';
import {
  ActivityResponse,
  FeedRequestOptions,
  FeedResponse,
} from '../getstreamCustomTypes';
import {
  BaseActivityResponse,
  BaseClient,
  BaseFeedCtx,
  BaseReaction,
  Renderable,
} from '../types';
import { smartRender } from '../utils';
import Activity from './Activity';
import FeedPlaceholder from './FeedPlaceholder';
import LoadMorePaginator from './LoadMorePaginator';
import NewActivitiesNotification from './NewActivitiesNotification';

type Props = {
  /** The feed group part of the feed that should be displayed */
  feedGroup: string;

  /** The user_id part of the feed that should be displayed */
  userId?: string;

  /** Read options for the API client (eg. limit, ranking, ...) */
  options?: FeedRequestOptions;

  /** The component used to render an activity in the feed */
  Activity?: Renderable;

  /** Component to show when the feed is refreshing **/
  LoadingIndicator?: Renderable;

  /** The component to use to render new activities notification */
  Notifier?: Renderable;

  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator?: Renderable;

  /** Component to show when there are no activities in the feed **/
  Placeholder?: Renderable;

  /** If true, feed shows the Notifier component when new activities are added */
  notify?: boolean;

  /** The feed read handler (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    client: BaseClient,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<any, any>>;

  /** Override activity delete request */
  doActivityDeleteRequest?: (id: string) => unknown;

  /** Override reaction add request */
  doReactionAddRequest?: (
    kind: string,
    activity: BaseActivityResponse,
    data?: any,
    options?: any,
  ) => unknown;

  /** Override reaction delete request */
  doReactionDeleteRequest?: (id: string) => unknown;

  /** Override child reaction add request */
  doChildReactionAddRequest?: (
    kind: string,
    activity: BaseReaction,
    data?: any,
    options?: any,
  ) => unknown;

  /** Override child reaction delete request */
  doChildReactionDeleteRequest?: (id: string) => unknown;

  /** Override reactions filter request */
  doReactionsFilterRequest?: (options: any) => Promise<any>;

  /** The location that should be used for analytics when liking in the feed,
   * this is only useful when you have analytics enabled for your app. */
  analyticsLocation?: string;
};

/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 * @example ./examples/FlatFeed.md
 */
class FlatFeed extends React.Component<Props & Streami18Ctx> {
  static defaultProps = {
    feedGroup: 'timeline',
    notify: false,
    Activity,
    Notifier: (props: any) => (
      <NewActivitiesNotification
        labelPlural="activities"
        labelSingle="activity"
        {...props}
      />
    ),
    Placeholder: FeedPlaceholder,
    Paginator: LoadMorePaginator,
    LoadingIndicator,
  };

  render() {
    return (
      <Feed
        feedGroup={this.props.feedGroup}
        userId={this.props.userId}
        options={this.props.options}
        notify={this.props.notify}
        doFeedRequest={this.props.doFeedRequest}
        doActivityDeleteRequest={this.props.doActivityDeleteRequest}
        doReactionAddRequest={this.props.doReactionAddRequest}
        doReactionDeleteRequest={this.props.doReactionDeleteRequest}
        doChildReactionAddRequest={this.props.doChildReactionAddRequest}
        doChildReactionDeleteRequest={this.props.doChildReactionDeleteRequest}
        doReactionsFilterRequest={this.props.doReactionsFilterRequest}
      >
        <FeedContext.Consumer>
          {(feedCtx: FeedCtx) => <FlatFeedInner {...this.props} {...feedCtx} />}
        </FeedContext.Consumer>
      </Feed>
    );
  }
}

type PropsInner = Props & Streami18Ctx & BaseFeedCtx;
class FlatFeedInner extends React.Component<PropsInner> {
  listRef = React.createRef();
  _refresh = async () => {
    await this.props.refresh(this.props.options);
    const ref = this.listRef;
    if (ref && ref.current && (ref.current as any).scrollToOffset) {
      // TODO scrollToOffset? should this be scrollTop = 0?
      (ref.current as any).scrollToOffset({ offset: 0 });
    }
  };
  async componentDidMount() {
    await this._refresh();
  }

  _renderWrappedActivity = ({ item }: { item: any }) => (
    <ImmutableItemWrapper
      renderItem={this._renderActivity}
      item={item}
      feedGroup={this.props.feedGroup}
      userId={this.props.userId}
      key={item.get('id')}
    />
  );

  _childProps = () => ({
    onToggleReaction: this.props.onToggleReaction,
    onAddReaction: this.props.onAddReaction,
    onRemoveReaction: this.props.onRemoveReaction,
    onToggleChildReaction: this.props.onToggleChildReaction,
    onAddChildReaction: this.props.onAddChildReaction,
    onRemoveChildReaction: this.props.onRemoveChildReaction,
    onRemoveActivity: this.props.onRemoveActivity,
    feedGroup: this.props.feedGroup,
    userId: this.props.userId,
  });

  _renderActivity = (item: ActivityResponse<any, any>) => {
    const args = {
      activity: item,
      ...this._childProps(),
    };

    return smartRender(this.props.Activity, { ...args });
  };

  render() {
    const notifierProps = {
      adds: this.props.realtimeAdds,
      deletes: this.props.realtimeDeletes,
      onClick: this._refresh,
      labelFunction: undefined,
    };
    const {
      loadNextPage,
      hasNextPage,
      refreshing,
      hasDoneRequest,
      loadReverseNextPage,
      hasReverseNextPage,
      t,
    } = this.props;
    if (hasReverseNextPage) {
      notifierProps.onClick = loadReverseNextPage;
      notifierProps.labelFunction = () => t('Load activities');
    }

    if (this.props.activities.size === 0 && this.props.hasDoneRequest) {
      return (
        <React.Fragment>
          {smartRender(this.props.Notifier, notifierProps)}
          {smartRender(this.props.Placeholder)}
        </React.Fragment>
      );
    }

    if (refreshing && !hasDoneRequest) {
      return (
        <div className="raf-loading-indicator">
          {smartRender(this.props.LoadingIndicator, {})}
        </div>
      );
    }

    return (
      <React.Fragment>
        {smartRender(this.props.Notifier, notifierProps)}
        {smartRender(this.props.Paginator, {
          loadNextPage,
          hasNextPage,
          refreshing,
          children: this.props.activityOrder.map((id) =>
            this._renderWrappedActivity({
              item: this.props.activities.get(id),
            }),
          ),
        })}
      </React.Fragment>
    );
  }
}

type ImmutableItemWrapperProps = {
  renderItem: (item: any) => any;
  item: any;
  [prop: string]: any;
};

class ImmutableItemWrapper extends React.PureComponent<
  ImmutableItemWrapperProps
> {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}

export default withTranslationContext<Props>(FlatFeed);
