import React, { createContext, useContext, ComponentType, FC, ReactNode } from 'react';
import Dayjs from 'dayjs';
import { TFunction } from 'i18next';
import { UR } from 'getstream';

import { TDateTimeParser } from '../i18n/Streami18n';

export type TranslationContextValue = {
  t: TFunction;
  tDateTimeParser: TDateTimeParser;
};

export const TranslationContext = createContext<TranslationContextValue>({
  t: (key: string) => key,
  tDateTimeParser: (input) => Dayjs(input),
});

export const TranslationProvider = ({ children, value }: { value: TranslationContextValue; children?: ReactNode }) => (
  <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
);

export const useTranslationContext = () => useContext(TranslationContext);

export const withTranslationContext = <P extends UR>(
  Component: ComponentType<P>,
): FC<Omit<P, keyof TranslationContextValue>> => {
  const WithTranslationContextComponent = (props: Omit<P, keyof TranslationContextValue>) => {
    const translationContext = useTranslationContext();
    return <Component {...(props as P)} {...translationContext} />;
  };

  WithTranslationContextComponent.displayName = (Component.displayName || Component.name || 'Component').replace(
    'Base',
    '',
  );

  return WithTranslationContextComponent;
};
