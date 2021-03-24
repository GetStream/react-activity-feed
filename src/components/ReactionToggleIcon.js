import React from 'react';
import { ReactionIcon } from './ReactionIcon';

/**
 * A generic component that can be used to toggle a reaction and display it's
 * current state. Mostly used for reactions such as like and repost.
 * The [source for
 * LikeButton](https://github.com/GetStream/react-activity-feed/blob/master/src/components/LikeButton.js)
 * is a good example of the usage of this component.
 *
 * @example ./examples/ReactionToggleIcon.md
 */
export default class ReactionToggleIcon extends React.Component {
  render() {
    const { inactiveIcon, activeIcon, own_reactions, kind, ...restProps } = this.props;
    let icon = inactiveIcon;
    if (own_reactions && own_reactions[kind] && own_reactions[kind].length) {
      icon = activeIcon;
    }
    return (
      <div className="raf-reaction-toggle-icon">
        <ReactionIcon icon={icon} kind={kind} {...restProps} />
      </div>
    );
  }
}
