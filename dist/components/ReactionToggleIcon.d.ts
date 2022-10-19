/// <reference types="react" />
import { ReactionsRecords, UR } from 'getstream';
import { ReactionIconProps } from './ReactionIcon';
import { DefaultUT } from '../context/StreamApp';
import { PropsWithElementAttributes } from '../utils';
declare type ReactionToggleIconProps<UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR> = PropsWithElementAttributes<{
    /** The icon to show when the user has done this reaction (e.g. a filled in heart) */
    activeIcon: ReactionIconProps['icon'];
    /** The icon to show when the user has not done this reaction yet (e.g. an empty in heart) */
    inactiveIcon: ReactionIconProps['icon'];
    /** The map with own reactions */
    own_reactions?: ReactionsRecords<RT, CRT, UT> | Record<string, CRT>;
} & Omit<ReactionIconProps, 'icon'>>;
export declare const ReactionToggleIcon: <UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR>({ inactiveIcon, activeIcon, own_reactions: ownReactions, kind, className, style, ...restProps }: ReactionToggleIconProps<UT, RT, CRT>) => JSX.Element;
export {};
//# sourceMappingURL=ReactionToggleIcon.d.ts.map