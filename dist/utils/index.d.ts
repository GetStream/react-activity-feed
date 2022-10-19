import React, { MouseEvent, DetailedHTMLProps, HTMLAttributes } from 'react';
import { EnrichedUser, UR } from 'getstream';
import { TDateTimeParser } from '../i18n/Streami18n';
import { DefaultUT } from '../context/StreamApp';
export declare function isTimezoneAwareTimestamp(timestamp: string): boolean;
export declare function humanizeTimestamp(timestamp: string | number | Date, tDateTimeParser: TDateTimeParser): string;
export declare type UserOrDefaultReturnType<T extends UR = UR> = EnrichedUser<T> | (EnrichedUser<{
    name: 'Unknown';
    profileImage: '';
}> & {
    id: '!not-found';
});
export declare function userOrDefault<T extends UR = UR>(user?: EnrichedUser<T> | UserOrDefaultReturnType<T> | string | {
    error: string;
} | null): UserOrDefaultReturnType<T>;
export declare function generateRandomId(): string;
export declare function dataTransferItemsHaveFiles(items?: DataTransferItemList): boolean;
export declare function dataTransferItemsToFiles(items?: DataTransferItemList): Promise<(Blob | File)[]>;
export declare function inputValueFromEvent<T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement>(event?: React.SyntheticEvent<T> | undefined, targetFirst?: boolean | undefined): string | undefined;
export declare function sanitizeURL(url?: string): string | undefined;
export declare const trimURL: (url?: string | undefined) => string | undefined;
export declare type OnClickUserHandler<UT extends DefaultUT = DefaultUT> = (user: UserOrDefaultReturnType<UT>) => void;
export declare const useOnClickUser: <UT extends DefaultUT = DefaultUT, E extends HTMLElement | SVGGElement = HTMLImageElement | SVGSVGElement>(onClickUser?: OnClickUserHandler<UT> | undefined) => ((user?: UserOrDefaultReturnType<UT> | undefined) => (event: React.MouseEvent<E, globalThis.MouseEvent>) => void) | undefined;
export declare type PropsWithElementAttributes<T extends UR = UR, E extends HTMLElement = HTMLDivElement> = T & Pick<DetailedHTMLProps<HTMLAttributes<E>, E>, 'className' | 'style'>;
export * from './textRenderer';
export * from './smartRender';
//# sourceMappingURL=index.d.ts.map