// @flow
import * as React from 'react';
import '../App.css';
import '../styles/IconBadge.css';

export type Props = {|
  children: React.Node,
  showNumber?: boolean,
  hidden?: boolean,
  feedGroup?: string,
  userId?: string,
  unseen: number,
|};

/**
 * Component is described here.
 *
 * @example ./examples/IconBadge.md
 */
export default class IconBadge extends React.Component<Props> {
  render() {
    return (
      <div className="raf-icon-badge">
        {this.props.children}
        {!this.props.hidden && this.props.unseen > 0 ? (
          <div className="raf-icon-badge__badge">
            {this.props.showNumber ? <p>{this.props.unseen}</p> : null}
          </div>
        ) : null}
      </div>
    );
  }
}
