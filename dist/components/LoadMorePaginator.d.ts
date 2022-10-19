import { ReactNode } from 'react';
import { LoadMoreButtonProps } from './LoadMoreButton';
import { ElementOrComponentOrLiteralType } from '../utils';
export declare type LoadMorePaginatorProps = {
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
export declare const LoadMorePaginator: ({ LoadMoreButton, children, reverse, hasNextPage, refreshing, loadNextPage, }: LoadMorePaginatorProps) => JSX.Element;
//# sourceMappingURL=LoadMorePaginator.d.ts.map