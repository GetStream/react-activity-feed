import React, { ReactNode, PropsWithChildren } from 'react';
import StreamAnalytics from 'stream-analytics';
import { UR, StreamClient, StreamUser, ClientOptions, OGAPIResponse, GetFeedOptions } from 'getstream';
import { FeedManager } from './FeedManager';
import { ErrorHandler } from '../utils/errors';
import { Streami18n } from '../i18n/Streami18n';
export declare type SharedFeedManagers<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = Record<string, FeedManager<UT, AT, CT, RT, CRT, PT>>;
declare type Attachments = {
    files?: Array<{
        mimeType: string;
        name: string;
        url: string;
    }>;
    images?: string[];
    og?: OGAPIResponse;
};
export declare type DefaultUT = UR & {
    name: string;
    id?: string;
    profileImage?: string;
};
export declare type DefaultAT = UR & {
    attachments?: Attachments;
    text?: string;
};
export declare type SharedFeed = {
    feedGroup: string;
    notify: boolean;
    options: GetFeedOptions;
};
export declare type StreamAppProps<UT extends DefaultUT = DefaultUT> = {
    apiKey: string;
    appId: string;
    token: string;
    analyticsToken?: string;
    children?: ReactNode;
    defaultUserData?: UT;
    errorHandler?: ErrorHandler;
    i18nInstance?: Streami18n;
    options?: ClientOptions;
    sharedFeeds?: Array<SharedFeed>;
};
export declare type StreamContextValue<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = {
    analyticsClient: null | StreamAnalytics<UT>;
    client: null | StreamClient<UT, AT, CT, RT, CRT, PT>;
    errorHandler: ErrorHandler;
    sharedFeedManagers: SharedFeedManagers<UT, AT, CT, RT, CRT, PT>;
    user?: StreamUser<UT>;
    userData?: UT;
};
export declare const StreamContext: React.Context<StreamContextValue<DefaultUT, DefaultAT, UR, UR, UR, UR>>;
export declare const StreamAppProvider: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ children, value, }: React.PropsWithChildren<{
    value: StreamContextValue<UT, AT, CT, RT, CRT, PT>;
}>) => JSX.Element;
export declare const useStreamContext: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>() => StreamContextValue<UT, AT, CT, RT, CRT, PT>;
/**
 * Manages the connection with Stream. Any components that should talk to
 * Stream should be a child of this component.
 */
export declare function StreamApp<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ apiKey, appId, errorHandler, i18nInstance, token, analyticsToken, children, defaultUserData, options, sharedFeeds, }: StreamAppProps<UT>): JSX.Element | null;
export {};
//# sourceMappingURL=StreamApp.d.ts.map