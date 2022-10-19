/// <reference types="react" />
import { UR } from 'getstream';
import { DefaultAT, DefaultUT } from '../context';
import { ElementOrComponentOrLiteralType, PropsWithElementAttributes } from '../utils';
import { NotificationFeedProps } from './NotificationFeed';
import { DropdownPanelProps } from './DropdownPanel';
export declare type NotificationDropdownProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR> = PropsWithElementAttributes<{
    Icon?: ElementOrComponentOrLiteralType;
    width?: number;
} & Pick<DropdownPanelProps, 'Footer' | 'Header' | 'right'> & NotificationFeedProps<UT, AT, CT, RT, CRT, PT>>;
/**
 * IMPORTANT: Changing most of the props below doesn't result in the desired effect.
 * These settings related to feed management should be changed in the `sharedFeeds` prop of the [`StreamApp`](#streamapp) component.
 */
export declare const NotificationDropdown: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR, PT extends UR = UR>({ width, Footer, Header, Icon, right, feedGroup, options, ...feedProps }: NotificationDropdownProps<UT, AT, CT, RT, CRT, PT>) => JSX.Element;
//# sourceMappingURL=NotificationDropdown.d.ts.map