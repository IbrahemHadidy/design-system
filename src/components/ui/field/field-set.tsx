'use client';

import { type HTMLMotionProps, motion, useReducedMotion } from 'motion/react';
import { type ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

type FieldSetProps = Omit<ComponentProps<'fieldset'>, 'onAnimationStart' | 'onAnimationComplete'> &
  HTMLMotionProps<'fieldset'>;

function FieldSet({ className, ...props }: FieldSetProps) {
  const reduce = useReducedMotion();

  return (
    <motion.fieldset
      data-slot="field-set"
      initial={reduce ? false : { opacity: 0 }}
      animate={reduce ? {} : { opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'flex flex-col gap-6',
        'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className
      )}
      {...props}
    />
  );
}

export { FieldSet };
