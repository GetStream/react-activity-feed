import React, { PropsWithChildren } from 'react';

import { PropsWithElementAttributes } from '../utils';

export type TitleProps = PropsWithElementAttributes<
  PropsWithChildren<{
    size?: number;
  }>
>;

export const Title = ({ size = 18, children, className = 'raf-title', style = { fontSize: size } }: TitleProps) => (
  <div className={className} style={style}>
    {children}
  </div>
);
