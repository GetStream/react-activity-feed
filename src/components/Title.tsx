import React, { ReactNode } from 'react';

export type TitleProps = {
  children?: ReactNode;
  size?: number;
};

export const Title = ({ size = 18, children }: TitleProps) => (
  <div className="raf-title" style={{ fontSize: size }}>
    {children}
  </div>
);
