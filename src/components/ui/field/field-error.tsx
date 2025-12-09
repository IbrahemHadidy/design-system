'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';
import { LuCircleAlert } from 'react-icons/lu';
import { cn } from 'tailwind-variants';
import { type MotionDivProps } from './field';

interface FieldErrorProps extends MotionDivProps {
  errors?: Array<{ message?: string } | undefined>;
  position: 'top' | 'bottom';
  topStyle?: 'light' | 'heavy';
  bottomTextPosition?: 'start' | 'end';
  errorIco?: boolean;
  children?: React.ReactNode;
}

function FieldError({
  className,
  children,
  errors,
  position,
  topStyle,
  bottomTextPosition = 'start',
  errorIco = true,
  ...props
}: FieldErrorProps) {
  const reduce = useReducedMotion();

  const content = useMemo(() => {
    if (children) return children;
    if (!errors?.length) return null;

    const uniqueErrors = [...new Map(errors.map((e) => [e?.message, e])).values()];
    if (uniqueErrors.length === 1) return uniqueErrors[0]?.message;

    return (
      <ul className="ms-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error, idx) => error?.message && <li key={idx}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) return null;

  const variants = {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
  };

  return (
    <AnimatePresence>
      <motion.div
        key={content?.toString()}
        role="alert"
        data-slot="field-error"
        initial={reduce ? false : 'hidden'}
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: reduce ? 0 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
        className={cn(
          position === 'top'
            ? `text-destructive text-2xs flex items-center gap-2 rounded-md px-4 py-3 font-semibold ${
                topStyle === 'heavy'
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-destructive/15'
              }`
            : `text-destructive text-2xs flex items-center gap-2 font-semibold ${
                bottomTextPosition === 'start' ? 'text-start' : 'text-end'
              }`,
          className
        )}
        {...props}
      >
        {errorIco && <LuCircleAlert className="size-5" />}
        {content}
      </motion.div>
    </AnimatePresence>
  );
}

export { FieldError, type FieldErrorProps };
