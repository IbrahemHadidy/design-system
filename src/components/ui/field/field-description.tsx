'use client';

import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import { type ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

type FieldTitleProps = Omit<ComponentProps<'p'>, 'onAnimationStart' | 'onAnimationComplete'> &
  HTMLMotionProps<'p'>;

function FieldDescription({ className, ...props }: FieldTitleProps) {
  const reduce = useReducedMotion();

  return (
    <motion.p
      data-slot="field-description"
      initial={reduce ? false : { opacity: 0, y: -1 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn(
        'text-muted-foreground text-sm leading-normal font-normal group-has-data-[orientation=horizontal]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

export { FieldDescription };
