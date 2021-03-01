import React from 'react';
import LoadMorePaginator from './LoadMorePaginator';
import { FeedContext } from '../Context';

import { smartRender } from '../utils';
import immutable from 'immutable';

export default class ReactionList extends React.PureComponent {
  static defaultProps = {
    Paginator: LoadMorePaginator,
    oldestToNewest: false,
    reverseOrder: false,
  };

  render() {
    return <FeedContext.Consumer>{(appCtx) => <ReactionListInner {...this.props} {...appCtx} />}</FeedContext.Consumer>;
  }
}

class ReactionListInner extends React.Component {
  componentDidMount() {
    const { activityId, activities, reactionKind, getActivityPath, oldestToNewest } = this.props;
    if (!oldestToNewest) {
      return;
    }

    const activityPath = this.props.activityPath || getActivityPath(activityId);
    const orderPrefix = 'oldest';
    const reactions_extra = activities.getIn([...activityPath, orderPrefix + '_reactions_extra']);
    if (reactions_extra) {
      return;
    }
    return this.props.loadNextReactions(activityId, reactionKind, activityPath, oldestToNewest);
  }

  render() {
    const { activityId, activities, reactionKind, getActivityPath, oldestToNewest, reverseOrder } = this.props;
    const activityPath = this.props.activityPath || getActivityPath(activityId);
    let orderPrefix = 'latest';
    if (oldestToNewest) {
      orderPrefix = 'oldest';
    }

    let reactionsOfKind = activities.getIn(
      [...activityPath, orderPrefix + '_reactions', reactionKind],
      immutable.List(),
    );
    if (reverseOrder) {
      reactionsOfKind = reactionsOfKind.reverse();
    }

    const reactions_extra = activities.getIn([...activityPath, orderPrefix + '_reactions_extra']);
    let nextUrl = 'https://api.stream-io-api.com/';
    if (reactions_extra) {
      nextUrl = reactions_extra.getIn([reactionKind, 'next'], '');
    }

    const refreshing = activities.getIn(
      [...activityPath, orderPrefix + '_reactions_extra', reactionKind, 'refreshing'],
      false,
    );

    return smartRender(this.props.Paginator, {
      loadNextPage: () => this.props.loadNextReactions(activityId, reactionKind, activityPath, oldestToNewest),
      hasNextPage: Boolean(nextUrl),
      refreshing,
      reverse: reverseOrder,
      children: (
        <React.Fragment>
          {reactionsOfKind.map((reaction) => (
            <ImmutableItemWrapper key={reaction.get('id')} item={reaction} renderItem={this.renderReaction} />
          ))}
        </React.Fragment>
      ),
    });
  }
  renderReaction = (reaction) => {
    const { Reaction } = this.props;

    return smartRender(Reaction, { reaction });
  };
}

class ImmutableItemWrapper extends React.PureComponent {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}
