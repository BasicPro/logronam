'use client';

import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../lib/i18n';

interface I18nProviderProps {
  children: React.ReactNode;
  locale?: string;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, locale = 'es' }) => {
  useEffect(() => {
    // Initialize i18n when the component mounts
    if (!i18n.isInitialized) {
      i18n.init();
    }
    
    // Change language if locale is provided
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
};
