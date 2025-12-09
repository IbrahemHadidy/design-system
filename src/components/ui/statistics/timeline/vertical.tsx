'use client';

import { motion } from 'motion/react';
import { Fragment } from 'react';
import { LuCheck } from 'react-icons/lu';
import { cn } from 'tailwind-variants';

type Shape = 'circle' | 'square';
type CurrentVariant = 'solid' | 'outline' | 'indicator';
type CompletedVariant = 'primary' | 'success' | 'success-light';

interface VerticalTimelineProps {
  steps: string[];
  currentStep: string;
  shape?: Shape;
  currentVariant?: CurrentVariant;
  completedVariant?: CompletedVariant;
  useCheckForCompleted?: boolean;
  animate?: boolean;
  className?: string;
}

function VerticalTimeline({
  steps,
  currentStep,
  shape = 'circle',
  currentVariant = 'outline',
  completedVariant = 'primary',
  useCheckForCompleted = false,
  animate = true,
  className,
}: VerticalTimelineProps) {
  const currentIndex = Math.max(0, steps.indexOf(currentStep ?? steps.length + 1));

  // --- Resolve color variables ---
  const resolveVar = (v: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(v).trim();

  const getStepColors = (isCompleted: boolean, isActive: boolean) => {
    let targetBg = '--muted';
    let targetText = '--background';
    let targetBorder: string | undefined = undefined;
    let borderWidth = 0;
    let borderOpacity = 1;

    if (isActive) {
      if (currentVariant === 'outline') {
        // outline
        targetBg = '--background';
        targetText = '--primary';
        targetBorder = '--primary';
        borderWidth = 1;
      } else if (currentVariant === 'solid') {
        // solid active
        targetBg = '--primary';
        targetText = '--background';
        borderWidth = 0;
      } else {
        // indicator
        targetBg = '--primary';
        targetBorder = '--primary';
        borderOpacity = 0.5;
        borderWidth = 4;
      }
    } else if (isCompleted) {
      if (completedVariant === 'primary') {
        targetBg = '--primary';
        targetText = '--background';
      } else if (completedVariant === 'success') {
        targetBg = '--success';
        targetText = '--background';
      } else {
        targetBg = '--success-light';
        targetText = '--success';
      }
    } else {
      targetBg = '--background';
      targetText = '--primary';
      targetBorder = '--primary';
      borderWidth = 1;
    }

    return {
      backgroundColor: resolveVar(targetBg),
      color: resolveVar(targetText),
      border: targetBorder
        ? `${borderWidth}px solid color(${resolveVar(targetBorder)} / ${borderOpacity})`
        : undefined,
    };
  };

  const twoDigit = (i: number) => String(i + 1).padStart(2, '0');

  return (
    <div className={cn('flex h-full w-full flex-row', className)}>
      {/* Circles + Bars */}
      <div className="flex flex-1 flex-col items-center gap-2">
        {steps.map((label, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          const showBar = idx < steps.length - 1;

          const circleContent =
            isCompleted && useCheckForCompleted ? <LuCheck className="size-5" /> : twoDigit(idx);

          const circleStyle = getStepColors(isCompleted, isActive);

          return (
            <Fragment key={label}>
              {/* Circle */}
              <motion.div
                layout
                animate={{ scale: isActive ? 1.06 : 1, opacity: isCompleted || isActive ? 1 : 0.3 }}
                transition={{ duration: animate ? 0.3 : 0 }}
                className={cn(
                  'flex size-10 items-center justify-center text-base font-medium',
                  shape === 'circle' ? 'rounded-full' : 'rounded-xl'
                )}
                style={circleStyle}
              >
                {isActive && currentVariant === 'indicator' ? (
                  <motion.div
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: animate ? 0.3 : 0 }}
                    className={cn(
                      'bg-background size-4',
                      shape === 'circle' ? 'rounded-full' : 'rounded-sm'
                    )}
                  />
                ) : (
                  <span className="pointer-events-none flex items-center justify-center">
                    {circleContent}
                  </span>
                )}
              </motion.div>

              {/* Bar */}
              {showBar && (
                <div className="bg-muted w-1 flex-1 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: isCompleted ? '100%' : '0%',
                      opacity: 1,
                    }}
                    transition={{
                      duration: animate ? 0.5 : 0,
                      ease: 'easeInOut',
                      delay: idx * 0.05,
                    }}
                    style={{
                      backgroundColor: isCompleted
                        ? resolveVar(
                            completedVariant === 'primary'
                              ? '--primary'
                              : completedVariant === 'success'
                                ? '--success'
                                : '--success-light'
                          )
                        : resolveVar('--muted'),
                    }}
                    className="h-full w-full rounded-full"
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* Titles */}
      <div className="ms-2 flex h-full flex-col justify-between">
        {steps.map((label, idx) => {
          const isActive = idx === currentIndex;
          const isCompleted = idx < currentIndex;

          return (
            <div key={label} className="flex flex-col items-start justify-center">
              <span
                className={cn(
                  'text-primary/30 text-2xs font-medium md:text-xs',
                  isActive && 'text-primary/70',
                  isCompleted &&
                    (completedVariant === 'primary' ? 'text-primary/70' : 'text-success/70')
                )}
              >
                Step {idx + 1}
              </span>
              <span
                className={cn(
                  'text-primary/30 text-xs font-medium md:text-sm',
                  isActive && 'text-primary',
                  isCompleted && (completedVariant === 'primary' ? 'text-primary' : 'text-success')
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export {
  VerticalTimeline,
  type CompletedVariant,
  type CurrentVariant,
  type Shape,
  type VerticalTimelineProps,
};
