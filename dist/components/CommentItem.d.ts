/// <reference types="react" />
import { EnrichedReaction, UR } from 'getstream';
import { OnClickUserHandler, PropsWithElementAttributes } from '../utils';
import { DefaultUT } from '../context/StreamApp';
export declare type CommentItemProps<UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR> = PropsWithElementAttributes<{
    comment: EnrichedReaction<RT, CRT, UT>;
    onClickUser?: OnClickUserHandler<UT>;
} & Partial<Record<'onClickMention' | 'onClickHashtag', (word: string) => void>>>;
export declare const CommentItem: <UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR>({ comment: { user, created_at, data }, onClickHashtag, onClickMention, onClickUser, className, style, }: CommentItemProps<UT, RT, CRT>) => JSX.Element;
//# sourceMappingURL=CommentItem.d.ts.map