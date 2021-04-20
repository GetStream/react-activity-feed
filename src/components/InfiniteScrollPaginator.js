import React from 'react';
import { InfiniteScroll } from './InfiniteScroll';
import { LoadingIndicator } from 'react-file-utils';

import { smartRender } from '../utils';

export default class InfiniteScrollPaginator extends React.Component {
  static defaultProps = {
    Loader: <LoadingIndicator />,
    threshold: 250,
    useWindow: true,
  };

  render() {
    return (
      <InfiniteScroll
        loadMore={this.props.loadNextPage}
        hasMore={this.props.hasNextPage}
        isLoading={this.props.refreshing}
        isReverse={this.props.reverse}
        threshold={this.props.threshold}
        getScrollParent={this.props.getScrollParent}
        useWindow={this.props.useWindow}
        loader={<React.Fragment key="loading-indicator">{smartRender(this.props.Loader)}</React.Fragment>}
      >
        {this.props.children}
      </InfiniteScroll>
    );
  }
}
