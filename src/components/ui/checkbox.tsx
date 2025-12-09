'use client';

import { LuCheck } from 'react-icons/lu';
import { cn, tv, type VariantProps } from 'tailwind-variants';

const checkboxVariants = tv({
  base: 'focus-visible:ring-ring/50 relative flex size-8 cursor-pointer items-center justify-center transition-colors duration-150 focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:size-10',
  variants: {
    radius: {
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    active: {
      false: 'bg-background border-primary border',
      true: 'bg-primary',
    },
  },
  defaultVariants: {
    radius: 'full',
    active: false,
  },
});

interface CheckboxProps extends VariantProps<typeof checkboxVariants> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  markClassName?: string;
}

function Checkbox({
  checked = false,
  radius,
  className,
  markClassName,
  onCheckedChange,
}: CheckboxProps) {
  return (
    <div
      className={cn(checkboxVariants({ radius, active: checked }), className)}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
    >
      {checked && (
        <LuCheck
          strokeWidth={3}
          className={cn('text-primary-foreground size-4 md:size-6', markClassName)}
        />
      )}
    </div>
  );
}

export { Checkbox, checkboxVariants, type CheckboxProps };
