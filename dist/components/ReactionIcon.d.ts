import { MouseEventHandler } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type ReactionIconProps = PropsWithElementAttributes<{
    /** The reaction counts for the activity */
    counts?: Record<string, number>;
    /** The height of the icon */
    height?: number;
    icon?: string | JSX.Element;
    /** The kind of reaction that this toggles */
    kind?: string;
    /** The label to display if the count is more than one (e.g "likes") */
    labelPlural?: string;
    /** The label to display if the count is one (e.g "like") */
    labelSingle?: string;
    /** Function to call when pressed, usually this should call `onToggleReaction` */
    onPress?: MouseEventHandler<HTMLDivElement>;
    /** The width of the icon */
    width?: number;
}>;
export declare const ReactionIcon: ({ counts, kind, icon, labelPlural, labelSingle, onPress, className, style, }: ReactionIconProps) => JSX.Element;
//# sourceMappingURL=ReactionIcon.d.ts.map