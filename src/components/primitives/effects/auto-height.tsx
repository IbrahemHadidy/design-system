'use client';

import { Slot, type WithAsChild } from '@/components/primitives/slot';
import { useAutoHeight } from '@/hooks/use-auto-height';
import {
  motion,
  type HTMLMotionProps,
  type TargetAndTransition,
  type Transition,
} from 'motion/react';
import type { DependencyList, ReactNode } from 'react';

type AutoHeightProps = WithAsChild<
  {
    children: ReactNode;
    deps?: DependencyList;
    animate?: TargetAndTransition;
    transition?: Transition;
  } & Omit<HTMLMotionProps<'div'>, 'animate'>
>;

function AutoHeight({
  children,
  deps = [],
  transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
    bounce: 0,
    restDelta: 0.01,
  },
  style,
  animate,
  asChild = false,
  ...props
}: AutoHeightProps) {
  const { ref, height } = useAutoHeight<HTMLDivElement>(deps);

  const Comp = asChild ? Slot : motion.div;

  return (
    <Comp
      style={{ overflow: 'hidden', ...style }}
      animate={{ height, ...animate }}
      transition={transition}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </Comp>
  );
}

export { AutoHeight, type AutoHeightProps };
