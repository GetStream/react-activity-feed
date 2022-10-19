import { MouseEvent, PropsWithChildren } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type LinkProps = PropsWithElementAttributes<PropsWithChildren<{
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    to?: string;
}>, HTMLAnchorElement>;
export declare const Link: ({ to, children, onClick, className, style }: LinkProps) => JSX.Element;
//# sourceMappingURL=Link.d.ts.map