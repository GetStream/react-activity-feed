import React, { ReactNode } from 'react';

export type PanelProps = {
  children: ReactNode;
  panelStyle?: 'rounded' | 'square';
};

export const Panel = ({ children, panelStyle = 'rounded' }: PanelProps) => (
  <div className={`raf-panel raf-panel--${panelStyle}`}>{children}</div>
);

type ChildPanelProps = Omit<PanelProps, 'panelStyle'>;

export type PanelContentProps = ChildPanelProps;
export type PanelFooterProps = ChildPanelProps;
export type PanelHeadingProps = ChildPanelProps;

export const PanelContent = ({ children }: PanelContentProps) => <div className="raf-panel-content">{children}</div>;

export const PanelFooter = ({ children }: PanelFooterProps) => <div className="raf-panel-footer">{children}</div>;

export const PanelHeading = ({ children }: PanelHeadingProps) => <div className="raf-panel-header">{children}</div>;
