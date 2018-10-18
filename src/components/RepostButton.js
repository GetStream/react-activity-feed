// @flow
import * as React from 'react';
import ReactionToggleIcon from './ReactionToggleIcon';
import type {
  BaseActivityResponse,
  ToggleReactionCallbackFunction,
} from '../types';

type Props = {|
  activity: BaseActivityResponse,
  onToggleReaction: ToggleReactionCallbackFunction,
  children?: React.Node,
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
        activeIcon={require('../images/repost-active@1x.png')}
        inactiveIcon={require('../images/repost@1x.png')}
        labelSingle="repost"
        labelPlural="reposts"
      />
    );
  }
}
