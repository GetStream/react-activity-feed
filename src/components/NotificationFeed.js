import React from 'react';

import { Feed, FeedContext } from '../Context';
import { NewActivitiesNotification } from './NewActivitiesNotification';
import { LoadMorePaginator } from './LoadMorePaginator';
import Notification from './Notification';
import { LoadingIndicator } from 'react-file-utils';
import { FeedPlaceholder } from './FeedPlaceholder';

import { smartRender } from '../utils';

/**
 * Renders a notificationfeed, this component is a StreamApp consumer and must
 * always be a child of the `<StreamApp>` element.
 * @example ./examples/NotificationFeed.md
 */
export default class NotificationFeed extends React.Component {
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
        doActivityDeleteRequest={this.props.doActivityDeleteRequest}
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

class NotificationFeedInner extends React.Component {
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

  _renderWrappedGroup = ({ item }) => (
    <ImmutableItemWrapper
      renderItem={this._renderGroup}
      item={item}
      feedGroup={this.props.feedGroup}
      userId={this.props.userId}
      key={item.get('id')}
    />
  );

  _renderGroup = (item) => {
    const args = {
      activityGroup: item,
      feedGroup: this.props.feedGroup,
      userId: this.props.userId,
      onToggleReaction: this.props.onToggleReaction,
      onAddReaction: this.props.onAddReaction,
      onRemoveReaction: this.props.onRemoveReaction,
      onToggleChildReaction: this.props.onToggleChildReaction,
      onAddChildReaction: this.props.onAddChildReaction,
      onRemoveChildReaction: this.props.onRemoveChildReaction,
      onRemoveActivity: this.props.onRemoveActivity,
      onMarkAsRead: this.props.onMarkAsRead,
      onMarkAsSeen: this.props.onMarkAsSeen,
    };
    return smartRender(this.props.Group, args);
  };

  render() {
    const notifierProps = {
      adds: this.props.realtimeAdds,
      deletes: this.props.realtimeDeletes,
      onClick: this._refresh,
    };
    const { loadNextPage, hasNextPage, refreshing, hasDoneRequest } = this.props;

    if (this.props.activities.size === 0 && hasDoneRequest) {
      return (
        <React.Fragment>
          {smartRender(this.props.Notifier, notifierProps)}
          {smartRender(this.props.Placeholder)}
        </React.Fragment>
      );
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

class ImmutableItemWrapper extends React.PureComponent {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}
