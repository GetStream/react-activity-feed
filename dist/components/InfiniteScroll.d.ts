import React, { PropsWithChildren } from 'react';
export declare type InfiniteScrollProps = PropsWithChildren<{
    className?: string;
    element?: React.ElementType;
    hasMore?: boolean;
    initialLoad?: boolean;
    isLoading?: boolean;
    isReverse?: boolean;
    listenToScroll?: (offset: number, reverseOffset: number, threshold: number) => void;
    loader?: React.ReactNode;
    loadMore?: () => void;
    pageStart?: number;
    threshold?: number;
    useCapture?: boolean;
    useWindow?: boolean;
}>;
export declare const InfiniteScroll: React.ForwardRefExoticComponent<{
    className?: string | undefined;
    element?: React.ElementType<any> | undefined;
    hasMore?: boolean | undefined;
    initialLoad?: boolean | undefined;
    isLoading?: boolean | undefined;
    isReverse?: boolean | undefined;
    listenToScroll?: ((offset: number, reverseOffset: number, threshold: number) => void) | undefined;
    loader?: React.ReactNode;
    loadMore?: (() => void) | undefined;
    pageStart?: number | undefined;
    threshold?: number | undefined;
    useCapture?: boolean | undefined;
    useWindow?: boolean | undefined;
} & {
    children?: React.ReactNode;
} & React.RefAttributes<unknown>>;
//# sourceMappingURL=InfiniteScroll.d.ts.map