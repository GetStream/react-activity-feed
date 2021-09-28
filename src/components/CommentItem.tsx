import React from 'react';
import classNames from 'classnames';
import { EnrichedReaction, UR } from 'getstream';

import { Flex } from './Flex';
import { Avatar } from './Avatar';
import {
  humanizeTimestamp,
  textRenderer,
  OnClickUserHandler,
  useOnClickUser,
  PropsWithElementAttributes,
} from '../utils';
import { useTranslationContext } from '../context';
import { DefaultUT } from '../context/StreamApp';

export type CommentItemProps<
  UT extends DefaultUT = DefaultUT,
  RT extends UR = UR,
  CRT extends UR = UR
> = PropsWithElementAttributes<
  {
    comment: EnrichedReaction<RT, CRT, UT>;
    onClickUser?: OnClickUserHandler<UT>;
  } & Partial<Record<'onClickMention' | 'onClickHashtag', (word: string) => void>>
>;

export const CommentItem = <UT extends DefaultUT = DefaultUT, RT extends UR = UR, CRT extends UR = UR>({
  comment: { user, created_at, data },
  onClickHashtag,
  onClickMention,
  onClickUser,
  className,
  style,
}: CommentItemProps<UT, RT, CRT>) => {
  const { tDateTimeParser } = useTranslationContext();

  const handleUserClick = useOnClickUser<UT, SVGSVGElement | HTMLSpanElement>(onClickUser);

  return (
    <div className={classNames('raf-comment-item', className)} style={style}>
      <Flex a="flex-start" style={{ padding: '8px 0' }}>
        {user?.data.profileImage && (
          <Avatar onClick={handleUserClick?.(user)} image={user.data.profileImage} circle size={25} />
        )}
      </Flex>
      <Flex d="column" style={{ flex: 1, margin: '0 8px' }}>
        <div className="raf-comment-item__content">
          <time dateTime={created_at} title={created_at}>
            <small>{humanizeTimestamp(created_at, tDateTimeParser)}</small>
          </time>
          <p>
            <span onClick={handleUserClick?.(user)} className="raf-comment-item__author">
              {user?.data.name}
            </span>{' '}
            {textRenderer(data.text as string, 'raf-comment-item', onClickMention, onClickHashtag)}
          </p>
        </div>
      </Flex>
    </div>
  );
};
