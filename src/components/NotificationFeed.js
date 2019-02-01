// @flow
import * as React from 'react';

import { Feed, FeedContext } from '../Context';
import NewActivitiesNotification from './NewActivitiesNotification';
import LoadMorePaginator from './LoadMorePaginator';
import Notification from './Notification';
import LoadingIndicator from './LoadingIndicator';
import FeedPlaceholder from './FeedPlaceholder';

import { smartRender } from '../utils';

import type {
  BaseActivityResponse,
  BaseFeedCtx,
  BaseClient,
  Renderable,
  BaseReaction,
} from '../types';
import type { FeedRequestOptions, FeedResponse } from 'getstream';

type Props = {|
  /** The feed group part of the feed that should be displayed */
  feedGroup: string,
  /** The user_id part of the feed that should be displayed */
  userId?: string,
  /** read options for the API client (eg. limit, mark_seen, ...) */
  options?: FeedRequestOptions,
  /** the component used to render a group in the feed */
  Group: Renderable,
  /** if true, feed shows the NewActivitiesNotification component when new activities are added */
  notify: boolean,
  /** The component used to render the new activities notification */
  Notifier: Renderable,
  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator: Renderable,
  /** Component to show when there are no activities in the feed **/
  Placeholder: Renderable,
  /** The feed read handler (change only for advanced/complex use-cases) */
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
  /** The location that should be used for analytics when liking in the feed,
   * this is only useful when you have analytics enabled for your app. */
  analyticsLocation?: string,
|};

/**
 * Renders a notificationfeed, this component is a StreamApp consumer and must
 * always be a child of the `<StreamApp>` element.
 * @example ./examples/NotificationFeed.md
 */
export default class NotificationFeed extends React.Component<Props> {
  static defaultProps = {
    feedGroup: 'notification',
    Group: Notification,
    notify: false,
    Notifier: NewActivitiesNotification,
    Paginator: LoadMorePaginator,
    Placeholder: FeedPlaceholder,
  };

  render() {
    return (
      <Feed
        feedGroup={this.props.feedGroup}
        userId={this.props.userId}
        options={makeDefaultOptions(this.props.options)}
        notify={this.props.notify}
        doFeedRequest={this.props.doFeedRequest}
        doReactionAddRequest={this.props.doReactionAddRequest}
        doReactionDeleteRequest={this.props.doReactionDeleteRequest}
        doChildReactionAddRequest={this.props.doChildReactionAddRequest}
        doChildReactionDeleteRequest={this.props.doChildReactionDeleteRequest}
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

  componentWillUnmount() {
    this.props.activities.clear();
    this.props.activityOrder.splice(0, this.props.activityOrder.length);
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
      onClick: this._refresh,
    };
    const {
      loadNextPage,
      hasNextPage,
      refreshing,
      hasDoneRequest,
    } = this.props;

    if (this.props.activities.size === 0 && hasDoneRequest) {
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
            this._renderWrappedGroup({
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
