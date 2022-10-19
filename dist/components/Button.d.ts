import { ButtonHTMLAttributes, MouseEvent, KeyboardEvent, PropsWithChildren } from 'react';
import { PropsWithElementAttributes } from '../utils';
export declare type ButtonProps = PropsWithChildren<PropsWithElementAttributes<{
    buttonStyle?: 'info' | 'primary' | 'faded';
    disabled?: boolean;
    loading?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onKeyPress?: (event: KeyboardEvent<HTMLButtonElement>) => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}>>;
export declare const Button: ({ buttonStyle, disabled, loading, type, onClick, onKeyPress, children, className, style, }: ButtonProps) => JSX.Element;
//# sourceMappingURL=Button.d.ts.map