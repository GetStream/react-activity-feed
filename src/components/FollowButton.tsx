import React, { MouseEvent } from 'react';

import { PropsWithElementAttributes } from '../utils';

export type FollowButtonProps = PropsWithElementAttributes<{
  followed?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}>;

export const FollowButton = ({ followed = false, onClick, className, ...rest }: FollowButtonProps) => (
  <div
    className={className ?? `raf-follow-button ${followed ? 'raf-follow-button--active' : ''}`}
    role="button"
    onClick={onClick}
    {...rest}
  >
    {followed ? 'Following' : 'Follow'}
  </div>
);
