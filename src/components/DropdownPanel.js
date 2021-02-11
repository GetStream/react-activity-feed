import * as React from 'react';
import { smartRender } from '../utils';

/**
 * `DropdownPanel` is a more advanced component used to create a notification dropdown for instance, it comes with three parts: `Header`, `Content` and `Footer`. The content has a limited height and the `overflow` is set to `scroll`.
 *
 * @example ./examples/DropdownPanel.md
 */
export default class DropdownPanel extends React.Component {
  static defaultProps = {
    arrow: false,
    left: true,
    right: false,
  };

  render() {
    return (
      <div
        className={`raf-dropdown-panel ${
          this.props.arrow ? ' raf-dropdown-panel--arrow' : ''
        } ${
          this.props.right
            ? ' raf-dropdown-panel--right raf-dropdown-panel--arrow-right'
            : 'raf-dropdown-panel--left raf-dropdown-panel--arrow-left'
        }`}
      >
        {this.props.Header != null && (
          <div className="raf-dropdown-panel__header">
            {smartRender(this.props.Header, {}, null)}
          </div>
        )}
        <div className="raf-dropdown-panel__content">{this.props.children}</div>
        {this.props.Footer != null && (
          <div className="raf-dropdown-panel__footer">
            {smartRender(this.props.Footer, {}, null)}
          </div>
        )}
      </div>
    );
  }
}
