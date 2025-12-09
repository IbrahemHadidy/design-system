'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ComponentProps } from 'react';
import { cn } from 'tailwind-variants';
import { Label } from './label';

function FieldLabel({ className, children, ...props }: ComponentProps<typeof Label>) {
  const reduce = useReducedMotion();

  return (
    <Label
      data-slot="field-label"
      className={cn(
        'text-foreground/80 relative overflow-hidden text-sm font-medium md:text-base',
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
        className
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center gap-2">{children}</div>

      <motion.div
        layout
        initial={false}
        transition={{ duration: reduce ? 0 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        className="group-data-[state=checked]/field:bg-primary/10 dark:group-data-[state=checked]/field:bg-primary/20 pointer-events-none absolute inset-0 rounded-md bg-[currentColor]/5"
      />
    </Label>
  );
}

export { FieldLabel };
