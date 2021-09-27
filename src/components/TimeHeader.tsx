import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { Title } from './Title';
import { PropsWithElementAttributes } from '../utils';

export type TimeHeaderProps = PropsWithChildren<PropsWithElementAttributes>;

export const TimeHeader = ({ children, className, style }: TimeHeaderProps) => (
  <div className={classNames('raf-time-header', className)} style={style}>
    <Title size={14}>{children}</Title>
    <div className="raf-time-header__line" />
  </div>
);
