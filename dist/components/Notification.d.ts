/// <reference types="react" />
import { NotificationActivityEnriched, UR } from 'getstream';
import { OnClickUserHandler, PropsWithElementAttributes } from '../utils';
import { DefaultUT, DefaultAT, FeedManager } from '../context';
export declare type NotificationProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = PropsWithElementAttributes<{
    /** The activity group to display in this notification */
    activityGroup: NotificationActivityEnriched<UT, AT, CT, RT, CRT>;
    /** Callback to call when clicking on a notification */
    onClickNotification?: (activityGroup: NotificationActivityEnriched<UT, AT, CT, RT, CRT>) => void;
    /** Callback to call when clicking on a user in the notification */
    onClickUser?: OnClickUserHandler<UT>;
    /** Callback to mark a notification as read, if not supplied the dropdown used to mark as read will not be shown */
    onMarkAsRead?: FeedManager<UT, AT, CT, RT, CRT>['onMarkAsRead'];
}>;
export declare const Notification: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR>({ activityGroup, onMarkAsRead, onClickUser, onClickNotification, className, style, }: NotificationProps<UT, AT, CT, RT, CRT>) => JSX.Element | null;
//# sourceMappingURL=Notification.d.ts.map