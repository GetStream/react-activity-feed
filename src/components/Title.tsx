import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { PropsWithElementAttributes } from '../utils';

export type TitleProps = PropsWithElementAttributes<
  PropsWithChildren<{
    size?: number;
  }>
>;

export const Title = ({ size = 18, children, className, style = { fontSize: size } }: TitleProps) => (
  <div className={classNames('raf-title', className)} style={style}>
    {children}
  </div>
);
