'use client';

import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from '@/components/primitives/button';
import { LuLoaderCircle } from 'react-icons/lu';
import { cn, tv, type VariantProps } from 'tailwind-variants';

const buttonVariants = tv({
  base: cn(
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap select-none',
    'rounded-lg text-sm leading-none font-medium',
    'transition-all duration-150 ease-in-out will-change-transform',
    'cursor-pointer active:opacity-70',
    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-40'
  ),
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
      outline: 'bg-background text-primary hover:bg-accent hover:text-accent-foreground border',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      ghost: 'text-primary hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary bg-transparent underline-offset-4 hover:underline',
      text: 'text-primary hover:text-primary/90 bg-transparent px-0 py-0',
      gradient:
        'from-primary text-primary-foreground hover:from-primary/90 to-primary-dark hover:to-primary-dark/80 bg-linear-to-b',
    },
    state: {
      none: '',
      success: 'bg-success text-success-foreground hover:bg-success/90',
      warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
      danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    size: {
      none: '',
      default: 'h-10 px-4',
      sm: 'h-8 px-3 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'size-10 p-0',
    },
    elevation: {
      none: '',
      xs: 'shadow-xs',
      sm: 'shadow-sm hover:shadow-md',
      md: 'shadow hover:shadow-lg',
    },
    width: {
      auto: 'w-auto',
      full: 'w-full',
    },
    loading: {
      true: 'pointer-events-none relative text-transparent',
    },
    skeleton: {
      true: 'bg-muted pointer-events-none animate-pulse text-transparent shadow-none',
    },
  },
  compoundVariants: [
    {
      loading: true,
      class: 'before:absolute before:inset-0 before:flex before:items-center before:justify-center',
    },
  ],
  defaultVariants: {
    variant: 'default',
    radius: 'lg',
    size: 'default',
    motion: 'normal',
    elevation: 'xs',
    width: 'auto',
    state: 'none',
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonPrimitiveProps &
  ButtonVariants & {
    loading?: boolean;
    skeleton?: boolean;
  };

function Button({
  className,
  children,
  variant,
  state,
  radius,
  size,
  elevation,
  width,
  loading = false,
  skeleton = false,
  ...props
}: ButtonProps) {
  const showSpinner = loading && !skeleton;

  return (
    <ButtonPrimitive
      className={cn(
        buttonVariants({
          variant,
          state,
          radius,
          size,
          elevation,
          width,
          loading,
          skeleton,
          className,
        })
      )}
      disabled={props.disabled || loading || skeleton}
      aria-busy={loading || skeleton}
      {...props}
    >
      <>
        {showSpinner && (
          <LuLoaderCircle
            className="absolute inset-0 m-auto size-4 animate-spin text-current"
            aria-hidden
          />
        )}
        {children}
      </>
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants, type ButtonProps };
