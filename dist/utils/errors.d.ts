import { StreamApiError, UR } from 'getstream';
export declare type NetworkRequestTypes = 'get-user-info' | 'get-feed' | 'get-feed-next-page' | 'get-reactions-next-page' | 'get-notification-counts' | 'upload-image' | 'upload-file' | 'get-og' | 'add-activity' | 'delete-activity' | 'add-reaction' | 'delete-reaction' | 'add-child-reaction' | 'delete-child-reaction';
declare type ErrorDetail = UR & {
    activity?: UR;
    activity_id?: string;
    activityId?: string;
    feedGroup?: string;
    kind?: string;
    options?: UR;
    reaction?: UR;
    userId?: string;
};
export declare type ErrorHandler = (error: Error | StreamApiError | unknown, type: NetworkRequestTypes, details: ErrorDetail) => void;
export declare const handleError: ErrorHandler;
export declare const getErrorMessage: ErrorHandler;
export declare const fallbackErrorMessage: ErrorHandler;
export {};
//# sourceMappingURL=errors.d.ts.map