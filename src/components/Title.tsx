import React, { ReactNode } from 'react';

const DEFAULT_FONT_SIZE = 18;

export type TitleProps = {
  children?: ReactNode;
  size?: number;
};

export const Title = ({
  size: fontSize = DEFAULT_FONT_SIZE,
  children,
}: TitleProps) => (
  <div className="raf-title" style={{ fontSize }}>
    {children}
  </div>
);
