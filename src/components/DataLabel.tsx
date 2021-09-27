import React from 'react';
import classNames from 'classnames';

import { PropsWithElementAttributes } from '../utils';

export type DataLabelProps = PropsWithElementAttributes<{
  data?: string | number;
  label?: string;
}>;

export const DataLabel = ({ data = 'data', label = 'label', className, style }: DataLabelProps) => {
  return (
    <div className={classNames('raf-data-label', className)} style={style}>
      <span className="raf-data-label__label">{label}</span>
      <span className="raf-data-label__data">{data}</span>
    </div>
  );
};
