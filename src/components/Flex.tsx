import React, { CSSProperties, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { PropsWithElementAttributes } from '../utils';

export type FlexProps = PropsWithElementAttributes<
  PropsWithChildren<{
    a?: CSSProperties['alignItems'];
    d?: CSSProperties['flexDirection'];
    j?: CSSProperties['justifyContent'];
    js?: CSSProperties['justifySelf'];
    w?: CSSProperties['flexWrap'];
  }>
>;

export const Flex = ({ j, a, js, d = 'row', w = 'nowrap', style, children, className }: FlexProps) => (
  <div
    className={classNames('raf-flex', className)}
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
