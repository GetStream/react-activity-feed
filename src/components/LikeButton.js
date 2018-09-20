// @flow
import React from 'react';
import ReactionToggleIcon from './ReactionToggleIcon';
import type {
  BaseActivityResponse,
  ToggleReactionCallbackFunction,
} from '../types';

type Props = {|
  activity: BaseActivityResponse,
  onToggleReaction: ToggleReactionCallbackFunction,
  styles: any,
|};

/**
 * Like button ready to be embedded as Activity footer
 * @example ./examples/LikeButton.md
 */
export default class LikeButton extends React.Component<Props> {
  render() {
    const { activity, onToggleReaction } = this.props;

    return (
      <ReactionToggleIcon
        counts={activity.reaction_counts}
        own_reactions={activity.own_reactions}
        kind="like"
        onPress={() => onToggleReaction('like', activity, {})}
        activeIcon={require('../images/like-active@1x.png')}
        inactiveIcon={require('../images/like@1x.png')}
        labelSingle="like"
        labelPlural="likes"
      />
    );
  }
}
