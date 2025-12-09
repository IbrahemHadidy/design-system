import { getDirection } from '@/lib/utils/get-direction';
import { Root } from '@radix-ui/react-separator';
import { getLocale } from 'next-intl/server';
import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

async function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: ComponentProps<typeof Root>) {
  const locale = await getLocale();
  const dir = getDirection(locale);

  return (
    <Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
        className
      )}
      {...props}
      dir={dir}
    />
  );
}

export { Separator };
