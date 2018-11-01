// @flow
import * as React from 'react';
import LoadMorePaginator from './LoadMorePaginator';
import URL from 'url-parse';
import { StreamApp } from '../Context';
import type {
  Renderable,
  BaseReactionMap,
  BaseAppCtx,
  BaseReaction,
} from '../types';
import { smartRender } from '../utils';
import type { ReactionExtraKindMap } from 'getstream';

type Props = {|
  /** The ID of the activity for which these reactions are */
  activityId: string,
  /** Usually this should be activity.latest_reactions */
  reactions: ?BaseReactionMap,
  /** Usually this should be activity.latest_reactions_extra, this is needed
   * to continue pagination */
  reactionsExtra?: ?ReactionExtraKindMap,
  /** The reaction kind that you want to display in this list, e.g `like` or
   * `comment` */
  reactionKind: string,
  /** The component that should render the reaction */
  Reaction: Renderable,
  /** By default pagination is done with a "Load more" button, you can use
   * InifiniteScrollPaginator to enable infinite scrolling */
  Paginator: Renderable,
|};

export default class ReactionList extends React.Component<Props> {
  static defaultProps = {
    Paginator: LoadMorePaginator,
  };

  render() {
    return (
      <StreamApp.Consumer>
        {(appCtx) => <ReactionListInner {...this.props} {...appCtx} />}
      </StreamApp.Consumer>
    );
  }
}

type State = {
  retrievedReactions: Array<BaseReaction>,
  refreshing: boolean,
  nextUrl: string,
};

function getNextUrlFromReactionsExtra(extra, kind) {
  if (extra && extra[kind]) {
    return extra[kind].next;
  }
  return '';
}

type PropsInner = {| ...Props, ...BaseAppCtx |};
class ReactionListInner extends React.Component<PropsInner, State> {
  state = {
    refreshing: false,
    nextUrl: getNextUrlFromReactionsExtra(
      this.props.reactionsExtra,
      this.props.reactionKind,
    ),
    retrievedReactions: [],
  };

  loadNextPage = async () => {
    const { nextUrl } = this.state;
    if (!this.state.nextUrl || this.state.refreshing) {
      return;
    }

    this.setState({ refreshing: true });
    const options = {
      ...URL(nextUrl, true).query,
      activity_id: this.props.activityId,
      kind: this.props.reactionKind,
    };

    let response;
    try {
      response = await this.props.session.reactions.filter(options);
    } catch (e) {
      this.setState({ refreshing: false });
      this.props.errorHandler(e, 'get-reactions-next-page', {
        options,
      });
      return;
    }
    this.setState((prevState) => ({
      refreshing: false,
      nextUrl: response.next,
      retrievedReactions: prevState.retrievedReactions.concat(response.results),
    }));
  };

  render() {
    const { reactions, reactionKind, Reaction } = this.props;

    if (!reactions) {
      return null;
    }

    const reactionsOfKind = reactions[reactionKind] || [];

    if (!reactionsOfKind.length) {
      return null;
    }

    return smartRender(this.props.Paginator, {
      loadNextPage: this.loadNextPage,
      hasNextPage: Boolean(this.state.nextUrl),
      refreshing: this.state.refreshing,
      children: reactionsOfKind
        .concat(this.state.retrievedReactions)
        .map((reaction) => (
          <React.Fragment key={reaction.id}>
            {smartRender(Reaction, { reaction })}
          </React.Fragment>
        )),
    });
  }
}
