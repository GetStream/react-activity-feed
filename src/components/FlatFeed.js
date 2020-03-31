// @flow
import * as React from 'react';

import Activity from './Activity';
import NewActivitiesNotification from './NewActivitiesNotification';
import type { Props as NotifierProps } from './NewActivitiesNotification';
import type { Streami18Ctx } from '../Context';
import LoadMorePaginator from './LoadMorePaginator';
import FeedPlaceholder from './FeedPlaceholder';
import { LoadingIndicator } from 'react-file-utils';

import { Feed, FeedContext, withTranslationContext } from '../Context';
import { smartRender } from '../utils';

import type {
  BaseFeedCtx,
  BaseClient,
  Renderable,
  BaseActivityResponse,
  BaseReaction,
} from '../types';
import type {
  FeedRequestOptions,
  FeedResponse,
  ActivityResponse,
} from 'getstream';

type Props = {|
  /** The feed group part of the feed that should be displayed */
  feedGroup: string,
  /** The user_id part of the feed that should be displayed */
  userId?: string,
  /** Read options for the API client (eg. limit, ranking, ...) */
  options?: FeedRequestOptions,
  /** The component used to render an activity in the feed */
  Activity: Renderable,
  /** Component to show when the feed is refreshing **/
  LoadingIndicator: Renderable,
  /** The component to use to render new activities notification */
  Notifier: Renderable,
  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator: Renderable,
  /** Component to show when there are no activities in the feed **/
  Placeholder: Renderable,
  /** If true, feed shows the Notifier component when new activities are added */
  notify: boolean,
  /** The feed read handler (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    client: BaseClient,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<{}, {}>>,
  /** Override activity delete request */
  doActivityDeleteRequest?: (id: string) => mixed,
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
|} & Streami18Ctx;

/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 * @example ./examples/FlatFeed.md
 */
class FlatFeed extends React.Component<Props> {
  static defaultProps = {
    feedGroup: 'timeline',
    notify: false,
    Activity,
    Notifier: (props: NotifierProps) => (
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
          {(feedCtx) => <FlatFeedInner {...this.props} {...feedCtx} />}
        </FeedContext.Consumer>
      </Feed>
    );
  }
}

type PropsInner = {| ...Props, ...BaseFeedCtx |};
class FlatFeedInner extends React.Component<PropsInner> {
  listRef = React.createRef();
  _refresh = async () => {
    await this.props.refresh(this.props.options);
    const ref = this.listRef;
    if (ref && ref.current) {
      ref.current.scrollToOffset({ offset: 0 });
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

  _renderActivity = (item: ActivityResponse<Object, Object>) => {
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
  renderItem: (item: any) => any,
  item: any,
};

class ImmutableItemWrapper extends React.PureComponent<ImmutableItemWrapperProps> {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}

export default withTranslationContext(FlatFeed);
