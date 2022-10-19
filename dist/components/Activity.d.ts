/// <reference types="react" />
import { EnrichedActivity, UR } from 'getstream';
import { ActivityContentProps } from './ActivityContent';
import { ActivityHeaderProps } from './ActivityHeader';
import { CardProps } from './Card';
import { ActivityFooterProps } from './ActivityFooter';
import { ElementOrComponentOrLiteralType, UserOrDefaultReturnType, PropsWithElementAttributes } from '../utils';
import { DefaultAT, DefaultUT } from '../context/StreamApp';
declare type WordClickHandler = (word: string) => void;
export declare type ActivityProps<UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR> = PropsWithElementAttributes<{
    /** The activity received for stream for which to show the like button. This is
     * used to initialize the toggle state and the counter. */
    activity: EnrichedActivity<UT, AT, CT, RT, CRT>;
    /** Card component to display.
     * #Card (Component)#
     */
    Card?: ElementOrComponentOrLiteralType<CardProps>;
    /** Content component to display.
     * #ActivityContent (Component)#
     */
    Content?: ElementOrComponentOrLiteralType<ActivityContentProps<UT, AT, CT, RT, CRT>>;
    /** The feed group part of the feed that the activity should be reposted to
     * when pressing the RepostButton, e.g. `user` when posting to your own profile
     * defaults to 'user' feed */
    feedGroup?: string;
    Footer?: ElementOrComponentOrLiteralType<ActivityFooterProps<UT, AT, CT, RT, CRT>>;
    /** Header component to display.
     * #ActivityHeader (Component)#
     */
    Header?: ElementOrComponentOrLiteralType<ActivityHeaderProps<UT, AT>>;
    HeaderRight?: ElementOrComponentOrLiteralType;
    icon?: string;
    /** Handler for any routing you may do on clicks on Hashtags */
    onClickHashtag?: WordClickHandler;
    /** Handler for any routing you may do on clicks on Mentions */
    onClickMention?: WordClickHandler;
    onClickUser?: (user: UserOrDefaultReturnType<UT>) => void;
    /** UI component to render original activity within a repost
     * #Repost (Component)#
     */
    Repost?: ElementOrComponentOrLiteralType<ActivityProps<UT, AT, CT, RT, CRT>>;
    /** The user_id part of the feed that the activity should be reposted to when
     * pressing the RepostButton */
    userId?: string;
}>;
export declare const Activity: <UT extends DefaultUT = DefaultUT, AT extends DefaultAT = DefaultAT, CT extends UR = UR, RT extends UR = UR, CRT extends UR = UR>({ Header, HeaderRight, Content, Footer, Card, activity, icon, onClickHashtag, onClickMention, onClickUser, Repost, userId, feedGroup, className, style, }: ActivityProps<UT, AT, CT, RT, CRT>) => JSX.Element;
export {};
//# sourceMappingURL=Activity.d.ts.map