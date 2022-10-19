/// <reference types="react" />
import { UR } from 'getstream';
import { DefaultAT, DefaultUT } from '../context';
import { FlatFeedProps } from './FlatFeed';
export declare type SinglePostProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = FlatFeedProps<UT, AT, CT, RT, CRT, PT> & {
    activityId: string;
};
/**
 * Shows the detail of a single activity
 */
export declare function SinglePost<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ options, activityId, doFeedRequest, ...props }: SinglePostProps<UT, AT, CT, RT, CRT, PT>): JSX.Element;
//# sourceMappingURL=SinglePost.d.ts.map