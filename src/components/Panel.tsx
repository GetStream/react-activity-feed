import React, { PropsWithChildren } from 'react';

import { PropsWithElementAttributes } from '../utils';

export type PanelProps = PropsWithElementAttributes<
  PropsWithChildren<{
    panelStyle?: 'rounded' | 'square';
  }>
>;

export const Panel = ({ children, panelStyle = 'rounded', className, style }: PanelProps) => (
  <div className={className ?? `raf-panel raf-panel--${panelStyle}`} style={style}>
    {children}
  </div>
);

type ChildPanelProps = Omit<PanelProps, 'panelStyle'>;

export type PanelContentProps = ChildPanelProps;
export type PanelFooterProps = ChildPanelProps;
export type PanelHeadingProps = ChildPanelProps;

export const PanelContent = ({ children, className = 'raf-panel-content', style }: PanelContentProps) => (
  <div className={className} style={style}>
    {children}
  </div>
);

// eslint-disable-next-line sonarjs/no-identical-functions
export const PanelFooter = ({ children, className = 'raf-panel-footer', style }: PanelFooterProps) => (
  <div className={className} style={style}>
    {children}
  </div>
);

// eslint-disable-next-line sonarjs/no-identical-functions
export const PanelHeading = ({ children, className = 'raf-panel-header', style }: PanelHeadingProps) => (
  <div className={className} style={style}>
    {children}
  </div>
);
