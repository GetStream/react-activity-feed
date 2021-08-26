import React, { ReactNode, MouseEvent } from 'react';

import { Button } from './Button';

import { useTranslationContext } from '../context';

export type LoadMoreButtonProps = {
  children?: ReactNode;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  refreshing?: boolean;
};

export const LoadMoreButton = ({ onClick, refreshing = false, children }: LoadMoreButtonProps) => {
  const { t } = useTranslationContext();

  return (
    <div className="raf-load-more-button">
      <Button onClick={onClick} buttonStyle="info" disabled={refreshing} loading={refreshing}>
        {children ? children : t('Load more')}
      </Button>
    </div>
  );
};
