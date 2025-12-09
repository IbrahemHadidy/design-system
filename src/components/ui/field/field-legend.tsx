'use client';

import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import { type ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

type FieldLegendProps = Omit<ComponentProps<'legend'>, 'onAnimationStart' | 'onAnimationComplete'> &
  HTMLMotionProps<'legend'> & {
    variant?: 'legend' | 'label';
  };

function FieldLegend({ className, variant = 'legend', ...props }: FieldLegendProps) {
  const reduce = useReducedMotion();

  return (
    <motion.legend
      data-slot="field-legend"
      data-variant={variant}
      initial={reduce ? false : { opacity: 0, y: -2 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        'mb-3 font-medium',
        'data-[variant=legend]:text-base',
        'data-[variant=label]:text-sm',
        className
      )}
      {...props}
    />
  );
}

export { FieldLegend, type FieldLegendProps };
