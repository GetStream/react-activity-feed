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
        {reactionsOfKind.map((item, i) => (
          <div key={`reaction-${reactionKind}-${i}`}>
            <React.Fragment>{smartRender(Reaction, item)}</React.Fragment>
          </div>
        ))}
      </React.Fragment>
    );
  }
}
