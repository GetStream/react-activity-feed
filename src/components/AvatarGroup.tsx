import React, { useMemo, MouseEvent } from 'react';
import { UserAPIResponse } from 'getstream';
import { Avatar } from './Avatar';
import { userOrDefault } from '../utils';

type UserData = {
  name?: string;
  profileImage?: string;
};

// export type Props = {|
// 	/* The list of users to display */
// 	users: UserResponse[],
// 	/* The size of the avatar in px */
// 	avatarSize: number,
// 	/* The limit of avatars to display */
// 	limit: number,
// 	/* Callback to call when clicking on a user in the notification */
// 	onClickUser?: (UserResponse) => mixed,
//  |};

export type AvatarGroupProps<UserType extends UserData> = {
  avatarSize?: number;
  limit?: number;
  onClickUser?: (user: UserAPIResponse<UserType>) => void;
  users?: Array<UserAPIResponse<UserType>>;
};

// static defaultProps = {
// 	avatarSize: 30,
// 	limit: 5,
//  };

//  _getOnClickUser(user) {
// 	return this.props.onClickUser ? (e) => this.onClickUser(e, user) : undefined;
//  }

//  onClickUser = (e, user) => {
// 	const { onClickUser } = this.props;
// 	if (onClickUser) {
// 	  e.stopPropagation();
// 	  return onClickUser(userOrDefault(user));
// 	}
//  };

export function AvatarGroup<UserType extends UserData>({
  limit = 5,
  users = [],
  avatarSize = 50,
  onClickUser,
}: AvatarGroupProps<UserType>) {
  const handleClick = useMemo(
    () =>
      onClickUser
        ? (user: UserAPIResponse<UserType>) => (event: MouseEvent<HTMLImageElement | SVGSVGElement>) => {
            event.stopPropagation();
            onClickUser(userOrDefault(user));
          }
        : undefined,
    [onClickUser],
  );

  return (
    <div className="raf-avatar-group">
      {users.slice(0, limit).map((user, i) => (
        <div className="raf-avatar-group__avatar" key={`avatar-${i}`}>
          <Avatar onClick={handleClick?.(user)} image={user?.data.profileImage} size={avatarSize} circle />
        </div>
      ))}
    </div>
  );
}
