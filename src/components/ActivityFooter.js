// @flow
import * as React from 'react';
// import ReactionIcon from './ReactionIcon';
import LikeButton from './LikeButton';
import RepostButton from './RepostButton';
import Flex from './Flex';

export type Props = {|
  children: React.Node,
  activity: any,
  onToggleReaction: any,
  children?: React.Node,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ActivityFooter.md
 */
export default class ActivityFooter extends React.Component<Props> {
  render() {
    return (
      <div className="raf-activity-footer">
        <div className="raf-activity-footer__left" />
        <div className="raf-activity-footer__right">
          <Flex vcenter>
            <LikeButton {...this.props} />
            <RepostButton {...this.props} />
          </Flex>
        </div>
      </div>
    );
  }
}
