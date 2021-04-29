import React, { useContext, ReactNode, MouseEvent } from 'react';

import { Button } from './Button';

import { TranslationContext } from '../Context';

export type LoadMoreButtonProps = {
  children?: ReactNode;
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  refreshing?: boolean;
};

export const LoadMoreButton = ({ onClick, refreshing = false, children }: LoadMoreButtonProps) => {
  const { t } = useContext(TranslationContext);
  return (
    <div className="raf-load-more-button">
      <Button onClick={onClick} buttonStyle="info" disabled={refreshing} loading={refreshing}>
        {children ? children : t('Load more')}
      </Button>
    </div>
  );
};
