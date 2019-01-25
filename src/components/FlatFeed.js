// @flow
import * as React from 'react';

import Activity from './Activity';
import NewActivitiesNotification from './NewActivitiesNotification';
import type { Props as NotifierProps } from './NewActivitiesNotification';
import LoadMorePaginator from './LoadMorePaginator';
import FeedPlaceholder from './FeedPlaceholder';
import LoadingIndicator from './LoadingIndicator';

import { Feed, FeedContext } from '../Context';
import { smartRender } from '../utils';

import type { BaseFeedCtx, BaseClient, Renderable } from '../types';
import type {
  FeedRequestOptions,
  FeedResponse,
  ActivityResponse,
} from 'getstream';

type Props = {|
  feedGroup: string,
  userId?: string,
  /** read options for the API client (eg. limit, ranking, ...) */
  options?: FeedRequestOptions,
  Activity: Renderable,
  /** the component to use to render new activities notification */
  Notifier: Renderable,
  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator: Renderable,
  Placeholder: Renderable,
  /** if true, feed shows the Notifier component when new activities are added */
  notify: boolean,
  //** the feed read hander (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    client: BaseClient,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<{}, {}>>,
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
  analyticsLocation?: string,
|};

/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 * @example ./examples/FlatFeed.md
 */
export default class FlatFeed extends React.Component<Props> {
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
    Placeholder: <FeedPlaceholder />,
    Paginator: LoadMorePaginator,
  };

  render() {
    return (
      <Feed
        feedGroup={this.props.feedGroup}
        userId={this.props.userId}
        options={this.props.options}
        notify={this.props.notify}
        doFeedRequest={this.props.doFeedRequest}
        doReactionAddRequest={this.props.doReactionAddRequest}
        doReactionDeleteRequest={this.props.doReactionDeleteRequest}
        doChildReactionAddRequest={this.props.doChildReactionAddRequest}
        doChildReactionDeleteRequest={this.props.doChildReactionDeleteRequest}
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
    const notifierProps: NotifierProps = {
      adds: this.props.realtimeAdds,
      deletes: this.props.realtimeDeletes,
      onClick: this._refresh,
    };
    const {
      loadNextPage,
      hasNextPage,
      refreshing,
      hasDoneRequest,
      loadReverseNextPage,
      hasReverseNextPage,
    } = this.props;
    if (hasReverseNextPage) {
      notifierProps.onClick = loadReverseNextPage;
      notifierProps.labelFunction = () => 'Load activities';
    }

    if (this.props.activities.size === 0 && this.props.hasDoneRequest) {
      return smartRender(this.props.Placeholder);
    }

    if (refreshing && !hasDoneRequest) {
      return (
        <div style={{ padding: 40, backgroundColor: 'rgb(247, 247, 247' }}>
          <LoadingIndicator />
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
