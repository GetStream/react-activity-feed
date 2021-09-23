import React from 'react';

import { useTranslationContext } from '../context';
import { PropsWithElementAttributes } from '../utils';

export type FeedPlaceholderProps = PropsWithElementAttributes<{
  text?: string;
}>;

export const FeedPlaceholder = ({ text, className = 'raf-feed-placeholder', ...rest }: FeedPlaceholderProps) => {
  const { t } = useTranslationContext();

  return (
    <div className={className} {...rest}>
      <p>{text || t('No data to display...')}</p>
    </div>
  );
};
