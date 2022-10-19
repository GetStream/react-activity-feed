/// <reference types="react" />
import { DefaultAT, DefaultUT } from '../context/StreamApp';
import { ActivityProps } from './Activity';
export declare type ActivityHeaderProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT> = Pick<ActivityProps<UT, AT>, 'activity' | 'HeaderRight' | 'icon' | 'onClickUser' | 'className' | 'style'>;
export declare const ActivityHeader: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT>({ activity, HeaderRight, icon, onClickUser, style, className, }: ActivityHeaderProps<UT, AT>) => JSX.Element;
//# sourceMappingURL=ActivityHeader.d.ts.map