import React from 'react';
import { EnrichedActivity, UR } from 'getstream';

import { ActivityContent as DefaultActivityContent, ActivityContentProps } from './ActivityContent';
import { ActivityHeader as DefaultActivityHeader, ActivityHeaderProps } from './ActivityHeader';
import { ActivityFooterProps } from './ActivityFooter';

import { FeedManager } from '../Context/FeedManager';
import { smartRender, ElementOrComponentOrLiteralType, UserOrDefaultReturnType } from '../utils';
import { DefaultAT, DefaultUT } from '../Context/StreamApp';

type WordClickHandler = (word: string) => void;

export type ActivityProps<
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
> = {
  /** The activity received for stream for which to show the like buton. This is
   * used to initalize the toggle state and the counter. */
  activity: EnrichedActivity<UT, AT>;
  Content?: ElementOrComponentOrLiteralType<ActivityContentProps<UT, AT>>;
  /** The feed group part of the feed that the activity should be reposted to
   * when pressing the RepostButton, e.g. `user` when posting to your own profile
   * defaults to 'user' feed */
  feedGroup?: string;
  Footer?: ElementOrComponentOrLiteralType<ActivityFooterProps<UT, AT, CT, RT, CRT>>;
  Header?: ElementOrComponentOrLiteralType<ActivityHeaderProps<UT, AT>>;
  HeaderRight?: ElementOrComponentOrLiteralType;
  icon?: string;
  /** Handler for any routing you may do on clicks on Hashtags */
  onClickHashtag?: WordClickHandler;
  /** Handler for any routing you may do on clicks on Mentions */
  onClickMention?: WordClickHandler;
  onClickUser?: (user: UserOrDefaultReturnType<UT>) => void;
  /** The function that toggles  reaction. */
  onToggleReaction?: FeedManager<UT, AT, CT, RT, CRT>['onToggleReaction'];
  /** The user_id part of the feed that the activity should be reposted to when
   * pressing the RepostButton */
  userId?: string;
};

export const Activity = <
  UT extends DefaultUT = DefaultUT,
  AT extends DefaultAT = DefaultAT,
  CT extends UR = UR,
  RT extends UR = UR,
  CRT extends UR = UR
>({
  Header = DefaultActivityHeader,
  HeaderRight,
  Content = DefaultActivityContent,
  Footer,
  activity,
  icon,
  onClickHashtag,
  onClickMention,
  onClickUser,
  onToggleReaction,
  userId,
  feedGroup,
}: ActivityProps<UT, AT, CT, RT, CRT>) => (
  <div className="raf-activity">
    {smartRender<ActivityHeaderProps<UT, AT>>(Header, { HeaderRight, icon, activity, onClickUser })}
    {smartRender<ActivityContentProps<UT, AT>>(Content, { onClickMention, onClickHashtag, activity })}
    {smartRender<ActivityFooterProps<UT, AT, CT, RT, CRT>>(Footer, { activity, feedGroup, userId, onToggleReaction })}
  </div>
);
