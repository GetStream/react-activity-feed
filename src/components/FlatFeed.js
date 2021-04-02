import React from 'react';

import Activity from './Activity';
import { NewActivitiesNotification } from './NewActivitiesNotification';

import LoadMorePaginator from './LoadMorePaginator';
import { FeedPlaceholder } from './FeedPlaceholder';
import { LoadingIndicator } from 'react-file-utils';

import { Feed, FeedContext, withTranslationContext } from '../Context';
import { smartRender } from '../utils';

/**
 * Renders a feed of activities, this component is a StreamApp consumer
 * and must always be a child of the `<StreamApp>` element
 * @example ./examples/FlatFeed.md
 */
class FlatFeed extends React.Component {
  static defaultProps = {
    feedGroup: 'timeline',
    notify: false,
    Activity,
    Notifier: (props) => <NewActivitiesNotification labelPlural="activities" labelSingle="activity" {...props} />,
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
        <FeedContext.Consumer>{(feedCtx) => <FlatFeedInner {...this.props} {...feedCtx} />}</FeedContext.Consumer>
      </Feed>
    );
  }
}

class FlatFeedInner extends React.Component {
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

  _renderWrappedActivity = ({ item }) => (
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

  _renderActivity = (item) => {
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
      return <div className="raf-loading-indicator">{smartRender(this.props.LoadingIndicator, {})}</div>;
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

class ImmutableItemWrapper extends React.PureComponent {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}

export default withTranslationContext(FlatFeed);
