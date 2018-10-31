// @flow
import * as React from 'react';
import type { Renderable, BaseReactionMap } from '../types';
import { smartRender } from '../utils';

type Props = {|
  reactions: ?BaseReactionMap,
  reactionKind: string,
  Reaction: Renderable,
  children?: React.Node,
|};
export default class ReactionList extends React.Component<Props> {
  render() {
    const { reactions, reactionKind, Reaction } = this.props;

    if (!reactions) {
      return null;
    }

    const reactionsOfKind = reactions[reactionKind] || [];

    if (!reactionsOfKind.length) {
      return null;
    }

    return (
      <React.Fragment>
        {reactionsOfKind.map((reaction) => (
          <React.Fragment key={reaction.id}>
            {smartRender(Reaction, { reaction })}
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}
