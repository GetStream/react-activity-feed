// @flow
import * as React from 'react';
// import ReactionIcon from './ReactionIcon';
import LikeButton from './LikeButton';
import RepostButton from './RepostButton';
import Flex from './Flex';
import type {
  BaseActivityResponse,
  ToggleReactionCallbackFunction,
} from '../types';

export type Props = {|
  /** The feed group part of the feed that the activity should be reposted to
   * when pressing the RepostButton, e.g. `user` when posting to your own
   * profile */
  feedGroup: string,
  /** The user_id part of the feed that the activity should be reposted to when
   * pressing the RepostButton */
  userId?: string,
  /** The activity received for stream for which to show the like buton. This is
   * used to initalize the toggle state and the counter. */
  activity: BaseActivityResponse,
  /** The function that toggles  reaction. */
  onToggleReaction: ToggleReactionCallbackFunction,
|};

/**
 * Wrapper with LikeButton and Repost Button used by the Standard Activity.
 *
 * @example ./examples/ActivityFooter.md
 */
export default class ActivityFooter extends React.Component<Props> {
  static defaultProps = {
    feedGroup: 'user',
  };

  render() {
    const { activity, onToggleReaction } = this.props;
    return (
      <div className="raf-activity-footer">
        <div className="raf-activity-footer__left" />
        <div className="raf-activity-footer__right">
          <Flex a="center">
            <LikeButton
              activity={activity}
              onToggleReaction={onToggleReaction}
            />
            <RepostButton {...this.props} />
          </Flex>
        </div>
      </div>
    );
  }
}
