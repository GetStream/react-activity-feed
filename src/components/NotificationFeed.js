// @flow
import * as React from 'react';

import { Feed, FeedContext } from '../Context';
import NewActivitiesNotification from './NewActivitiesNotification';
import LoadingIndicator from './LoadingIndicator';
import InfiniteScroll from './InfiniteScroll';
import Notification from './Notification';

import { smartRender } from '../utils';

import type {
  BaseActivityResponse,
  BaseFeedCtx,
  BaseUserSession,
  Renderable,
} from '../types';
import type { FeedRequestOptions, FeedResponse } from 'getstream';

type Props = {|
  feedGroup: string,
  userId?: string,
  options?: FeedRequestOptions,
  Group: Renderable,
  /** if true, feed shows the NewActivitiesNotification component when new activities are added */
  notify: boolean,
  /** the component to use to render new activities notification */
  Notifier: Renderable,
  doFeedRequest?: (
    session: BaseUserSession,
    feedGroup: string,
    userId?: string,
    options?: FeedRequestOptions,
  ) => Promise<FeedResponse<{}, {}>>,
  analyticsLocation?: string,
  noPagination?: boolean,
  children?: React.Node,
|};

/**
 * Renders a notificationfeed, this component is a StreamApp consumer and must
 * always be a child of the `<StreamApp>` element.
 * @example ./examples/NotificationFeed.md
 */
export default class NotificationFeed extends React.Component<Props> {
  static defaultProps = {
    feedGroup: 'notification',
    Notifier: NewActivitiesNotification,
    Group: Notification,
    notify: false,
  };

  render() {
    return (
      <Feed
        feedGroup={this.props.feedGroup}
        userId={this.props.userId}
        options={makeDefaultOptions(this.props.options)}
        notify={this.props.notify}
        doFeedRequest={this.props.doFeedRequest}
      >
        <FeedContext.Consumer>
          {(feedCtx) => <NotificationFeedInner {...this.props} {...feedCtx} />}
        </FeedContext.Consumer>
      </Feed>
    );
  }
}

const makeDefaultOptions = (options) => {
  const copy = { ...options };
  if (copy.mark_seen === undefined) {
    copy.mark_seen = true;
  }
  return copy;
};

type PropsInner = {| ...Props, ...BaseFeedCtx |};
class NotificationFeedInner extends React.Component<PropsInner> {
  listRef = React.createRef();
  _refresh = async () => {
    await this.props.refresh(makeDefaultOptions(this.props.options));
    const ref = this.listRef;
    if (ref && ref.current) {
      ref.current.scrollToOffset({ offset: 0 });
    }
  };
  async componentDidMount() {
    await this._refresh();
  }

  _renderWrappedGroup = ({ item }: { item: any }) => (
    <ImmutableItemWrapper
      renderItem={this._renderGroup}
      item={item}
      feedGroup={this.props.feedGroup}
      userId={this.props.userId}
      key={item.get('id')}
    />
  );

  _renderGroup = (item: BaseActivityResponse) => {
    const args = {
      activityGroup: item,
      feedGroup: this.props.feedGroup,
      userId: this.props.userId,
      onToggleReaction: this.props.onToggleReaction,
      onAddReaction: this.props.onAddReaction,
      onRemoveReaction: this.props.onRemoveReaction,
    };
    return smartRender(this.props.Group, args);
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
          loader={
            <div style={{ margin: 10 }} key={'abc'}>
              <LoadingIndicator />
            </div>
          }
        >
          {this.props.activityOrder.map((id) =>
            this._renderWrappedGroup({
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
