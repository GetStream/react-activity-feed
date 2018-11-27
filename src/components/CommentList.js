//@flow
import React from 'react';
import ReactionList from './ReactionList';
import CommentItem from './CommentItem';
import { smartRender } from '../utils';
import type { Renderable, Comment } from '../types';

export type Props = {|
  /** The ID of the activity for which these comments are */
  activityId: string,
  /** The component that should render the comment */
  CommentItem: Renderable,
  /** Only needed for reposted activities where you want to */
  activityPath?: ?Array<string>,
|};

/**
 * CommentList uses ReactionList under the hood to render a list of comments.
 *
 * @example ./examples/CommentList.md
 */
export default class CommentList extends React.PureComponent<Props> {
  static defaultProps = {
    CommentItem,
  };

  _Reaction = ({ reaction }: { reaction: Comment }) =>
    smartRender(this.props.CommentItem, { comment: reaction });
  render() {
    const { activityId, activityPath } = this.props;
    return (
      <React.Fragment>
        <ReactionList
          activityId={activityId}
          reactionKind={'comment'}
          Reaction={this._Reaction}
          activityPath={activityPath}
        />
      </React.Fragment>
    );
  }
}
