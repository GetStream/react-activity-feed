import React from 'react';
import _isEqual from 'lodash/isEqual';

import { StreamApp } from './StreamApp';
import { FeedManager } from './FeedManager';

export const FeedContext = React.createContext({});

export class Feed extends React.Component {
  // Used to avoid unmount-remount behaviour, which causes
  // unsubscribe-subscribe behaviour.
  _appCtxWrapperFunc = (appCtx) => <FeedInner {...this.props} {...appCtx} />;

  render() {
    return <StreamApp.Consumer>{this._appCtxWrapperFunc}</StreamApp.Consumer>;
  }
}

class FeedInner extends React.Component {
  constructor(props) {
    super(props);
    const feedId = props.client.feed(props.feedGroup, props.userId).id;
    let manager = props.sharedFeedManagers[feedId];
    if (!manager) {
      manager = new FeedManager(props);
    }

    this.state = {
      manager,
    };
  }
  boundForceUpdate = () => this.forceUpdate();

  componentDidMount() {
    return this.state.manager.register(this.boundForceUpdate);
  }

  componentDidUpdate(prevProps) {
    const clientDifferent = this.props.client !== prevProps.client;
    const notifyDifferent = this.props.notify !== prevProps.notify;
    const feedDifferent =
      this.props.userId !== prevProps.userId ||
      this.props.feedGroup !== prevProps.feedGroup;
    const optionsDifferent = !_isEqual(this.props.options, prevProps.options);
    const doFeedRequestDifferent =
      this.props.doFeedRequest !== prevProps.doFeedRequest;

    if (
      clientDifferent ||
      feedDifferent ||
      optionsDifferent ||
      doFeedRequestDifferent
    ) {
      // TODO: Implement
    }
    if (clientDifferent || feedDifferent || notifyDifferent) {
      // TODO: Implement
    }
  }

  componentWillUnmount() {
    return this.state.manager.unregister(this.boundForceUpdate);
  }

  getCtx = () => {
    const { manager } = this.state;
    const state = manager.state;
    return {
      getActivityPath: manager.getActivityPath,
      onToggleReaction: manager.onToggleReaction,
      onAddReaction: manager.onAddReaction,
      onRemoveReaction: manager.onRemoveReaction,
      onToggleChildReaction: manager.onToggleChildReaction,
      onAddChildReaction: manager.onAddChildReaction,
      onRemoveChildReaction: manager.onRemoveChildReaction,
      onRemoveActivity: manager.onRemoveActivity,
      onMarkAsRead: manager.onMarkAsRead,
      onMarkAsSeen: manager.onMarkAsSeen,
      hasDoneRequest: state.lastResponse != null,
      refresh: manager.refresh,
      refreshUnreadUnseen: manager.refreshUnreadUnseen,
      loadNextReactions: manager.loadNextReactions,
      loadNextPage: manager.loadNextPage,
      hasNextPage: manager.hasNextPage(),
      loadReverseNextPage: manager.loadReverseNextPage,
      hasReverseNextPage: manager.hasReverseNextPage(),
      feedGroup: this.props.feedGroup,
      userId: this.props.userId,
      activityOrder: state.activityOrder,
      activities: state.activities,
      realtimeAdds: state.realtimeAdds,
      realtimeDeletes: state.realtimeDeletes,
      refreshing: state.refreshing,
      unread: state.unread,
      unseen: state.unseen,
      feedManager: manager,
    };
  };

  render() {
    return (
      <FeedContext.Provider value={this.getCtx()}>
        {this.props.children}
      </FeedContext.Provider>
    );
  }
}
