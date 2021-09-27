import React, { useMemo, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { humanizeTimestamp } from '../utils';
import { Avatar } from './Avatar';
import { smartRender, ElementOrComponentOrLiteralType, PropsWithElementAttributes } from '../utils';
import { useTranslationContext } from '../context';

export type UserBarProps = PropsWithElementAttributes<{
  username: string;
  AfterUsername?: React.ReactNode;
  avatar?: string;
  follow?: boolean;
  icon?: string;
  onClickUser?: MouseEventHandler;
  Right?: ElementOrComponentOrLiteralType;
  subtitle?: string;
  time?: string; // text that should be displayed as the time
  timestamp?: string | number | Date; // a timestamp that should be humanized
}>;

export const UserBar = ({
  time,
  timestamp,
  Right,
  subtitle,
  icon,
  AfterUsername,
  username,
  onClickUser,
  avatar,
  className,
  style,
}: UserBarProps) => {
  const { tDateTimeParser } = useTranslationContext();

  const [humanReadableTimestamp, parsedTimestamp] = useMemo(
    () => [
      !time && timestamp ? humanizeTimestamp(timestamp, tDateTimeParser) : time,
      timestamp ? tDateTimeParser(timestamp).toJSON() : undefined,
    ],
    [timestamp, tDateTimeParser],
  );

  return (
    <div className={classNames('raf-user-bar', className)} style={style}>
      {avatar && <Avatar onClick={onClickUser} size={50} circle image={avatar} />}
      <div className="raf-user-bar__details">
        <p data-testid="user-bar-username" className="raf-user-bar__username" onClick={onClickUser}>
          {username}
        </p>
        {AfterUsername}
        {icon && <img src={icon} alt="icon" />}
        {subtitle && (
          <p className="raf-user-bar__subtitle">
            <time dateTime={parsedTimestamp} title={parsedTimestamp}>
              {subtitle}
            </time>
          </p>
        )}
      </div>
      {smartRender(
        Right,
        {},
        <p className="raf-user-bar__extra">
          <time dateTime={parsedTimestamp} title={parsedTimestamp}>
            {humanReadableTimestamp}
          </time>
        </p>,
      )}
    </div>
  );
};
