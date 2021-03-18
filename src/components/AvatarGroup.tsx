import React, { useMemo, MouseEvent } from 'react';
import { EnrichedUser } from 'getstream';

import { userOrDefault, UserOrDefaultReturnType } from '../utils';
import { DefaultUT } from '../Context/StreamApp';
import { Avatar } from './Avatar';

export type AvatarGroupProps<UT extends DefaultUT = DefaultUT> = {
  avatarSize?: number;
  limit?: number;
  onClickUser?: (user: UserOrDefaultReturnType<UT>) => void;
  users?: Array<EnrichedUser<UT>>;
};

export function AvatarGroup<UT extends DefaultUT = DefaultUT>({
  limit = 5,
  users = [],
  avatarSize = 30,
  onClickUser,
}: AvatarGroupProps<UT>) {
  const handleClick = useMemo(
    () =>
      onClickUser
        ? (user: EnrichedUser<UT>) => (event: MouseEvent<HTMLImageElement | SVGSVGElement>) => {
            event.stopPropagation();
            onClickUser(userOrDefault<UT>(user));
          }
        : undefined,
    [onClickUser],
  );

  return (
    <div className="raf-avatar-group">
      {users.slice(0, limit).map((user, i) => (
        <div className="raf-avatar-group__avatar" key={`avatar-${i}`}>
          <Avatar onClick={handleClick?.(user)} image={user.data?.profileImage} size={avatarSize} circle />
        </div>
      ))}
    </div>
  );
}
