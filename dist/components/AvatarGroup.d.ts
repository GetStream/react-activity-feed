/// <reference types="react" />
import { EnrichedUser } from 'getstream';
import { OnClickUserHandler, PropsWithElementAttributes } from '../utils';
import { DefaultUT } from '../context/StreamApp';
export declare type AvatarGroupProps<UT extends DefaultUT = DefaultUT> = PropsWithElementAttributes<{
    avatarSize?: number;
    limit?: number;
    onClickUser?: OnClickUserHandler<UT>;
    users?: Array<EnrichedUser<UT>>;
}>;
export declare function AvatarGroup<UT extends DefaultUT = DefaultUT>({ limit, users, avatarSize, onClickUser, className, style, }: AvatarGroupProps<UT>): JSX.Element;
//# sourceMappingURL=AvatarGroup.d.ts.map