import { PropsWithChildren } from 'react';
import { ElementOrComponentOrLiteralType } from '../utils';
export declare type InfiniteScrollPaginatorProps = PropsWithChildren<{
    /** indicates if there is a next page to load */
    hasNextPage?: boolean;
    /** the loading indicator to use */
    Loader?: ElementOrComponentOrLiteralType;
    /** callback to load the next page */
    loadNextPage?: () => void;
    /** indicates if there there's currently any refreshing taking place */
    refreshing?: boolean;
    /** display the items in opposite order */
    reverse?: boolean;
    /** offset from when to start the loadNextPage call */
    threshold?: number;
    /** use Window as parent scrolling container */
    useWindow?: boolean;
}>;
export declare const InfiniteScrollPaginator: (props: InfiniteScrollPaginatorProps) => JSX.Element;
//# sourceMappingURL=InfiniteScrollPaginator.d.ts.map