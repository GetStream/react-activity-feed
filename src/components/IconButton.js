// @flow
import * as React from 'react';

export type Props = {|
  children?: React.Node,
  onClick?: () => mixed,
|};

/**
 * This is simply a button wrapper, add's a div with `role="button"` and a onClick
 * @example ./examples/IconButton.md
 */
export default class IconButton extends React.Component<Props> {
  render() {
    const { onClick, children } = this.props;
    return (
      <div className="raf-icon-button" role="button" onClick={onClick}>
        {children}
      </div>
    );
  }
}
