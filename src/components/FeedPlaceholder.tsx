import React from 'react';

import { useTranslationContext } from '../context';
import { PropsWithElementAttributes } from '../utils';

export type FeedPlaceholderProps = PropsWithElementAttributes<{
  text?: string;
}>;

export const FeedPlaceholder = ({ text, className = 'raf-feed-placeholder', style }: FeedPlaceholderProps) => {
  const { t } = useTranslationContext();

  return (
    <div className={className} style={style}>
      <p>{text || t('No data to display...')}</p>
    </div>
  );
};
