import React, { PropsWithChildren, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { BellIcon } from './Icons';
import { PropsWithElementAttributes } from '../utils';

export type IconBadgeProps = PropsWithChildren<
  PropsWithElementAttributes<{
    hidden?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    showNumber?: boolean;
    unseen?: number;
  }>
>;

export const IconBadge = ({ children, onClick, hidden, unseen = 0, showNumber, className, style }: IconBadgeProps) => {
  return (
    <div className={classNames('raf-icon-badge', className)} role="button" onClick={onClick} style={style}>
      {children ?? <BellIcon />}
      {unseen > 0 && !hidden && (
        <div className="raf-icon-badge__badge" data-testid="unseen-wrapper">
          {showNumber && <p data-testid="unseen-count">{unseen}</p>}
        </div>
      )}
    </div>
  );
};
