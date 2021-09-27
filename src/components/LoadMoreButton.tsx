import React, { PropsWithChildren, MouseEvent } from 'react';
import classNames from 'classnames';

import { Button } from './Button';
import { PropsWithElementAttributes } from '../utils';
import { useTranslationContext } from '../context';

export type LoadMoreButtonProps = PropsWithElementAttributes<
  PropsWithChildren<{
    onClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
    refreshing?: boolean;
  }>
>;

export const LoadMoreButton = ({ onClick, refreshing = false, children, className, style }: LoadMoreButtonProps) => {
  const { t } = useTranslationContext();

  return (
    <div className={classNames('raf-load-more-button', className)} style={style}>
      <Button onClick={onClick} buttonStyle="info" disabled={refreshing} loading={refreshing}>
        {children ? children : t('Load more')}
      </Button>
    </div>
  );
};
