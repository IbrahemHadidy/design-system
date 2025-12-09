import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

import ar from '@/locales/ar';
import en from '@/locales/en';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messagesMap = { en, ar };

  return {
    locale,
    messages: messagesMap[locale],
  };
});
