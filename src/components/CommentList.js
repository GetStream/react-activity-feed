//@flow
import React from 'react';
import ReactionList from './ReactionList';
import CommentItem from './CommentItem';
import { smartRender } from '../utils';
import type { BaseReactionMap, Renderable, Comment } from '../types';

export type Props = {|
  reactions: BaseReactionMap,
  CommentItem: Renderable,
|};

/**
 * CommentList uses ReactionList under the hood to render a list of comments.
 *
 * @example ./examples/CommentList.md
 */
export default class CommentList extends React.Component<Props> {
  static defaultProps = {
    CommentItem,
  };

  _Reaction = ({ reaction }: { reaction: Comment }) =>
    smartRender(this.props.CommentItem, { comment: reaction });
  render() {
    const { reactions } = this.props;
    return (
      <React.Fragment>
        <ReactionList
          reactionKind={'comment'}
          reactions={reactions}
          Reaction={this._Reaction}
        />
      </React.Fragment>
    );
  }
}
