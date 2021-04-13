import React from 'react';
import { EnrichedReactionAPIResponse, UR, EnrichedUser } from 'getstream';

import { Flex } from './Flex';
import { Avatar } from './Avatar';
import { humanizeTimestamp, textRenderer, OnClickUserHandler, useOnClickUser } from '../utils';
import { useTranslationContext } from '../Context';
import { DefaultUT } from '../Context/StreamApp';

export type CommentItemProps<UT extends DefaultUT = DefaultUT> = {
  comment: EnrichedReactionAPIResponse<UR, UR, EnrichedUser<UT>>;
  onClickUser?: OnClickUserHandler<UT>;
} & Partial<Record<'onClickMention' | 'onClickHashtag', (word: string) => void>>;

export const CommentItem = <UT extends DefaultUT = DefaultUT>({
  comment: { user, created_at, data },
  onClickHashtag,
  onClickMention,
  onClickUser,
}: CommentItemProps<UT>) => {
  const { tDateTimeParser } = useTranslationContext();

  const handleUserClick = useOnClickUser<UT, SVGSVGElement | HTMLSpanElement>(onClickUser);

  return (
    <div className="raf-comment-item">
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
