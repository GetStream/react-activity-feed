import React from 'react';
import classNames from 'classnames';

import { useTranslationContext } from '../context';
import { PropsWithElementAttributes } from '../utils';

export type FeedPlaceholderProps = PropsWithElementAttributes<{
  text?: string;
}>;

export const FeedPlaceholder = ({ text, className, style }: FeedPlaceholderProps) => {
  const { t } = useTranslationContext();

  return (
    <div className={classNames('raf-feed-placeholder', className)} style={style}>
      <p>{text || t('No data to display...')}</p>
    </div>
  );
};
