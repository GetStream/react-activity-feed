import { CSSProperties, PropsWithChildren } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type FlexProps = PropsWithElementAttributes<PropsWithChildren<{
    a?: CSSProperties['alignItems'];
    d?: CSSProperties['flexDirection'];
    j?: CSSProperties['justifyContent'];
    js?: CSSProperties['justifySelf'];
    w?: CSSProperties['flexWrap'];
}>>;
export declare const Flex: ({ j, a, js, d, w, style, children, className }: FlexProps) => JSX.Element;
//# sourceMappingURL=Flex.d.ts.map