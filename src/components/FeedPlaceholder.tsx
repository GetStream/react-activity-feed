import React from 'react';
import { useTranslationContext } from '../context';

export type FeedPlaceholderProps = {
  text?: string;
};

export const FeedPlaceholder = ({ text }: FeedPlaceholderProps) => {
  const { t } = useTranslationContext();

  return (
    <div className="raf-feed-placeholder">
      <p>{text || t('No data to display...')}</p>
    </div>
  );
};
