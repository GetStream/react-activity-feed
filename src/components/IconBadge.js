// @flow
import * as React from 'react';
import '../styles/IconBadge.css';

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
 * Component is described here.
 *
 * @example ./examples/IconBadge.md
 */
export default class IconBadge extends React.Component<Props> {
  render() {
    return (
      <div
        className="raf-icon-badge"
        role="button"
        onClick={this.props.onClick}
      >
        {this.props.children ? (
          this.props.children
        ) : (
          <svg
            width="17"
            height="20"
            viewBox="0 0 17 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6.5-6V8.5c0-3.07-2.13-5.64-5-6.32V1.5C10 .67 9.33 0 8.5 0S7 .67 7 1.5v.68c-2.87.68-5 3.25-5 6.32V14l-2 2v1h17v-1l-2-2zm-2 1H4V8.5C4 6.01 6.01 4 8.5 4S13 6.01 13 8.5V15z"
              fill="#414D54"
              fillRule="evenodd"
            />
          </svg>
        )}
        {!this.props.hidden && this.props.unseen > 0 ? (
          <div className="raf-icon-badge__badge">
            {this.props.showNumber ? <p>{this.props.unseen}</p> : null}
          </div>
        ) : null}
      </div>
    );
  }
}
