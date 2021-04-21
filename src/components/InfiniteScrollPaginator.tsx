import React, { PropsWithChildren } from 'react';
import { LoadingIndicator as DefaultLoadingIndicator } from 'react-file-utils';

import { InfiniteScroll } from './InfiniteScroll';
import { ElementOrComponentOrLiteralType, smartRender } from '../utils';

export type InfiniteScrollPaginatorProps = PropsWithChildren<{
  /** callback to load the next page */
  loadNextPage: () => void;
  /** indicates if there is a next page to load */
  hasNextPage?: boolean;
  /** the loading indicator to use */
  Loader?: ElementOrComponentOrLiteralType;
  /** indicates if there there's currently any refreshing taking place */
  refreshing?: boolean;
  /** display the items in opposite order */
  reverse?: boolean;
  /** offset from when to start the loadNextPage call */
  threshold?: number;
  /** use Window as parent scrolling container */
  useWindow?: boolean;
}>;

export const InfiniteScrollPaginator = (props: InfiniteScrollPaginatorProps) => {
  const {
    children,
    hasNextPage,
    Loader = DefaultLoadingIndicator,
    loadNextPage,
    refreshing,
    reverse,
    threshold,
    useWindow,
  } = props;

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      isLoading={refreshing}
      isReverse={reverse}
      loader={<React.Fragment key="loading-indicator">{smartRender(Loader)}</React.Fragment>}
      loadMore={loadNextPage}
      threshold={threshold}
      useWindow={useWindow}
    >
      {children}
    </InfiniteScroll>
  );
};
