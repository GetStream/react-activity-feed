import React, { ReactNode } from 'react';
import moment from 'moment';
import { TranslationContextValue, TranslationProvider } from '../context';

export const translationProviderData = { t: String, tDateTimeParser: moment };

type TranslationProviderMockProps = { children?: ReactNode; value?: TranslationContextValue };

export const TranslationProviderMock = ({ value, children }: TranslationProviderMockProps) => (
  <TranslationProvider value={value || translationProviderData}>{children}</TranslationProvider>
);
