import React, { ReactNode } from 'react';
import { LoadMoreButton as DefaultLoadMoreButton, LoadMoreButtonProps } from './LoadMoreButton';
import { ElementOrComponentOrLiteralType, smartRender } from '../utils';

export type LoadMorePaginatorProps = {
  /** The paginated content to display */
  children: ReactNode;
  /** indicates if there is a next page to load */
  hasNextPage: boolean;
  /** callback to load the next page */
  loadNextPage: LoadMoreButtonProps['onClick'];
  /** The button the user should click to click to load more
   * #LoadMoreButton (Component)#
   */
  LoadMoreButton?: ElementOrComponentOrLiteralType<LoadMoreButtonProps>;
  /** indicates if there there's currently any refreshing taking place */
  refreshing?: boolean;
  /** display the items in opposite order */
  reverse?: boolean;
};

export const LoadMorePaginator = ({
  LoadMoreButton = DefaultLoadMoreButton,
  children,
  reverse,
  hasNextPage,
  refreshing,
  loadNextPage,
}: LoadMorePaginatorProps) => (
  <>
    {!reverse && children}
    {hasNextPage && smartRender<LoadMoreButtonProps>(LoadMoreButton, { refreshing, onClick: loadNextPage })}
    {reverse && children}
  </>
);
