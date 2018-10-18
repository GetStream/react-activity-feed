// @flow
import React from 'react';
import ReactionToggleIcon from './ReactionToggleIcon';
import type {
  BaseActivityResponse,
  ToggleReactionCallbackFunction,
} from '../types';

import repostButtonActive from '../images/repost-active@1x.png';
import repostButtonInactive from '../images/repost@1x.png';

type Props = {|
  activity: BaseActivityResponse,
  onToggleReaction: ToggleReactionCallbackFunction,
|};

/**
 * Like button ready to be embedded as Activity footer
 * @example ./examples/RepostButton.md
 */
export default class RepostButton extends React.Component<Props> {
  render() {
    const { activity, onToggleReaction } = this.props;

    return (
      <ReactionToggleIcon
        counts={activity.reaction_counts}
        own_reactions={activity.own_reactions}
        kind="repost"
        onPress={() => onToggleReaction('repost', activity, {})}
        activeIcon={repostButtonActive}
        inactiveIcon={repostButtonInactive}
        labelSingle="repost"
        labelPlural="reposts"
      />
    );
  }
}
