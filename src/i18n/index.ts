import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import React, { FC, ReactNode } from 'react';
import {
  I18nextProvider as Provider,
  initReactI18next,
  useTranslation
} from 'react-i18next';
import { useMount, useUpdate } from 'react-use';

import { resources } from './locales';

void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(intervalPlural)
  .init({
    debug: false,
    keySeparator: false,
    interpolation: { escapeValue: false },
    resources,
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'language',
      lookupLocalStorage: 'language'
    }
  });
export { i18next };
export const switchLanguage = (lan: 'en-US' | 'zh') => {
  void i18next.changeLanguage(lan);
};
export const t = i18next.t.bind(i18next);

interface I18nextProviderProps {
  children: ReactNode;
}

export const I18nextProvider: FC<I18nextProviderProps> = (props) => {
  const update = useUpdate();
  useMount(() => {
    i18next.on('languageChanged', () => {
      update();
    });
  });

  return React.createElement(Provider, { i18n: i18next }, props.children);
};

export { useTranslation };
