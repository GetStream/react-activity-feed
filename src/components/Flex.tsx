import React, { CSSProperties, ReactNode } from 'react';

export type FlexProps = {
  a: CSSProperties['alignItems'];
  children: ReactNode;
  d: CSSProperties['flexDirection'];
  j: CSSProperties['justifyContent'];
  js: CSSProperties['justifySelf'];
  style: CSSProperties;
  w: CSSProperties['flexWrap'];
};

export const Flex = ({
  j,
  a,
  js,
  d = 'row',
  w = 'nowrap',
  style,
  children,
}: Partial<FlexProps>) => (
  <div
    className={`raf-flex`}
    style={{
      justifyContent: j,
      alignItems: a,
      justifySelf: js,
      flexDirection: d,
      flexWrap: w,
      ...style,
    }}
  >
    {children}
  </div>
);
