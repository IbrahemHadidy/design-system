'use client';

import { useReducedMotion } from 'motion/react';
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import { presets, type PresetName } from './presets';

interface ViewTransitionContextValue {
  isAnimating: boolean;
  setIsAnimating: (val: boolean) => void;
}

interface BaseProps extends ComponentPropsWithoutRef<'button'> {
  duration?: number;
  stopPropagation?: boolean;
  enableFade?: boolean;
  disableAnimateOld?: boolean;
  ref?: Ref<HTMLButtonElement>;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  onAnimationCancel?: () => void;
}

type WithPreset = BaseProps & { preset?: PresetName; customAnimation?: never };
type WithCustom = BaseProps & {
  customAnimation: (el: HTMLButtonElement, e?: MouseEvent) => void | Promise<void>;
  preset?: never;
};

type ViewTransitionButtonProps = WithPreset | WithCustom;

type Anim = void | Animation | Promise<void | Animation>;

const ViewTransitionContext = createContext<ViewTransitionContextValue | undefined>(undefined);

function ViewTransitionProvider({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <ViewTransitionContext.Provider value={{ isAnimating, setIsAnimating }}>
      {children}
    </ViewTransitionContext.Provider>
  );
}

function useViewTransition() {
  const ctx = useContext(ViewTransitionContext);
  if (!ctx) throw new Error('useViewTransition must be used within ViewTransitionProvider');
  return ctx;
}

function ViewTransitionButton({
  duration = 420,
  onClick,
  preset = 'ripple',
  customAnimation,
  enableFade = false,
  disableAnimateOld = false,
  stopPropagation = false,
  onAnimationStart,
  onAnimationEnd,
  onAnimationCancel,
  type = 'button',
  ...props
}: ViewTransitionButtonProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const mergedRef = props.ref ?? btnRef;

  const reduceMotion = useReducedMotion();

  const { isAnimating, setIsAnimating } = useViewTransition();

  const runAnimation = useCallback(async (anim?: Anim) => {
    try {
      await anim;
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleClickInternal = useCallback(
    async (event?: MouseEvent<HTMLButtonElement>) => {
      const button = btnRef.current;
      if (!button) return;
      if (stopPropagation) event?.stopPropagation();
      if (button.disabled) return;
      if (isAnimating) return;
      if (reduceMotion) {
        if (event) onClick?.(event);
        return;
      }

      setIsAnimating(true);
      onAnimationStart?.();

      try {
        let animResult: Anim = undefined;

        if (customAnimation) {
          animResult = customAnimation(button, event);
        } else if (preset) {
          const fn = presets[preset];
          if (fn)
            animResult = fn(button, duration, enableFade, disableAnimateOld, () => {
              if (event) onClick?.(event);
            });
        }

        await runAnimation(animResult);
        onAnimationEnd?.();
      } catch (err) {
        onAnimationCancel?.();
        console.warn(err);
      } finally {
        setIsAnimating(false);
      }
    },
    [
      disableAnimateOld,
      customAnimation,
      duration,
      enableFade,
      isAnimating,
      onAnimationCancel,
      onAnimationEnd,
      onAnimationStart,
      onClick,
      preset,
      reduceMotion,
      runAnimation,
      setIsAnimating,
      stopPropagation,
    ]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.key === ' ') e.preventDefault();
        void handleClickInternal(e as unknown as MouseEvent<HTMLButtonElement>);
      }
      props.onKeyDown?.(e);
    },
    [handleClickInternal, props]
  );

  return (
    <button
      {...props}
      ref={mergedRef}
      type={type}
      data-animating={isAnimating ? 'true' : undefined}
      onClick={handleClickInternal}
      onKeyDown={handleKeyDown}
      aria-busy={isAnimating || undefined}
    />
  );
}

export {
  useViewTransition,
  ViewTransitionButton,
  ViewTransitionContext,
  ViewTransitionProvider,
  type ViewTransitionButtonProps,
  type ViewTransitionContextValue,
};
