'use client';

import { motion } from 'motion/react';
import { cn } from 'tailwind-variants';

interface SegmentedTimelineProps {
  steps: string[];
  currentStep: string;
  currentWide?: boolean;
  showCompleteColor?: boolean;
  showDots?: boolean;
  className?: string;
}

function SegmentedTimeline({
  steps,
  currentStep,
  currentWide = false,
  showCompleteColor = false,
  showDots = false,
  className,
}: SegmentedTimelineProps) {
  const currentIndex = steps.indexOf(currentStep);
  const baseColor = showCompleteColor ? 'text-success' : 'text-primary';
  const inactiveColor = 'text-foreground';

  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <motion.div
        layout
        className="flex w-full justify-between gap-2"
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {steps.map((label, i) => {
          const isCompleted = i < currentIndex;
          const isActive = i === currentIndex;
          const labelColor = isCompleted ? baseColor : isActive ? 'text-primary' : inactiveColor;
          const dotColor = isCompleted
            ? baseColor.replace('text-', 'bg-')
            : isActive
              ? 'bg-primary'
              : 'bg-secondary';
          const barColor = isCompleted
            ? baseColor.replace('text-', 'bg-')
            : isActive
              ? 'bg-primary'
              : 'bg-transparent';
          const labelClass = labelColor + ' text-xs md:text-sm font-medium';

          return (
            <motion.div
              layout
              key={label}
              className="flex flex-1 flex-col items-center gap-1.5"
              animate={{
                flex: isActive && currentWide ? 3 : 1,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <motion.span
                key={label}
                className={cn(labelClass)}
                animate={{
                  color: isCompleted
                    ? 'var(--success)'
                    : isActive
                      ? 'var(--primary)'
                      : 'var(--foreground)',
                }}
                transition={{ duration: 0.3 }}
              >
                {label}
              </motion.span>

              {showDots && (
                <motion.div
                  layout
                  className={cn('size-1.5 rounded-full', dotColor)}
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    opacity: isCompleted || isActive ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}

              <div className="bg-muted relative h-2 w-full overflow-hidden rounded-full md:h-2.5">
                <motion.div
                  layout
                  className={cn('absolute start-0 top-0 h-full rounded-full', barColor)}
                  animate={{
                    width: isCompleted || isActive ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut', delay: i * 0.05 }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export { SegmentedTimeline, type SegmentedTimelineProps };
