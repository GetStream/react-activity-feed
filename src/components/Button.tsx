import React, { ButtonHTMLAttributes, MouseEvent, KeyboardEvent, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { LoadingIndicator } from 'react-file-utils';

import { PropsWithElementAttributes } from '../utils';

export type ButtonProps = PropsWithChildren<
  PropsWithElementAttributes<{
    buttonStyle?: 'info' | 'primary' | 'faded';
    disabled?: boolean;
    loading?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onKeyPress?: (event: KeyboardEvent<HTMLButtonElement>) => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  }>
>;

export const Button = ({
  buttonStyle = 'info',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  onKeyPress,
  children,
  className,
  style,
}: ButtonProps) => (
  <button
    className={classNames('raf-button', `raf-button--${buttonStyle}`, className)}
    onClick={onClick}
    onKeyPress={onKeyPress}
    type={type}
    disabled={disabled}
    style={style}
  >
    {loading ? <LoadingIndicator backgroundColor="rgba(255,255,255,0.1)" color="rgba(255,255,255,0.4)" /> : children}
  </button>
);
