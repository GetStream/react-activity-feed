/// <reference types="react" />
import { EnrichedActivity, UR } from 'getstream';
import { DefaultAT, DefaultUT } from '../context';
import { PropsWithElementAttributes } from '../utils';
export declare type RepostButtonProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = PropsWithElementAttributes<{
    /** The activity received for stream for which to show the repost button. This is
     * used to initialize the toggle state and the counter. */
    activity: EnrichedActivity<UT, AT, CT, RT, CRT>;
    /** The feed group part of the feed that the activity should be reposted to,
     * e.g. `user` when posting to your own profile */
    feedGroup?: string;
    /** Repost reaction custom data  */
    repostData?: RT;
    /** onAddReaction supports targetFeeds that you can use to send a notification to the post owner like ["notification:USER_ID"] */
    targetFeeds?: string[];
    /** The user_id part of the feed that the activity should be reposted to, default to current user id */
    userId?: string;
}>;
/**
 * A repost button ready to be embedded as Activity footer
 */
export declare const RepostButton: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ activity, feedGroup, userId, repostData, targetFeeds, className, style, }: RepostButtonProps<UT, AT, CT, RT, CRT>) => JSX.Element;
//# sourceMappingURL=RepostButton.d.ts.map