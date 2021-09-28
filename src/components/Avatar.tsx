import React, { MouseEventHandler as F } from 'react';
import classNames from 'classnames';
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
  className,
  style = size ? { width: `${size}px`, height: `${size}px` } : undefined,
}: AvatarProps<T>) {
  const cn = classNames('raf-avatar', className, {
    'raf-avatar--rounded': rounded,
    'raf-avatar--circle': circle,
  });

  return image ? (
    <img className={cn} style={style} src={image} alt={alt ?? ''} onClick={onClick as F<HTMLImageElement>} />
  ) : (
    <AvatarIcon className={cn} style={style} onClick={onClick as F<SVGSVGElement>} />
  );
}
