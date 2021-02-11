import * as React from 'react';
import ReactionToggleIcon from './ReactionToggleIcon';

import { StreamApp, withTranslationContext } from '../Context';

import repostButtonActive from '../images/repost-active@1x.png';
import repostButtonInactive from '../images/repost@1x.png';

/**
 * A repost button ready to be embedded as Activity footer
 * @example ./examples/RepostButton.md
 */

class RepostButton extends React.Component {
  static defaultProps = {
    feedGroup: 'user',
  };

  render() {
    if (this.props.userId != null) {
      return <RepostButtonInner {...this.props} />;
    }
    return (
      <StreamApp.Consumer>
        {(appCtx) => (
          <RepostButtonInner {...this.props} userId={appCtx.user.id} />
        )}
      </StreamApp.Consumer>
    );
  }
}

class RepostButtonInner extends React.Component {
  render() {
    const { feedGroup, userId, activity, onToggleReaction } = this.props;

    return (
      <ReactionToggleIcon
        counts={activity.reaction_counts}
        own_reactions={activity.own_reactions}
        kind="repost"
        onPress={() =>
          onToggleReaction(
            'repost',
            activity,
            {},
            { targetFeeds: [`${feedGroup}:${userId}`] },
          )
        }
        activeIcon={repostButtonActive}
        inactiveIcon={repostButtonInactive}
      />
    );
  }
}

export default withTranslationContext(RepostButton);
