'use client';

import { getDirection } from '@/lib/utils/get-direction';
import { Root } from '@radix-ui/react-label';
import { motion, useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

function Label({ className, ...props }: ComponentProps<typeof Root>) {
  const locale = useLocale();
  const dir = getDirection(locale);
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: -1 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Root
        data-slot="label"
        dir={dir}
        className={cn(
          'text-foreground/80 flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 md:text-base',
          className
        )}
        {...props}
      />
    </motion.div>
  );
}

export { Label };
