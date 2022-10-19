import { PropsWithChildren, MouseEvent } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type LoadMoreButtonProps = PropsWithElementAttributes<PropsWithChildren<{
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    refreshing?: boolean;
}>>;
export declare const LoadMoreButton: ({ onClick, refreshing, children, className, style }: LoadMoreButtonProps) => JSX.Element;
//# sourceMappingURL=LoadMoreButton.d.ts.map