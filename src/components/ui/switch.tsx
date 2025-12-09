'use client';

import { SwitchIcon, Switch as SwitchPrimitive, SwitchThumb } from '@/components/primitives/switch';
import { type ComponentProps, type ReactNode } from 'react';
import { cn, tv, type VariantProps } from 'tailwind-variants';

type SwitchProps = ComponentProps<typeof SwitchPrimitive> &
  VariantProps<typeof switchVariants> & {
    activeIcon?: ReactNode;
    disabledIcon?: ReactNode;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
  };

const switchVariants = tv({
  base: 'peer focus-visible:border-ring focus-visible:ring-ring/50 relative inline-flex cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    size: {
      sm: 'h-6 w-12',
      md: 'h-7.5 w-13',
      lg: 'h-9.5 w-16',
    },
    color: {
      primary: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      success: 'data-[state=checked]:bg-success-light-foreground data-[state=unchecked]:bg-input',
      warning: 'data-[state=checked]:bg-warning-light-foreground data-[state=unchecked]:bg-input',
      error: 'data-[state=checked]:bg-error-light-foreground data-[state=unchecked]:bg-input',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'primary',
  },
});

const startVariants = tv({
  base: 'pointer-events-none absolute top-1/2 -translate-y-1/2 transition-opacity',
  variants: {
    size: {
      sm: 'size-5 translate-x-[calc(100%+4px)]',
      md: 'size-6.5 translate-x-[calc(100%-4px)]',
      lg: 'size-8.5 translate-x-[calc(100%-8px)]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const endVariants = tv({
  base: 'pointer-events-none absolute top-1/2 -translate-y-1/2 transition-opacity',
  variants: {
    size: {
      sm: 'size-5 translate-x-0.5',
      md: 'size-6.5 translate-x-0.5',
      lg: 'size-8.5 translate-x-0.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const thumbVariants = tv({
  base: 'bg-background pointer-events-none block rounded-full ring-0 transition-transform',
  variants: {
    size: {
      sm: 'size-5 data-[state=checked]:translate-x-[calc(100%+4px)] data-[state=unchecked]:translate-x-0.5',
      md: 'size-6.5 data-[state=checked]:translate-x-[calc(100%-4px)] data-[state=unchecked]:translate-x-0.5',
      lg: 'size-8.5 data-[state=checked]:translate-x-[calc(100%-8px)] data-[state=unchecked]:translate-x-0.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function Switch({
  className,
  activeIcon,
  disabledIcon,
  startIcon,
  endIcon,
  size,
  color,
  ...props
}: SwitchProps) {
  return (
    <SwitchPrimitive
      data-slot="switch"
      className={cn(switchVariants({ size, color }), className)}
      {...props}
    >
      <SwitchIcon position="start" icon={startIcon} className={startVariants({ size })} />
      <SwitchIcon position="end" icon={endIcon} className={endVariants({ size })} />

      <SwitchThumb data-slot="switch-thumb" className={thumbVariants({ size })}>
        <SwitchIcon position="thumb" activeIcon={activeIcon} disabledIcon={disabledIcon} />
      </SwitchThumb>
    </SwitchPrimitive>
  );
}

export { Switch, type SwitchProps };
