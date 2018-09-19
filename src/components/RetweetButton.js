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
 * @example ./examples/RetweetButton.md
 */
export default class RetweetButton extends React.Component<Props> {
  render() {
    let { activity, onToggleReaction } = this.props;

    return (
      <ReactionToggleIcon
        counts={activity.reaction_counts}
        own_reactions={activity.own_reactions}
        kind="retweet"
        onPress={() => onToggleReaction('retweet', activity, {})}
        activeIcon={'https://placehold.it/50x50'}
        inactiveIcon={'https://placehold.it/50x50'}
        labelSingle="retweet"
        labelPlural="retweets"
      />
    );
  }
}
