import * as React from 'react';
import { StreamApp, Streami18Ctx, withTranslationContext } from '../Context';
import repostButtonActive from '../images/repost-active@1x.png';
import repostButtonInactive from '../images/repost@1x.png';
import { BaseActivityResponse, ToggleReactionCallbackFunction } from '../types';
import ReactionToggleIcon from './ReactionToggleIcon';

type Props = {
  /** The feed group part of the feed that the activity should be reposted to,
   * e.g. `user` when posting to your own profile */
  feedGroup: string;

  /** The user_id part of the feed that the activity should be reposted to  */
  userId?: string;

  /** The activity received for stream for which to show the like buton. This is
   * used to initalize the toggle state and the counter. */
  activity: BaseActivityResponse;

  /** The function that toggles the reaction. */
  onToggleReaction: ToggleReactionCallbackFunction;
};

/**
 * A repost button ready to be embedded as Activity footer
 * @example ./examples/RepostButton.md
 */
class RepostButton extends React.Component<Props & Streami18Ctx> {
  static defaultProps = {
    feedGroup: 'user',
  };

  render() {
    if (this.props.userId != null) {
      return <RepostButtonInner {...(this.props as any)} />; // TODO resolve type issue
    }
    return (
      <StreamApp.Consumer>
        {(appCtx) => (
          <RepostButtonInner {...this.props} userId={(appCtx.user as any).id} /> // TODO resolve custom type issue
        )}
      </StreamApp.Consumer>
    );
  }
}

type PropsInner = Props & {
  userId: string;
};
class RepostButtonInner extends React.Component<PropsInner> {
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

export default withTranslationContext<Props>(RepostButton);
