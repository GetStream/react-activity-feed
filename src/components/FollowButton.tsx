import React, { MouseEvent } from 'react';

export type FollowButtonProps = {
  followed?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

export const FollowButton = ({ followed = false, onClick }: FollowButtonProps) => (
  <div className={`raf-follow-button ${followed ? 'raf-follow-button--active' : ''}`} role="button" onClick={onClick}>
    {followed ? 'Following' : 'Follow'}
  </div>
);
