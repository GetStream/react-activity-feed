import { MouseEventHandler as F } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type AvatarProps<T extends SVGSVGElement | HTMLImageElement> = PropsWithElementAttributes<{
    alt?: string;
    circle?: boolean;
    image?: T extends HTMLImageElement ? string : never;
    onClick?: F<T>;
    rounded?: boolean;
    size?: number;
}>;
export declare function Avatar<T extends HTMLImageElement | SVGSVGElement>({ size, image, alt, rounded, circle, onClick, className, style, }: AvatarProps<T>): JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map