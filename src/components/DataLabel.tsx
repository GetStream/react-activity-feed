import React from 'react';

import { PropsWithElementAttributes } from '../utils';

export type DataLabelProps = PropsWithElementAttributes<{
  data?: string | number;
  label?: string;
}>;

export const DataLabel = ({
  data = 'data',
  label = 'label',
  className = 'raf-data-label',
  ...rest
}: DataLabelProps) => {
  return (
    <div className={className} {...rest}>
      <span className="raf-data-label__label">{label}</span>
      <span className="raf-data-label__data">{data}</span>
    </div>
  );
};
