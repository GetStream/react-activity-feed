import { MouseEvent } from 'react';
import { RealTimeMessage } from 'getstream';
import { PropsWithElementAttributes } from '../utils';
declare type Attributes = {
    addCount: number;
    count: number;
    deleteCount: number;
    labelPlural?: string;
    labelSingle?: string;
};
export declare type LabelFunction = (attributes: Attributes) => string | null;
export declare type NewActivitiesNotificationProps = PropsWithElementAttributes<{
    adds?: RealTimeMessage['new'];
    deletes?: RealTimeMessage['deleted'];
    labelFunction?: LabelFunction;
    labelPlural?: string;
    labelSingle?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}, HTMLButtonElement>;
export declare const NewActivitiesNotification: ({ adds, deletes, labelPlural, labelSingle, onClick, labelFunction, className, style, }: NewActivitiesNotificationProps) => JSX.Element | null;
export {};
//# sourceMappingURL=NewActivitiesNotification.d.ts.map