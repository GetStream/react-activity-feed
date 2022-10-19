import { PropsWithChildren } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type PanelProps = PropsWithElementAttributes<PropsWithChildren<{
    panelStyle?: 'rounded' | 'square';
}>>;
export declare const Panel: ({ children, panelStyle, className, style }: PanelProps) => JSX.Element;
declare type ChildPanelProps = Omit<PanelProps, 'panelStyle'>;
export declare type PanelContentProps = ChildPanelProps;
export declare type PanelFooterProps = ChildPanelProps;
export declare type PanelHeadingProps = ChildPanelProps;
export declare const PanelContent: ({ children, className, style }: PanelContentProps) => JSX.Element;
export declare const PanelFooter: ({ children, className, style }: PanelFooterProps) => JSX.Element;
export declare const PanelHeading: ({ children, className, style }: PanelHeadingProps) => JSX.Element;
export {};
//# sourceMappingURL=Panel.d.ts.map