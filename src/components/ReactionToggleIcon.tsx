import React from 'react';
import classNames from 'classnames';
import { ReactionsRecords, UR } from 'getstream';

import { ReactionIcon, ReactionIconProps } from './ReactionIcon';
import { DefaultUT } from '../context/StreamApp';
import { PropsWithElementAttributes } from '../utils';

type ReactionToggleIconProps<
  UT extends DefaultUT = DefaultUT,
  RT extends UR = UR,
  CRT extends UR = UR
> = PropsWithElementAttributes<
  {
    /** The icon to show when the user has done this reaction (e.g. a filled in heart) */
    activeIcon: ReactionIconProps['icon'];
    /** The icon to show when the user has not done this reaction yet (e.g. an empty in heart) */
    inactiveIcon: ReactionIconProps['icon'];
    /** The map with own reactions */
    own_reactions?: ReactionsRecords<RT, CRT, UT> | Record<string, CRT>;
  } & Omit<ReactionIconProps, 'icon'>
>;

export const ReactionToggleIcon = <UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR>({
  inactiveIcon,
  activeIcon,
  own_reactions: ownReactions,
  kind,
  className,
  style,
  ...restProps
}: ReactionToggleIconProps<UT, RT, CRT>) => {
  const icon = ownReactions?.[kind ?? '']?.length ? activeIcon : inactiveIcon;
  return (
    <div className={classNames('raf-reaction-toggle-icon', className)} style={style}>
      <ReactionIcon icon={icon} kind={kind} {...restProps} />
    </div>
  );
};
