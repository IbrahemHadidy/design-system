'use client';

import { motion } from 'motion/react';
import { cn } from 'tailwind-variants';

interface LinearProgressProps {
  variant: 'default' | 'indicator' | 'thick';
  percentage: number;
  rounded?: boolean;
  hideLabel?: boolean;
  className?: string;
  labelClassName?: string;
  animate?: boolean;
  gradient?: boolean;
}

const LinearProgress = ({
  variant,
  percentage,
  rounded = true,
  hideLabel = false,
  className,
  labelClassName,
  animate = true,
  gradient = true,
}: LinearProgressProps) => {
  return (
    <div
      className={cn(
        'w-full',
        variant === 'default' && !hideLabel && 'flex h-4 flex-col justify-end md:h-5',
        variant === 'indicator' && !hideLabel && 'flex h-4.5 flex-col justify-end md:h-5.5'
      )}
    >
      <div
        className={cn(
          'relative w-full',
          variant === 'thick' ? 'h-4 md:h-5' : 'h-2 md:h-3',
          className
        )}
      >
        {/* Background */}
        <div
          className={cn(
            'bg-secondary h-full w-full',
            variant === 'thick' && 'bg-primary/50',
            rounded ? 'rounded-full' : 'rounded-s-full',
            'overflow-hidden'
          )}
        >
          {/* Foreground */}
          <motion.div
            className={cn(
              'h-full',
              rounded ? 'rounded-full' : 'rounded-s-full',
              gradient
                ? 'from-primary/70 to-primary bg-linear-to-r rtl:bg-linear-to-l'
                : 'bg-primary'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={animate ? { duration: 1, ease: 'easeOut' } : undefined}
          />
        </div>

        {/* Labels or indicator */}
        {!hideLabel && variant === 'thick' && (
          <div
            className={cn(
              'text-primary-foreground absolute inset-0 flex items-center justify-center text-xs font-medium md:text-sm',
              labelClassName
            )}
          >
            {Math.round(percentage)}%
          </div>
        )}

        {!hideLabel && variant !== 'thick' && (
          <motion.div
            className={cn(
              'absolute -top-3 w-9 -translate-x-4 -translate-y-1/2 text-center text-xs font-medium md:text-sm',
              variant === 'indicator' && '-top-3.5',
              labelClassName
            )}
            style={{ left: `${percentage}%` }}
            animate={{ left: `${percentage}%` }}
            transition={animate ? { duration: 1, ease: 'easeOut' } : undefined}
          >
            {Math.round(percentage)}%
          </motion.div>
        )}

        {!hideLabel && variant === 'indicator' && (
          <motion.div
            className="border-primary bg-background absolute top-1/2 size-5 -translate-x-3 -translate-y-1/2 rounded-full border-4 md:size-6"
            style={{ left: `${percentage}%` }}
            animate={{ left: `${percentage}%` }}
            transition={animate ? { duration: 1, ease: 'easeOut' } : undefined}
          />
        )}
      </div>
    </div>
  );
};

export { LinearProgress, type LinearProgressProps };
