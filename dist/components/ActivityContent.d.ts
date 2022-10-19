/// <reference types="react" />
import { UR } from 'getstream';
import { DefaultAT, DefaultUT } from '../context/StreamApp';
import { ActivityProps } from './Activity';
export declare type ActivityContentProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = ActivityProps<UT, AT, CT, RT, CRT>;
export declare const ActivityContent: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR>({ activity, Repost, Card, className, style, ...props }: ActivityContentProps<UT, AT, CT, RT, CRT>) => JSX.Element;
//# sourceMappingURL=ActivityContent.d.ts.map