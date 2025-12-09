'use client';

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect, useId } from 'react';
import { cn } from 'tailwind-variants';

interface CircularStepProgressTimelineProps {
  steps: string[];
  currentStep: string;
  size?: number;
  labelClass?: string;
}

const CircularStepProgressTimeline = ({
  steps,
  currentStep,
  size = 50,
  labelClass,
}: CircularStepProgressTimelineProps) => {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;

  const currentIndex = Math.max(0, steps.indexOf(currentStep));
  const totalSteps = steps.length;

  // Motion value for dash offset
  const dashOffsetMotion = useMotionValue(circumference);
  const dashOffsetSpring = useSpring(dashOffsetMotion, { stiffness: 120, damping: 20 });

  const dashOffset = circumference - ((currentIndex + 1) / totalSteps) * circumference;

  useEffect(() => {
    dashOffsetMotion.set(dashOffset);
  }, [dashOffset, dashOffsetMotion]);

  // Motion value for rolling number
  const progressValue = useMotionValue(currentIndex + 1);
  const springValue = useSpring(progressValue, { stiffness: 120, damping: 20 });
  const currentDisplay = useTransform(springValue, (v) => Math.round(v));

  useEffect(() => {
    progressValue.set(currentIndex + 1);
  }, [currentIndex, progressValue]);

  const gradId = useId();

  return (
    <div className="flex items-center gap-2">
      {/* Circular Progress */}
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center"
      >
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient
              id={gradId}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="100%"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" className="text-primary" stopColor="currentColor" />
              <stop offset="100%" className="text-primary/65" stopColor="currentColor" />
            </linearGradient>
          </defs>

          {/* Background Circle */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="var(--muted, #e5e7eb)"
            strokeWidth={strokeWidth}
          />

          {/* Animated Gradient Progress Circle */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffsetSpring}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </svg>

        {/* Center Label with rolling number */}
        <motion.div
          className="text-2xs absolute font-medium"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span>{currentDisplay}</motion.span> of {totalSteps}
        </motion.div>
      </div>

      {/* Animated Current Step Label */}
      <div className="flex flex-col gap-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep} // re-render on step change
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.3 }}
            className={cn('flex flex-col gap-0.5 text-sm', labelClass)}
          >
            <span className="text-foreground font-semibold">Step {currentIndex + 1}</span>
            <span className="text-foreground/40 font-medium">{steps[currentIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export { CircularStepProgressTimeline, type CircularStepProgressTimelineProps };
