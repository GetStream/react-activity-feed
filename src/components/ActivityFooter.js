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
  render() {
    return (
      <div className="raf-activity-footer">
        <div className="raf-activity-footer__left" />
        <div className="raf-activity-footer__right">
          <Flex a="center">
            <LikeButton {...this.props} />
            <RepostButton {...this.props} />
          </Flex>
        </div>
      </div>
    );
  }
}
