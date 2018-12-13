// @flow

import React from 'react';
import ReactionIcon from './ReactionIcon';
import type { ReactionCounts, ReactionKindMap } from 'getstream';

type Props = {|
  /** The icon to show when the user has done this reaction (e.g. a filled in heart) */
  activeIcon: string,
  /** The icon to show when the user has not done this reaction yet (e.g. an empty in heart) */
  inactiveIcon: string,
  /** The kind of reaction that this toggles */
  kind: string,
  /** The height of the icon */
  height?: number,
  /** The width of the icon */
  width?: number,
  /** The map with own reactions */
  own_reactions: ?ReactionKindMap<{}, {}>,
  /** The reaction counts for the activity */
  counts?: ReactionCounts,
  /** Function to call when pressed, usually this should call
   * `props.onToggleReaction` */
  onPress?: (kind: string) => any,
  /** The label to display if the count is one (e.g "like") */
  labelSingle?: string,
  /** The label to display if the count is more than one (e.g "likes") */
  labelPlural?: string,
|};

/**
 * A generic component that can be used to toggle a reaction and display it's
 * current state. Mostly used for reactions such as like and repost.
 * The [source for
 * LikeButton](https://github.com/GetStream/react-activity-feed/blob/master/src/components/LikeButton.js)
 * is a good example of the usage of this component.
 *
 * @example ./examples/ReactionToggleIcon.md
 */
export default class ReactionToggleIcon extends React.Component<Props> {
  render() {
    const {
      inactiveIcon,
      activeIcon,
      own_reactions,
      kind,
      ...restProps
    } = this.props;
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
