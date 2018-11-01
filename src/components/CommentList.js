//@flow
import React from 'react';
import ReactionList from './ReactionList';
import CommentItem from './CommentItem';
import { smartRender } from '../utils';
import type { BaseReactionMap, Renderable, Comment } from '../types';
import type { ReactionExtraKindMap } from 'getstream';

export type Props = {|
  /** The ID of the activity for which these comments are */
  activityId: string,
  /** Usually this should be activity.latest_reactions */
  reactions: ?BaseReactionMap,
  /** Usually this should be activity.latest_reactions_extra, this is needed
   * for pagination */
  reactionsExtra?: ?ReactionExtraKindMap,
  /** The component that should render the comment */
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
    const { activityId, reactions, reactionsExtra } = this.props;
    return (
      <React.Fragment>
        <ReactionList
          activityId={activityId}
          reactionKind={'comment'}
          reactions={reactions}
          reactionsExtra={reactionsExtra}
          Reaction={this._Reaction}
        />
      </React.Fragment>
    );
  }
}
