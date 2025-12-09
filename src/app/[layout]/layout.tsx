import { TooltipProvider } from '@/components/primitives/tooltip';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/ui/toast';
import { routing } from '@/lib/i18n/routing';
import { getDirection } from '@/lib/utils/get-direction';
import '@/styles/globals.css';
import { colorThemes } from '@/styles/themes';
import { NextIntlClientProvider, type Locale } from 'next-intl';
import { Cairo, Poppins } from 'next/font/google';
import { Suspense, type ReactNode } from 'react';
import { cn } from 'tailwind-variants';
import Loading from './loading';

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(
        `${poppins.variable} ${cairo.variable}`,
        locale === 'ar' ? 'font-cairo' : 'font-poppins'
      )}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider>
          <TooltipProvider>
            <ThemeProvider colorThemes={colorThemes}>
              <ToastProvider>
                <Suspense fallback={<Loading center />}>{children}</Suspense>
              </ToastProvider>
            </ThemeProvider>
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
