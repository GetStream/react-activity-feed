// @flow

import React from 'react';
import ReactionIcon from './ReactionIcon';
import type { ReactionCounts, ReactionKindMap } from 'getstream';

type Props = {|
  activeIcon: string,
  inactiveIcon: string,
  kind?: string,
  height?: number,
  width?: number,
  own_reactions: ?ReactionKindMap<{}, {}>,
  counts?: ReactionCounts,
  onPress?: (kind: ?string) => any,
  labelSingle?: string,
  labelPlural?: string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ReactionToggleIcon.md
 */
export default class ReactionToggleIcon extends React.Component<Props> {
  render() {
    let icon = this.props.inactiveIcon;
    if (
      this.props.own_reactions &&
      this.props.kind !== undefined &&
      this.props.own_reactions[this.props.kind] &&
      this.props.own_reactions[this.props.kind].length
    ) {
      icon = this.props.activeIcon;
    }
    return (
      <div className="raf-reaction-toggle-icon">
        <ReactionIcon icon={icon} kind={this.props.kind} {...this.props} />
      </div>
    );
  }
}
