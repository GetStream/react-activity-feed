/// <reference types="react" />
import { UR } from 'getstream';
import { DefaultAT, DefaultUT } from '../context/StreamApp';
import { ActivityProps } from './Activity';
export declare type ActivityFooterProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = Pick<ActivityProps<UT, AT, CT, RT, CRT>, 'activity' | 'feedGroup' | 'userId' | 'className' | 'style'> & {
    targetFeeds?: string[];
};
export declare const ActivityFooter: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR>({ activity, feedGroup, userId, targetFeeds, className, style, }: ActivityFooterProps<UT, AT, CT, RT, CRT>) => JSX.Element;
//# sourceMappingURL=ActivityFooter.d.ts.map