// @flow
import * as React from 'react';
import bell from '../images/bell.svg';

export type Props = {|
  children?: React.Node,
  showNumber?: boolean,
  hidden?: boolean,
  feedGroup?: string,
  userId?: string,
  unseen: number,
  onClick?: () => mixed,
|};

/**
 *
 * @example ./examples/IconBadge.md
 */
export default class IconBadge extends React.Component<Props> {
  render() {
    return (
      <div
        className="notify rounded-circle cursor"
        role="button"
        onClick={this.props.onClick}
      >
        {this.props.children ? this.props.children : <img src={bell} alt="" />}
        {!this.props.hidden && this.props.unseen > 0 ? (
          <div className="notify-number position-absolute rounded-circle">
            {this.props.showNumber ? this.props.unseen : null}
          </div>
        ) : null}
      </div>
    );
  }
}
