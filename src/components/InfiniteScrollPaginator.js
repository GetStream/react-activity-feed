//@flow
import * as React from 'react';
import InfiniteScroll from './InfiniteScroll';
import LoadingIndicator from './LoadingIndicator';

type Props = {|
  /** callback to load the next page */
  loadNextPage: () => mixed,
  /** indicates if there is a next page to load */
  hasNextPage: boolean,
  /** indicates if there there's currently any refreshing taking place */
  refreshing: boolean,
  /** display the items in opposite order */
  reverse: boolean,
  /** The paginated content to display */
  children: React.Node,
|};

export default class InfiniteScrollPaginator extends React.Component<Props> {
  render() {
    return (
      <InfiniteScroll
        loadMore={this.props.loadNextPage}
        hasMore={this.props.hasNextPage}
        isLoading={this.props.refreshing}
        isReverse={this.props.reverse}
        loader={<LoadingIndicator key={'loading-indicator'} />}
      >
        {this.props.children}
      </InfiniteScroll>
    );
  }
}
