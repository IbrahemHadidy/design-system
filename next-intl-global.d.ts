import type { formats } from '@/lib/i18n/request';
import type { routing } from '@/lib/i18n/routing';
import type en from '@/locales/en';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof en;
    Formats: typeof formats;
  }
}
