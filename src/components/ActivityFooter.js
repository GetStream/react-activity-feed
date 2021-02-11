import * as React from 'react';
// import ReactionIcon from './ReactionIcon';
import LikeButton from './LikeButton';
import RepostButton from './RepostButton';
import Flex from './Flex';

/**
 * Wrapper with LikeButton and Repost Button used by the Standard Activity.
 *
 * @example ./examples/ActivityFooter.md
 */
export default class ActivityFooter extends React.Component {
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
