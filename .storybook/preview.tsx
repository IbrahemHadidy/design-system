import { ThemeProvider, useTheme, type Mode } from '@/components/providers/theme-provider';
import { getDirection } from '@/lib/utils/get-direction';
import '@/styles/globals.css';
import { colorThemes } from '@/styles/themes';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import { definePreview } from '@storybook/nextjs-vite';
import type { Locale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { Cairo, Poppins } from 'next/font/google';
import { useLayoutEffect, type ReactNode } from 'react';
import { themes } from 'storybook/theming';
import { cn } from 'tailwind-variants';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  display: 'swap',
});

function formatThemeString(t: string) {
  const value = t.replace('theme-', '').replace('-', ' ');
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function Sync({
  theme,
  mode: syncMode,
  locale,
  children,
}: {
  theme: string;
  mode: Mode;
  locale: Locale;
  children: ReactNode;
}) {
  const { setColorTheme, setMode, colorTheme, mode } = useTheme();
  const dir = getDirection(locale);

  useLayoutEffect(() => {
    const html = document.querySelector('html');
    if (html) html.classList.add('h-screen');

    const body = document.querySelector('body');
    if (body) body.classList.add('h-screen');

    const root = document.querySelector('#storybook-root');
    if (root) root.classList.add('h-screen');

    setColorTheme(theme);
    setMode(syncMode);
  }, [theme, syncMode, setColorTheme, setMode]);

  return (
    <main
      dir={dir}
      className={cn(
        `${poppins.variable} ${cairo.variable}`,
        `${colorTheme} ${mode}`,
        locale === 'ar' ? 'font-cairo' : 'font-poppins',
        'bg-background text-foreground flex h-full w-full items-center justify-center p-4'
      )}
    >
      {children}
    </main>
  );
}

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Select language',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'ar', title: 'Arabic' },
        ],
      },
    },
    theme: {
      name: 'Theme',
      description: 'Color Theme',
      defaultValue: 'theme-white',
      toolbar: {
        icon: 'paintbrush',
        items: colorThemes.map((t) => ({
          value: t,
          title: formatThemeString(t),
          icon: 'paintbrush',
        })),
      },
    },
    mode: {
      name: 'Mode',
      description: 'Display Mode',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
    },
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
    docs: { theme: themes.dark },
  },
  decorators: [
    (Story, { globals }) => {
      const { theme, mode, locale } = globals;

      return (
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider colorThemes={colorThemes} defaultColorTheme={theme} defaultMode={mode}>
            <Sync theme={theme} mode={mode} locale={locale}>
              <Story />
            </Sync>
          </ThemeProvider>
        </NextIntlClientProvider>
      );
    },
  ],
});
