// @flow
import * as React from 'react';
import LoadMorePaginator from './LoadMorePaginator';
import { FeedContext } from '../Context';
import type { Renderable, BaseFeedCtx } from '../types';
import { smartRender } from '../utils';
import immutable from 'immutable';

type Props = {|
  /** The ID of the activity for which these reactions are */
  activityId: string,
  /** The reaction kind that you want to display in this list, e.g `like` or
   * `comment` */
  reactionKind: string,
  /** The component that should render the reaction */
  Reaction: Renderable,
  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator: Renderable,
  /** Only needed for reposted activities where you want to show the reactions
   * of the original activity, not of the repost */
  activityPath?: ?Array<string>,
  /** Show and load reactions starting with the oldest reaction first, instead
   * of the default where reactions are displayed and loaded most recent first.
   * */
  oldestToNewest: boolean,
  /** Reverse the order the reactions are displayed in. */
  reverseOrder: boolean,
|};

export default class ReactionList extends React.PureComponent<Props> {
  static defaultProps = {
    Paginator: LoadMorePaginator,
    oldestToNewest: false,
    reverseOrder: false,
  };

  render() {
    return (
      <FeedContext.Consumer>
        {(appCtx) => <ReactionListInner {...this.props} {...appCtx} />}
      </FeedContext.Consumer>
    );
  }
}

type PropsInner = {| ...Props, ...BaseFeedCtx |};
class ReactionListInner extends React.Component<PropsInner> {
  componentDidMount() {
    const {
      activityId,
      activities,
      reactionKind,
      getActivityPath,
      oldestToNewest,
    } = this.props;
    if (!oldestToNewest) {
      return;
    }

    const activityPath = this.props.activityPath || getActivityPath(activityId);
    const orderPrefix = 'oldest';
    const reactions_extra = activities.getIn([
      ...activityPath,
      orderPrefix + '_reactions_extra',
    ]);
    if (reactions_extra) {
      return;
    }
    return this.props.loadNextReactions(
      activityId,
      reactionKind,
      activityPath,
      oldestToNewest,
    );
  }

  render() {
    const {
      activityId,
      activities,
      reactionKind,
      getActivityPath,
      oldestToNewest,
      reverseOrder,
    } = this.props;
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

    const reactions_extra = activities.getIn([
      ...activityPath,
      orderPrefix + '_reactions_extra',
    ]);
    let nextUrl = 'https://api.stream-io-api.com/';
    if (reactions_extra) {
      nextUrl = reactions_extra.getIn([reactionKind, 'next'], '');
    }

    const refreshing = activities.getIn(
      [
        ...activityPath,
        orderPrefix + '_reactions_extra',
        reactionKind,
        'refreshing',
      ],
      false,
    );

    return smartRender(this.props.Paginator, {
      loadNextPage: () =>
        this.props.loadNextReactions(
          activityId,
          reactionKind,
          activityPath,
          oldestToNewest,
        ),
      hasNextPage: Boolean(nextUrl),
      refreshing,
      reverse: reverseOrder,
      children: (
        <React.Fragment>
          {reactionsOfKind.map((reaction) => (
            <ImmutableItemWrapper
              key={reaction.get('id')}
              item={reaction}
              renderItem={this.renderReaction}
            />
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

type ImmutableItemWrapperProps = {
  renderItem: (item: any) => any,
  item: any,
};

class ImmutableItemWrapper extends React.PureComponent<ImmutableItemWrapperProps> {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}
