import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';

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

export const PanelContent = ({ children, className, style }: PanelContentProps) => (
  <div className={classNames('raf-panel-content', className)} style={style}>
    {children}
  </div>
);

// eslint-disable-next-line sonarjs/no-identical-functions
export const PanelFooter = ({ children, className, style }: PanelFooterProps) => (
  <div className={classNames('raf-panel-footer', className)} style={style}>
    {children}
  </div>
);

// eslint-disable-next-line sonarjs/no-identical-functions
export const PanelHeading = ({ children, className, style }: PanelHeadingProps) => (
  <div className={classNames('raf-panel-header', className)} style={style}>
    {children}
  </div>
);
