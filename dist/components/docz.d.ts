import React, { FC } from 'react';
import { NotificationProps } from './Notification';
export declare const WithExampleStreamApp: FC;
export declare const notificationGroup1: NotificationProps['activityGroup'];
export declare const notificationGroup2: NotificationProps['activityGroup'];
export declare const resolveAfter: (duration: number) => Promise<unknown>;
declare type StatefulComponentProps<T> = {
    children: (renderProps: {
        setState: React.Dispatch<React.SetStateAction<T>>;
        state: T;
    }) => JSX.Element;
    initialValue: T;
};
export declare const StatefulComponent: <T extends unknown>({ children, initialValue }: StatefulComponentProps<T>) => JSX.Element;
export {};
//# sourceMappingURL=docz.d.ts.map