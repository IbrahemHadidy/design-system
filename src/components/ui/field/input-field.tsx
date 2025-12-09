'use client';

import { motion, useReducedMotion } from 'motion/react';
import { type ComponentProps } from 'react';
import { cn } from 'tailwind-variants';
import { Input } from './input';
import { Label } from './label';

interface InputFieldProps extends ComponentProps<typeof Input> {
  label?: string;
  labelPosition?: 'top' | 'border';
}

function InputField({ label, id, labelPosition = 'top', disabled, ...props }: InputFieldProps) {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-3">
      {label && labelPosition === 'top' && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        {label && labelPosition === 'border' && (
          <motion.div
            layout
            initial={false}
            transition={{ duration: reduce ? 0 : 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Label
              htmlFor={id}
              className={cn(
                'bg-background absolute start-4 -top-3 z-2 rounded-2xl px-1 text-sm',
                disabled && 'bg-transparent'
              )}
            >
              {label}
            </Label>
          </motion.div>
        )}
        <Input id={id} disabled={disabled} {...props} />
      </div>
    </div>
  );
}

export { InputField, type InputFieldProps };
