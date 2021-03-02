import React, { ButtonHTMLAttributes, MouseEvent, KeyboardEvent, ReactNode } from 'react';
import { LoadingIndicator } from 'react-file-utils';

export type ButtonProps = {
  buttonStyle?: 'info' | 'primary' | 'faded';
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const Button = ({
  buttonStyle = 'info',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  onKeyPress,
  children,
}: ButtonProps) => (
  <button
    className={`raf-button${buttonStyle ? ' raf-button--' + buttonStyle : ''}`}
    onClick={onClick}
    onKeyPress={onKeyPress}
    type={type}
    disabled={disabled}
  >
    {loading ? <LoadingIndicator backgroundColor="rgba(255,255,255,0.1)" color="rgba(255,255,255,0.4)" /> : children}
  </button>
);
