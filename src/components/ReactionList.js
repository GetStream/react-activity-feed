// @flow
import * as React from 'react';
import LoadMorePaginator from './LoadMorePaginator';
import { FeedContext } from '../Context';
import type { Renderable, BaseFeedCtx } from '../types';
import { smartRender } from '../utils';

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
|};

export default class ReactionList extends React.PureComponent<Props> {
  static defaultProps = {
    Paginator: LoadMorePaginator,
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
  render() {
    const {
      activityId,
      activities,
      reactionKind,
      getActivityPath,
    } = this.props;

    const reactionsOfKind = activities.getIn(
      getActivityPath(activityId, 'latest_reactions', reactionKind),
    );

    const nextUrl = activities.getIn(
      getActivityPath(
        activityId,
        'latest_reactions_extra',
        reactionKind,
        'next',
      ),
      '',
    );

    const refreshing = activities.getIn(
      getActivityPath(
        activityId,
        'latest_reactions_extra',
        reactionKind,
        'refreshing',
      ),
      '',
    );

    return smartRender(this.props.Paginator, {
      loadNextPage: () =>
        this.props.loadNextReactions(activityId, reactionKind),
      hasNextPage: Boolean(nextUrl),
      refreshing,
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

class ImmutableItemWrapper extends React.PureComponent<
  ImmutableItemWrapperProps,
> {
  render() {
    return this.props.renderItem(this.props.item.toJS());
  }
}
