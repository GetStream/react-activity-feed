import React, { MouseEvent, PropsWithChildren } from 'react';

import { PropsWithElementAttributes } from '../utils';

export type LinkProps = PropsWithElementAttributes<
  PropsWithChildren<{
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    to?: string;
  }>,
  HTMLAnchorElement
>;

export const Link = ({ to, children, onClick, className = 'raf-link', style }: LinkProps) => (
  <a href={to} className={className} onClick={onClick} style={style}>
    {children}
  </a>
);
