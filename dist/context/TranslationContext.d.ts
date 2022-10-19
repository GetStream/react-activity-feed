import React, { ComponentType, FC, ReactNode } from 'react';
import { TFunction } from 'i18next';
import { UR } from 'getstream';
import { TDateTimeParser } from '../i18n/Streami18n';
export declare type TranslationContextValue = {
    t: TFunction;
    tDateTimeParser: TDateTimeParser;
};
export declare const TranslationContext: React.Context<TranslationContextValue>;
export declare const TranslationProvider: ({ children, value }: {
    value: TranslationContextValue;
    children?: ReactNode;
}) => JSX.Element;
export declare const useTranslationContext: () => TranslationContextValue;
export declare const withTranslationContext: <P extends UR>(Component: React.ComponentType<P>) => React.FC<Omit<P, keyof TranslationContextValue>>;
//# sourceMappingURL=TranslationContext.d.ts.map