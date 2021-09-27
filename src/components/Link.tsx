import React, { MouseEvent, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { PropsWithElementAttributes } from '../utils';

export type LinkProps = PropsWithElementAttributes<
  PropsWithChildren<{
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    to?: string;
  }>,
  HTMLAnchorElement
>;

export const Link = ({ to, children, onClick, className, style }: LinkProps) => (
  <a href={to} className={classNames('raf-link', className)} onClick={onClick} style={style}>
    {children}
  </a>
);
