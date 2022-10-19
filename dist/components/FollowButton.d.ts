import { MouseEvent } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type FollowButtonProps = PropsWithElementAttributes<{
    followed?: boolean;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}>;
export declare const FollowButton: ({ followed, onClick, className, style }: FollowButtonProps) => JSX.Element;
//# sourceMappingURL=FollowButton.d.ts.map