import React, { MouseEventHandler as F } from 'react';
import { AvatarIcon } from './Icons';
import { PropsWithElementAttributes } from '../utils';

export type AvatarProps<T extends SVGSVGElement | HTMLImageElement> = PropsWithElementAttributes<{
  alt?: string;
  circle?: boolean;
  image?: T extends HTMLImageElement ? string : never;
  onClick?: F<T>;
  rounded?: boolean;
  size?: number;
}>;

export function Avatar<T extends HTMLImageElement | SVGSVGElement>({
  size,
  image,
  alt,
  rounded,
  circle,
  onClick,
  className = `raf-avatar${rounded ? ' raf-avatar--rounded' : ''}${circle ? ' raf-avatar--circle' : ''}`,
  style = size ? { width: `${size}px`, height: `${size}px` } : undefined,
}: AvatarProps<T>) {
  return image ? (
    <img className={className} style={style} src={image} alt={alt ?? ''} onClick={onClick as F<HTMLImageElement>} />
  ) : (
    <AvatarIcon className={className} style={style} onClick={onClick as F<SVGSVGElement>} />
  );
}
