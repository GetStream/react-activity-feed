// @flow
import * as React from 'react';

type Props = {|
  children: React.Node,
|};

export default class Flex extends React.Component<Props> {
  render() {
    return <div className="raf-flex">{this.props.children}</div>;
  }
}
