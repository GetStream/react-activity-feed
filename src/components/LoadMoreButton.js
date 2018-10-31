//@flow
import * as React from 'react';

import Button from './Button';

type Props = {|
  onClick: () => mixed,
  refreshing: boolean,
  children: React.Node,
|};

export default class LoadMoreButton extends React.Component<Props> {
  static defaultProps = {
    children: 'Load more',
  };

  render() {
    return (
      <div className="raf-load-more-button">
        <Button
          onClick={this.props.onClick}
          buttonStyle="info"
          disabled={this.props.refreshing}
          loading={this.props.refreshing}
        >
          {this.props.children}
        </Button>
      </div>
    );
  }
}
