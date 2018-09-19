// @flow
import * as React from 'react';
// import '../styles/CloseButton.css';

export type Props = {|
  children?: React.Node,
  clickHandler?: () => mixed,
|};

/**
 * This is simply a button wrapper, add's a div with `role="button"` and a clickHandler
 * @example ./examples/IconButton.md
 */
export default class IconButton extends React.Component<Props> {
  render() {
    const { clickHandler, children } = this.props;
    return (
      <div className="raf-icon-button" role="button" onClick={clickHandler}>
        {children}
      </div>
    );
  }
}
