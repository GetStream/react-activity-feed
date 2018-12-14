// @flow
import * as React from 'react';
import type { ReactionCounts } from 'getstream';

type Props = {|
  /** The icon to display */
  icon: string | number,
  /** The reaction counts for the activity */
  counts?: ReactionCounts,
  /** The kind of reaction that this displays */
  kind: string,
  /** The height of the icon */
  height?: number,
  /** The width of the icon */
  width?: number,
  /** Function to call when pressed, usually this should call `props.onToggleReaction` */
  onPress?: (kind: string) => any,
  /** The label to display if the count is one (e.g "like") */
  labelSingle?: string,
  /** The label to display if the count is more than one (e.g "likes") */
  labelPlural?: string,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ReactionIcon.md
 */

export default class ReactionIcon extends React.Component<Props> {
  render() {
    let count = null;
    if (this.props.counts && this.props.kind) {
      count = this.props.counts[this.props.kind] || 0;
    }

    const dimensions = {};
    if (this.props.height !== undefined) {
      dimensions.height = this.props.height;
    }
    if (this.props.width !== undefined) {
      dimensions.width = this.props.width;
    }
    const label = count === 1 ? this.props.labelSingle : this.props.labelPlural;

    return (
      <div className="raf-reaction-icon" onClick={this.props.onPress}>
        {this.props.icon ? (
          <img
            className="raf-reaction-icon__image"
            src={this.props.icon}
            alt=""
          />
        ) : null}
        {count != null ? (
          <p className="raf-reaction-icon__label">
            {count}
            {label && ' ' + label}
          </p>
        ) : null}
      </div>
    );
  }
}
