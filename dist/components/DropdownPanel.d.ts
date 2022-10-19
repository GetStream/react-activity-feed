import { ReactNode } from 'react';
import { ElementOrComponentOrLiteralType, PropsWithElementAttributes } from '../utils';
export declare type DropdownPanelProps = PropsWithElementAttributes<{
    arrow?: boolean;
    children?: ReactNode;
    Footer?: ElementOrComponentOrLiteralType;
    Header?: ElementOrComponentOrLiteralType;
    right?: boolean;
}>;
/**
 * `DropdownPanel` is a more advanced component used to create a notification dropdown for instance, it comes with three parts:
 * `Header`, `Content` and `Footer`. The content has a limited height and the `overflow` is set to `scroll`.
 */
export declare const DropdownPanel: ({ arrow, right, Header, Footer, children, className, style, }: DropdownPanelProps) => JSX.Element;
//# sourceMappingURL=DropdownPanel.d.ts.map