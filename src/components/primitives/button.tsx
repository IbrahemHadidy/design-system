'use client';

import { Slot, type WithAsChild } from '@/components/primitives/slot';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

type ButtonProps = WithAsChild<
  HTMLMotionProps<'button'> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function Button({ hoverScale = 1.03, tapScale = 0.97, asChild = false, ...props }: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const Component = asChild ? Slot : motion.button;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: hoverScale },
        whileTap: { scale: tapScale },
      };

  return <Component {...motionProps} {...props} />;
}

export { Button, type ButtonProps };
