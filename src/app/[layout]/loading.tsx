import { Logo } from '@/components/layout/logo';
import { getTranslations } from 'next-intl/server';
import { LuLoader } from 'react-icons/lu';
import { cn } from 'tailwind-variants';

export default async function Loading({ center }: { center?: boolean }) {
  const t = await getTranslations('Layout.Loading');

  return (
    <div
      className={cn(
        'bg-background text-foreground flex flex-col items-center justify-center gap-2 p-4',
        center && 'min-h-screen'
      )}
    >
      {/* Logo */}
      <Logo className="w-32 animate-pulse sm:w-40 md:w-48 lg:w-56" />

      {/* Description with spinner */}
      <div className="flex items-center gap-2">
        <LuLoader className="text-primary h-5 w-5 animate-spin sm:h-6 sm:w-6 md:h-7 md:w-7" />
        <p className="text-muted-foreground text-center text-sm sm:text-sm md:text-base">
          {t('description')}
        </p>
      </div>
    </div>
  );
}
