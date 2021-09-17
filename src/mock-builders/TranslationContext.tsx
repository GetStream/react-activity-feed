import React, { PropsWithChildren } from 'react';
import moment from 'moment';
import { TranslationContextValue, TranslationProvider } from '../context';

export const translationProviderData = { t: String, tDateTimeParser: moment };

type TranslationProviderMockProps = PropsWithChildren<{ value?: TranslationContextValue }>;

export const TranslationProviderMock = ({
  value = translationProviderData,
  children,
}: TranslationProviderMockProps) => <TranslationProvider value={value}>{children}</TranslationProvider>;
