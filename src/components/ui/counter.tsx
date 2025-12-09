'use client';

import { Button } from '@/components/ui/buttons/button';
import { useState } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';
import { cn, tv, type VariantProps } from 'tailwind-variants';
import { AnimatedDigits } from './animated-digits';

type CounterVariants = VariantProps<typeof counterVariants>;

const counterVariants = tv({
  base: 'flex w-fit items-center justify-between gap-5 p-4 transition-all duration-200 select-none md:gap-6',
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      outline:
        'border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground border',
      ghost: 'text-foreground bg-transparent',
      'ghost-primary': 'text-foreground bg-transparent',
      'ghost-secondary': 'text-foreground bg-transparent',
    },
    radius: {
      sm: 'rounded-sm *:rounded-[0.2rem]',
      md: 'rounded-md *:rounded-[0.3rem]',
      lg: 'rounded-lg *:rounded-[0.4rem]',
      full: 'rounded-full *:rounded-full',
    },
  },
  defaultVariants: {
    variant: 'secondary',
    radius: 'lg',
  },
});

interface CounterProps extends CounterVariants {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  fontSize?: number;
  padding?: number;
  places?: number[];
  onChange?: (value: number) => void;
  className?: string;
}

function Counter({
  value: controlledValue,
  min = 1,
  max = 99,
  step = 1,
  fontSize = 40,
  padding = 0,
  places = [10, 1],
  variant,
  radius,
  onChange,
  className,
}: CounterProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? min);
  const value = controlledValue ?? internalValue;
  const height = fontSize + padding;

  const updateValue = (newValue: number) => {
    const clamped = Math.max(min, Math.min(newValue, max));
    if (controlledValue === undefined) setInternalValue(clamped);
    onChange?.(clamped);
  };

  // numbers should match text color rules
  const numberColor = variant === 'primary' ? 'text-primary-foreground' : 'text-foreground';

  // Button base and per-variant button styles.
  const buttonBase = 'transition-colors duration-150 p-3';

  const buttonStyles: Record<string, string> = {
    primary:
      'bg-background text-foreground hover:text-primary-foreground hover:bg-primary/80 disabled:text-foreground/30',
    secondary:
      'bg-background text-foreground hover:text-primary-foreground hover:bg-primary/80 disabled:text-foreground/30',
    outline:
      'bg-background text-foreground hover:bg-primary/80 hover:text-primary-foreground disabled:text-foreground/50',
    ghost:
      'bg-background text-foreground hover:bg-primary/80 hover:text-primary-foreground disabled:text-foreground/30',
    'ghost-primary':
      'bg-primary text-primary-foreground hover:bg-primary/80 disabled:bg-primary/20',
    'ghost-secondary':
      'bg-secondary text-foreground hover:bg-primary/80 hover:text-primary-foreground disabled:bg-primary/20 disabled:text-primary-foreground',
  };

  const resolvedButtonStyle =
    buttonStyles[variant ?? 'secondary'] + ' disabled:pointer-events-none';

  return (
    <div className={cn(counterVariants({ variant, radius }), className)}>
      {/* Decrement Button */}
      <Button
        type="button"
        variant="ghost"
        className={cn(buttonBase, resolvedButtonStyle)}
        disabled={value <= min}
        onClick={() => updateValue(value - step)}
      >
        <LuMinus className="size-6" />
      </Button>

      {/* Animated Digits */}
      <AnimatedDigits places={places} value={value} height={height} className={numberColor} />

      {/* Increment Button */}
      <Button
        type="button"
        variant="ghost"
        className={cn(buttonBase, resolvedButtonStyle)}
        disabled={value >= max}
        onClick={() => updateValue(value + step)}
      >
        <LuPlus className="size-6" />
      </Button>
    </div>
  );
}

export { Counter, counterVariants, type CounterProps, type CounterVariants };
