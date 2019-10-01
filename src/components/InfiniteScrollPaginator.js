//@flow
import * as React from 'react';
import InfiniteScroll from './InfiniteScroll';
import { LoadingIndicator } from 'react-file-utils';

import { smartRender } from '../utils';

import type { Renderable } from '../types';

type Props = {|
  /** callback to load the next page */
  loadNextPage: () => mixed,
  getScrollParent: () => mixed,
  /** indicates if there is a next page to load */
  hasNextPage: boolean,
  /** indicates if there there's currently any refreshing taking place */
  refreshing: boolean,
  /** display the items in opposite order */
  reverse: boolean,
  /** threshold to trigger the loadNextPage */
  threshold: number,
  /** The paginated content to display */
  children: React.Node,
  /** Component to show when paginator is loading **/
  Loader: Renderable,
  /** If false, scroll listeners will be attached to the parent element instead of the window  **/
  useWindow: boolean,
|};

export default class InfiniteScrollPaginator extends React.Component<Props> {
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
        loader={
          <React.Fragment key="loading-indicator">
            {smartRender(this.props.Loader)}
          </React.Fragment>
        }
      >
        {this.props.children}
      </InfiniteScroll>
    );
  }
}
