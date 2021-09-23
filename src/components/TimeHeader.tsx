import React, { PropsWithChildren } from 'react';

import { Title } from './Title';
import { PropsWithElementAttributes } from '../utils';

export type TimeHeaderProps = PropsWithChildren<PropsWithElementAttributes>;

export const TimeHeader = ({ children, className = 'raf-time-header', style }: TimeHeaderProps) => (
  <div className={className} style={style}>
    <Title size={14}>{children}</Title>
    <div className="raf-time-header__line" />
  </div>
);
