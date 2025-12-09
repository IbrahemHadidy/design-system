'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Fragment } from 'react';
import { LuCheck, LuChevronRight } from 'react-icons/lu';
import { cn } from 'tailwind-variants';

type Shape = 'circle' | 'square';
type CurrentVariant = 'solid' | 'outline' | 'indicator';
type CompletedVariant = 'primary' | 'success' | 'success-light';

interface ExtendedHorizontalTimelineProps {
  steps: string[];
  currentStep: string;
  shape?: Shape;
  currentVariant?: CurrentVariant;
  completedVariant?: CompletedVariant;
  useCheckForCompleted?: boolean;
  className?: string;
}

function ExtendedHorizontalTimeline({
  steps,
  currentStep,
  shape = 'circle',
  currentVariant = 'outline',
  completedVariant = 'primary',
  useCheckForCompleted = false,
  className,
}: ExtendedHorizontalTimelineProps) {
  const reduceMotion = useReducedMotion();

  const currentIndex = Math.max(0, steps.indexOf(currentStep ?? steps.length + 1));

  const twoDigit = (i: number) => String(i + 1).padStart(2, '0');

  const resolveVar = (varName: string) =>
    getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

  return (
    <div className={cn('w-full', className)}>
      {/* Circles + Bars */}
      <div className="flex items-center gap-4">
        {steps.map((label, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;

          const circleContent =
            isCompleted && useCheckForCompleted ? <LuCheck className="size-5" /> : twoDigit(idx);

          // keep layout-related classes but remove color classes (we animate colors)
          const circleBase =
            'flex items-center justify-center rounded-full text-base font-medium transition-colors';
          const circleSize = 'size-8 md:size-10';

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
              targetBg = '--muted';
              targetText = '--background';
              borderWidth = 0;
            }

            return {
              backgroundColor: resolveVar(targetBg),
              color: resolveVar(targetText),
              border: targetBorder
                ? `${borderWidth}px solid color(${resolveVar(targetBorder)} / ${borderOpacity})`
                : undefined,
            };
          };

          const showChevron = idx < steps.length - 1;

          const circleStyle = getStepColors(isCompleted, isActive);

          return (
            <Fragment key={label}>
              {/* Circle */}
              <div className="flex items-center gap-2">
                <motion.div
                  layout
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          scale: isActive ? 1.06 : 1,
                          opacity: isCompleted || isActive ? 1 : 0.3,
                        }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.3 }}
                  className={cn(
                    circleBase,
                    circleSize,
                    'relative',
                    shape === 'circle' ? 'rounded-full' : 'rounded-xl'
                  )}
                  style={circleStyle}
                >
                  {isActive && currentVariant === 'indicator' ? (
                    <motion.div
                      layout
                      initial={{ scale: 0, opacity: 0 }}
                      animate={reduceMotion ? {} : { scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3 }}
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

                <div className="flex flex-col items-start justify-center">
                  <span
                    className={cn(
                      'text-muted text-2xs font-medium md:text-xs',
                      isActive && 'text-primary/70',
                      isCompleted &&
                        (completedVariant === 'primary' ? 'text-primary/70' : 'text-success/70')
                    )}
                  >
                    Step {idx + 1}
                  </span>
                  <span
                    className={cn(
                      'text-muted text-xs font-medium md:text-sm',
                      isActive && 'text-primary',
                      isCompleted &&
                        (completedVariant === 'primary' ? 'text-primary' : 'text-success')
                    )}
                  >
                    {label}
                  </span>
                </div>
              </div>

              {/* Bar / Chevron */}
              {showChevron && (
                <motion.div
                  key={idx}
                  animate={isCompleted ? (reduceMotion ? {} : { x: [0, 6, 0] }) : { x: 0 }}
                  transition={reduceMotion ? {} : { duration: 0.3, ease: 'easeOut' }}
                >
                  <LuChevronRight className="text-foreground size-7 rtl:rotate-180" />
                </motion.div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export {
  ExtendedHorizontalTimeline,
  type CompletedVariant,
  type CurrentVariant,
  type ExtendedHorizontalTimelineProps,
  type Shape,
};
