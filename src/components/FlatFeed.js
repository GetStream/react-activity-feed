// @flow
import * as React from 'react';

import Activity from './Activity';
import NewActivitiesNotification from './NewActivitiesNotification';
import LoadingIndicator from './LoadingIndicator';

import { Feed, FeedContext } from '../Context';
import { smartRender } from '../utils';
import InfiniteScroll from './InfiniteScroll';

import type { BaseFeedCtx, BaseUserSession, Renderable } from '../types';
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
  /** if true, feed shows the Notifier component when new activities are added */
  notify: boolean,
  //** the feed read hander (change only for advanced/complex use-cases) */
  doFeedRequest?: (
    session: BaseUserSession,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<{}, {}>>,
  //** turns off pagination */
  noPagination?: boolean,
  analyticsLocation?: string,
  onRefresh?: () => mixed,
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
    Notifier: NewActivitiesNotification,
  };

  render() {
    return (
      <Feed
        feedGroup={this.props.feedGroup}
        userId={this.props.userId}
        options={this.props.options}
        notify={this.props.notify}
        doFeedRequest={this.props.doFeedRequest}
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
      onPress: this._refresh,
    };

    return (
      <React.Fragment>
        {smartRender(this.props.Notifier, notifierProps)}
        <InfiniteScroll
          loadMore={this.props.loadNextPage}
          hasMore={this.props.hasNextPage}
          isLoading={this.props.refreshing}
          loader={<LoadingIndicator key={0} />}
        >
          {this.props.activityOrder.map((id) =>
            this._renderWrappedActivity({
              item: this.props.activities.get(id),
            }),
          )}
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

type ImmutableItemWrapperProps = {
  renderItem: (item: any) => any,
  item: any,
};

class ImmutableItemWrapper extends React.PureComponent<
  ImmutableItemWrapperProps,
> {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}
