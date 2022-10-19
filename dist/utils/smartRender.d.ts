import React, { ReactElement, ElementType, ComponentType } from 'react';
import { UR } from 'getstream';
export declare type ElementOrComponentOrLiteralType<P extends UR = UR> = string | number | boolean | null | ReactElement<P> | ElementType<P> | ComponentType<P>;
export declare function smartRender<T extends UR = UR>(ElementOrComponentOrLiteral?: ElementOrComponentOrLiteralType<T>, props?: T, fallback?: ElementOrComponentOrLiteralType<T>): string | number | boolean | React.ReactElement<T, string | React.JSXElementConstructor<any>> | null | undefined;
//# sourceMappingURL=smartRender.d.ts.map