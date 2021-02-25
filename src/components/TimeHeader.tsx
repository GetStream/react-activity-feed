import React, { ReactNode } from 'react';
import { Title } from './Title';

export type TimeHeaderProps = {
  children?: ReactNode;
};

export const TimeHeader = ({ children }: TimeHeaderProps) => (
  <div className="raf-time-header">
    <Title size={14}>{children}</Title>
    <div className="raf-time-header__line" />
  </div>
);
