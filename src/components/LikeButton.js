import * as React from 'react';
import ReactionToggleIcon from './ReactionToggleIcon';

import likebuttonActive from '../images/like-active@1x.png';
import likebuttonInactive from '../images/like@1x.png';

/**
 * Like button ready to be embedded as Activity footer
 * @example ./examples/LikeButton.md
 */
export default class LikeButton extends React.Component {
  _onPress = () => {
    const {
      activity,
      reaction,
      onToggleReaction,
      onToggleChildReaction,
    } = this.props;

    if (reaction && onToggleChildReaction) {
      return onToggleChildReaction('like', reaction, {}, {});
    }
    return onToggleReaction('like', activity, {}, {});
  };

  render() {
    const { activity, reaction } = this.props;
    let counts, own_reactions;
    if (reaction && this.props.onToggleChildReaction) {
      counts = reaction.children_counts;
      own_reactions = reaction.own_children;
    } else {
      if (reaction) {
        console.warn(
          'reaction is passed to the LikeButton but ' +
            'onToggleChildReaction is not, falling back to liking the activity',
        );
      }
      counts = activity.reaction_counts;
      own_reactions = activity.own_reactions;
    }

    return (
      <ReactionToggleIcon
        counts={counts}
        own_reactions={own_reactions}
        kind="like"
        onPress={this._onPress}
        activeIcon={likebuttonActive}
        inactiveIcon={likebuttonInactive}
        labelSingle="like"
        labelPlural="likes"
      />
    );
  }
}
