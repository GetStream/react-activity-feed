import React, { MouseEventHandler } from 'react';
import { ElementOrComponentOrLiteralType, PropsWithElementAttributes } from '../utils';
export declare type UserBarProps = PropsWithElementAttributes<{
    username: string;
    AfterUsername?: React.ReactNode;
    avatar?: string;
    follow?: boolean;
    icon?: string;
    onClickUser?: MouseEventHandler;
    Right?: ElementOrComponentOrLiteralType;
    subtitle?: string;
    time?: string;
    timestamp?: string | number | Date;
}>;
export declare const UserBar: ({ time, timestamp, Right, subtitle, icon, AfterUsername, username, onClickUser, avatar, className, style, }: UserBarProps) => JSX.Element;
//# sourceMappingURL=UserBar.d.ts.map