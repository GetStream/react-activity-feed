import React, { ReactNode } from 'react';
import { smartRender, ElementOrComponentOrLiteralType } from '../utils';

export type DropdownPanelProps = {
  arrow?: boolean;
  children?: ReactNode;
  Footer?: ElementOrComponentOrLiteralType;
  Header?: ElementOrComponentOrLiteralType;
  right?: boolean;
};

/**
 * `DropdownPanel` is a more advanced component used to create a notification dropdown for instance, it comes with three parts:
 * `Header`, `Content` and `Footer`. The content has a limited height and the `overflow` is set to `scroll`.
 */
export const DropdownPanel = ({ arrow = false, right = false, Header, Footer, children }: DropdownPanelProps) => {
  return (
    <div
      data-testid="dp-wrapper"
      className={`raf-dropdown-panel${arrow ? ' raf-dropdown-panel--arrow' : ''} ${
        right
          ? ' raf-dropdown-panel--right raf-dropdown-panel--arrow-right'
          : ' raf-dropdown-panel--left raf-dropdown-panel--arrow-left'
      }`}
    >
      {!!Header && <div className="raf-dropdown-panel__header">{smartRender(Header)}</div>}
      <div className="raf-dropdown-panel__content">{children}</div>
      {!!Footer && <div className="raf-dropdown-panel__footer">{smartRender(Footer)}</div>}
    </div>
  );
};
