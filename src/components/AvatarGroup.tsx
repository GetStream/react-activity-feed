import React from 'react';
import { EnrichedUser } from 'getstream';

import { useOnClickUser, OnClickUserHandler, PropsWithElementAttributes } from '../utils';
import { DefaultUT } from '../context/StreamApp';
import { Avatar } from './Avatar';

export type AvatarGroupProps<UT extends DefaultUT = DefaultUT> = PropsWithElementAttributes<{
  avatarSize?: number;
  limit?: number;
  onClickUser?: OnClickUserHandler<UT>;
  users?: Array<EnrichedUser<UT>>;
}>;

export function AvatarGroup<UT extends DefaultUT = DefaultUT>({
  limit = 5,
  users = [],
  avatarSize = 30,
  onClickUser,
  className = 'raf-avatar-group',
  ...rest
}: AvatarGroupProps<UT>) {
  const handleUserClick = useOnClickUser<UT>(onClickUser);

  return (
    <div className={className} {...rest}>
      {users.slice(0, limit).map((user, i) => (
        <div className="raf-avatar-group__avatar" key={`avatar-${i}`}>
          <Avatar onClick={handleUserClick?.(user)} image={user.data?.profileImage} size={avatarSize} circle />
        </div>
      ))}
    </div>
  );
}
