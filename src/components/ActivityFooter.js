// @flow
import * as React from 'react';

export type Props = {|
  children: React.Node,
|};

/**
 * Component is described here.
 *
 * @example ./examples/ActivityFooter.md
 */
export default class ActivityFooter extends React.Component<Props> {
  render() {
    return <div className="raf-activity-footer">{this.props.children}</div>;
  }
}
