import React, { MouseEvent, ReactNode } from 'react';

export type LinkProps = {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  to?: string;
};

export const Link = ({ to, children, onClick }: LinkProps) => (
  <a href={to} className="raf-link" onClick={onClick}>
    {children}
  </a>
);
