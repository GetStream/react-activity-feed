/// <reference types="react" />
import { EnrichedReaction, UR, EnrichedActivity } from 'getstream';
import { DefaultAT, DefaultUT } from '../context/StreamApp';
import { PropsWithElementAttributes } from '../utils';
export declare type LikeButtonProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = PropsWithElementAttributes<{
    /** The activity received from stream that should be liked when pressing the LikeButton. */
    activity?: EnrichedActivity<UT, AT, CT, RT, CRT>;
    /** The reaction received from stream that should be liked when pressing the LikeButton. */
    reaction?: EnrichedReaction<RT, CRT, UT>;
    /** onAddReaction supports targetFeeds that you can use to send a notification to the post owner like ["notification:USER_ID"] */
    targetFeeds?: string[];
}>;
export declare const LikeButton: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ activity, reaction, targetFeeds, className, style, }: LikeButtonProps<UT, AT, CT, RT, CRT>) => JSX.Element;
//# sourceMappingURL=LikeButton.d.ts.map