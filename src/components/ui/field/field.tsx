'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { type ComponentProps } from 'react';
import { cn, tv, type VariantProps } from 'tailwind-variants';

type MotionDivProps = Omit<ComponentProps<'div'>, 'onAnimationStart' | 'onAnimationComplete'> &
  HTMLMotionProps<'div'>;

const fieldVariants = tv({
  base: 'group/field data-[invalid=true]:text-destructive flex w-full gap-3',
  variants: {
    orientation: {
      vertical: ['flex-col *:w-full [&>.sr-only]:w-auto'],
      horizontal: [
        'flex-row items-center',
        '*:data-[slot=field-label]:flex-auto',
        'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
      responsive: [
        'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto [&>.sr-only]:w-auto',
        '@md/field-group:*:data-[slot=field-label]:flex-auto',
        '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

function Field({
  className,
  orientation = 'vertical',
  ...props
}: MotionDivProps & VariantProps<typeof fieldVariants>) {
  return (
    <motion.div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      layout
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: MotionDivProps) {
  return (
    <motion.div
      data-slot="field-group"
      layout
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4',
        className
      )}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', className)}
      {...props}
    />
  );
}

export { Field, FieldContent, FieldGroup, fieldVariants, type MotionDivProps };
