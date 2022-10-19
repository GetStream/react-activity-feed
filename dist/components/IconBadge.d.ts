import { PropsWithChildren, MouseEventHandler } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type IconBadgeProps = PropsWithChildren<PropsWithElementAttributes<{
    hidden?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    showNumber?: boolean;
    unseen?: number;
}>>;
export declare const IconBadge: ({ children, onClick, hidden, unseen, showNumber, className, style }: IconBadgeProps) => JSX.Element;
//# sourceMappingURL=IconBadge.d.ts.map