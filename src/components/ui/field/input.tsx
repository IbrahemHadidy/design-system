'use client';

import { useTranslations } from 'next-intl';
import { useState, type ComponentProps, type ComponentType, type SVGProps } from 'react';
import { LuCircleAlert, LuEye, LuEyeOff, LuLoaderCircle } from 'react-icons/lu';
import { cn, tv, type VariantProps } from 'tailwind-variants';

const inputVariants = tv({
  base: cn(
    'relative flex w-full items-center rounded-lg border bg-transparent transition-all duration-150 ease-in-out',
    'hover:border-primary/75 hover:shadow-sm',
    'focus-within:border-ring focus-within:ring-ring/50 focus-within:shadow-sm focus-within:ring-2 focus-within:outline-none'
  ),
  variants: {
    size: {
      sm: 'h-9 px-3 text-sm sm:h-10 sm:px-4 sm:text-base',
      md: 'h-11 px-4 text-base sm:h-12 sm:px-5',
      lg: 'h-13 px-5 text-lg sm:h-14 sm:px-6',
    },
    state: {
      default: 'border-input',
      error: 'border-destructive ring-destructive/20 ring-1',
      disabled: 'bg-muted border-input cursor-not-allowed',
    },
    loading: {
      true: 'pointer-events-none cursor-wait text-transparent',
    },
    skeleton: {
      true: 'bg-muted pointer-events-none animate-pulse text-transparent shadow-none',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
  },
});

type InputProps = Omit<ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants> & {
    startIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    endIcon?: ComponentType<SVGProps<SVGSVGElement>>;
    skeleton?: boolean;
  };

function Input({
  className,
  type,
  size,
  state,
  startIcon: StartIcon,
  endIcon: EndIcon,
  skeleton = false,
  loading = false,
  disabled,
  ...props
}: InputProps) {
  const t = useTranslations('Components.Input');

  const isPassword = type === 'password';
  const [revealed, setRevealed] = useState(false);

  const computedState = disabled ? 'disabled' : state === 'error' ? 'error' : 'default';

  const isDisabled = disabled || skeleton || loading;

  const showErrorIcon = computedState === 'error' && !loading && !skeleton && !EndIcon;

  return (
    <div className={inputVariants({ size, state: computedState, loading, skeleton, className })}>
      {StartIcon && (
        <StartIcon
          className="text-foreground/40 pointer-events-none absolute start-3 top-1/2 size-5 -translate-y-1/2"
          aria-hidden
        />
      )}

      <input
        {...props}
        type={isPassword && revealed ? 'text' : type}
        disabled={isDisabled}
        className={cn(
          'placeholder:text-foreground/40 flex-1 bg-transparent outline-none',
          StartIcon && 'ps-7 sm:ps-8',
          (EndIcon || loading || showErrorIcon) && 'pe-7 sm:pe-8'
        )}
      />

      <LuLoaderCircle
        className={cn(
          'text-foreground/50 pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2 animate-spin transition-opacity duration-300',
          loading ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden
      />

      {showErrorIcon && !isPassword && (
        <LuCircleAlert
          className="text-destructive pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2"
          aria-hidden
        />
      )}

      {isPassword && !loading && !skeleton && (
        <button
          type="button"
          aria-label={revealed ? t('hidePassword') : t('showPassword')}
          aria-pressed={revealed}
          onClick={() => setRevealed((r) => !r)}
          className="hover:bg-primary/10 focus-visible:ring-ring absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1 transition-[colors,transform] duration-150 ease-in-out focus-visible:ring-2 focus-visible:outline-none active:scale-95"
        >
          {revealed ? (
            <LuEyeOff className="text-foreground/60 size-5" aria-hidden />
          ) : (
            <LuEye className="text-foreground/60 size-5" aria-hidden />
          )}
        </button>
      )}

      {EndIcon && !isPassword && !loading && !skeleton && (
        <EndIcon
          className="text-foreground/40 pointer-events-none absolute end-3 top-1/2 size-5 -translate-y-1/2"
          aria-hidden
        />
      )}
    </div>
  );
}

export { Input, inputVariants, type InputProps };
