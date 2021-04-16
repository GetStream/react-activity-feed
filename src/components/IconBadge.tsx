import React, { ReactNode, MouseEventHandler } from 'react';
import { BellIcon } from './Icons';

export type IconBadgeProps = {
  children?: ReactNode;
  hidden?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  showNumber?: boolean;
  unseen?: number;
};

export const IconBadge = ({ children, onClick, hidden, unseen = 0, showNumber }: IconBadgeProps) => {
  return (
    <div className="raf-icon-badge" role="button" onClick={onClick}>
      {children ?? <BellIcon />}
      {unseen > 0 && !hidden && (
        <div className="raf-icon-badge__badge" data-testid="unseen-wrapper">
          {showNumber && <p data-testid="unseen-count">{unseen}</p>}
        </div>
      )}
    </div>
  );
};
