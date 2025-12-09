'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';
import { getDirection } from '@/lib/utils/get-direction';
import { Root, Thumb } from '@radix-ui/react-switch';
import {
  type HTMLMotionProps,
  motion,
  type TargetAndTransition,
  useReducedMotion,
  type VariantLabels,
} from 'motion/react';
import { useLocale } from 'next-intl';
import { type ComponentProps, type ReactNode, useState } from 'react';

type SwitchContextType = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  isPressed: boolean;
  setIsPressed: (isPressed: boolean) => void;
};

const [SwitchProvider, useSwitch] = getStrictContext<SwitchContextType>('SwitchContext');

type SwitchProps = Omit<ComponentProps<typeof Root>, 'asChild'> & HTMLMotionProps<'button'>;

function Switch(props: SwitchProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  const [isPressed, setIsPressed] = useState(false);
  const [isChecked, setIsChecked] = useControlledState({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onCheckedChange,
  });

  return (
    <SwitchProvider value={{ isChecked, setIsChecked, isPressed, setIsPressed }}>
      <Root {...props} dir={dir} onCheckedChange={setIsChecked} asChild>
        <motion.button
          data-slot="switch"
          whileTap="tap"
          initial={false}
          onTapStart={() => setIsPressed(true)}
          onTapCancel={() => setIsPressed(false)}
          onTap={() => setIsPressed(false)}
          {...props}
        />
      </Root>
    </SwitchProvider>
  );
}

type SwitchThumbProps = Omit<ComponentProps<typeof Thumb>, 'asChild'> &
  HTMLMotionProps<'div'> & {
    pressedAnimation?: TargetAndTransition | VariantLabels | boolean;
  };

function SwitchThumb({
  pressedAnimation,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}: SwitchThumbProps) {
  const { isPressed } = useSwitch();
  const reduceMotion = useReducedMotion();

  return (
    <Thumb asChild>
      <motion.div
        data-slot="switch-thumb"
        layout
        transition={reduceMotion ? { duration: 0 } : transition}
        animate={isPressed && !reduceMotion ? pressedAnimation : undefined}
        {...props}
      />
    </Thumb>
  );
}

type SwitchIconProps = HTMLMotionProps<'div'> & {
  transition?: HTMLMotionProps<'div'>['transition'];
} & (
    | {
        position: 'thumb';
        activeIcon?: ReactNode;
        disabledIcon?: ReactNode;
      }
    | {
        position: 'start' | 'end';
        icon?: ReactNode;
      }
  );

function SwitchIcon(props: SwitchIconProps) {
  const { position } = props;
  const { isChecked } = useSwitch();
  const reduceMotion = useReducedMotion();

  const appliedTransition = reduceMotion
    ? { duration: 0 }
    : (props.transition ?? { duration: 0.3 });

  if (position === 'thumb') {
    const { activeIcon, disabledIcon, ...rest } = props;

    if (!activeIcon && !disabledIcon) return null;

    return (
      <div
        data-slot={`switch-${position}-icon`}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {activeIcon && (
          <motion.div
            animate={{ opacity: isChecked ? 1 : 0 }}
            transition={appliedTransition}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
            {...rest}
          >
            {activeIcon}
          </motion.div>
        )}
        {disabledIcon && (
          <motion.div
            animate={{ opacity: isChecked ? 0 : 1 }}
            transition={appliedTransition}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
            {...rest}
          >
            {disabledIcon}
          </motion.div>
        )}
      </div>
    );
  }

  // position is 'start' | 'end'
  const isAnimated = position === 'end' ? !isChecked : isChecked;

  return (
    <motion.div
      data-slot={`switch-${position}-icon`}
      animate={isAnimated ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={props.transition}
      {...props}
    />
  );
}

export {
  Switch,
  SwitchIcon,
  SwitchThumb,
  useSwitch,
  type SwitchContextType,
  type SwitchIconProps,
  type SwitchProps,
  type SwitchThumbProps,
};
