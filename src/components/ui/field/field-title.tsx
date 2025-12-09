'use client';

import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import { type ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

type FieldTitleProps = Omit<ComponentProps<'div'>, 'onAnimationStart' | 'onAnimationComplete'> &
  HTMLMotionProps<'div'>;

function FieldTitle({ className, ...props }: FieldTitleProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-slot="field-label"
      initial={reduce ? false : { opacity: 0, y: -2 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { FieldTitle };
