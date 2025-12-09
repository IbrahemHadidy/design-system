'use client';

import { ThemeSheet } from '@/components/layout/theme-sheet';
import { type Locale } from 'next-intl';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default function Page({ params }: PageProps) {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-8 transition-all">
      <h1 className="text-4xl font-bold">Hello World!</h1>

      <p className="text-lg opacity-70">Change the theme using the button below</p>

      <ThemeSheet />
    </div>
  );
}
