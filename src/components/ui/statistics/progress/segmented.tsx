'use client';

import { motion } from 'motion/react';
import { cn } from 'tailwind-variants';

interface SegmentedProgressProps {
  percentage: number;
  className?: string;
  animate?: boolean;
}

function SegmentedProgress({ percentage, className, animate = true }: SegmentedProgressProps) {
  const segments = [20, 40, 60, 80, 100];

  return (
    <div className={cn('flex w-full flex-col items-center gap-3', className)}>
      {/* Labels */}
      <div className="text-muted-foreground flex w-full justify-between text-xs font-medium md:text-sm">
        {segments.map((v) => (
          <span key={v}>{v}%</span>
        ))}
      </div>

      {/* Bars */}
      <div className="flex w-full justify-between gap-2">
        {segments.map((v, i) => {
          const start = i * 20;
          const fillPct = Math.max(0, Math.min(1, (percentage - start) / 20));

          return (
            <div key={v} className="bg-secondary h-2 flex-1 overflow-hidden rounded-full md:h-2.5">
              <motion.div
                className="bg-primary h-full rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: fillPct }}
                transition={animate ? { duration: 0.6, ease: 'easeOut' } : { duration: 0 }}
                style={{ originX: 0 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { SegmentedProgress, type SegmentedProgressProps };
