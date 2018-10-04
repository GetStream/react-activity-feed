// @flow
import * as React from 'react';
// import ReactionIcon from './ReactionIcon';
import LikeButton from './LikeButton';
import RepostButton from './RepostButton';

export type Props = {|
  children: React.Node,
  activity: any,
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
        <div className="raf-activity-footer__left" style={{ flex: '1' }}>
          {/* <ReactionIcon
            icon="https://placehold.it/22x22"
            inactiveIcon="https://placehold.it/22x22"
            activeIcon="https://placehold.it/22x22"
            labelSingle="comment"
            labelPlural="comments"
            kind="comment"
            counts={{ comment: 899892 }}
            own_reactions={{ comment: [] }}
            onToggleReaction={() => console.log('test')}
          /> */}
        </div>
        <div className="raf-activity-footer__right" style={{ display: 'flex' }}>
          <LikeButton
            activity={this.props.activity}
            onToggleReaction={() => console.log('test')}
          />
          <RepostButton
            activity={this.props.activity}
            onToggleReaction={() => console.log('test')}
          />
        </div>
      </div>
    );
  }
}
