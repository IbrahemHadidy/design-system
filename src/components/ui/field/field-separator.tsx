'use client';

import { Separator } from '@/components/ui/separator';
import { AnimatePresence, motion } from 'motion/react';
import { type ComponentProps, type ReactNode } from 'react';
import { cn } from 'tailwind-variants';

function FieldSeparator({
  children,
  className,
  ...props
}: ComponentProps<'div'> & { children?: ReactNode }) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      <AnimatePresence>
        {children && (
          <motion.span
            key={children?.toString()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
            data-slot="field-separator-content"
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

export { FieldSeparator };
