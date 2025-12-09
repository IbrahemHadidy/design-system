'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';
import { Arrow, Content, Portal, Provider, Root, Trigger } from '@radix-ui/react-tooltip';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
  type MotionValue,
  type SpringOptions,
} from 'motion/react';
import type { ComponentProps, MouseEvent } from 'react';

type TooltipContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  x: MotionValue<number>;
  y: MotionValue<number>;
  followCursor?: boolean | 'x' | 'y';
  followCursorSpringOptions?: SpringOptions;
};

const [LocalTooltipProvider, useTooltip] = getStrictContext<TooltipContextType>('TooltipContext');

type TooltipProviderProps = ComponentProps<typeof Provider>;

function TooltipProvider(props: TooltipProviderProps) {
  return <Provider data-slot="tooltip-provider" {...props} />;
}

type TooltipProps = ComponentProps<typeof Root> & {
  followCursor?: boolean | 'x' | 'y';
  followCursorSpringOptions?: SpringOptions;
};

function Tooltip({
  followCursor = false,
  followCursorSpringOptions = { stiffness: 200, damping: 17 },
  ...props
}: TooltipProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <LocalTooltipProvider
      value={{
        isOpen,
        setIsOpen,
        x,
        y,
        followCursor,
        followCursorSpringOptions,
      }}
    >
      <Root data-slot="tooltip" {...props} onOpenChange={setIsOpen} />
    </LocalTooltipProvider>
  );
}

type TooltipTriggerProps = ComponentProps<typeof Trigger>;

function TooltipTrigger({ onMouseMove, ...props }: TooltipTriggerProps) {
  const { x, y, followCursor } = useTooltip();

  const handleMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(event);

    const target = event.currentTarget.getBoundingClientRect();

    if (followCursor === 'x' || followCursor === true) {
      const eventOffsetX = event.clientX - target.left;
      const offsetXFromCenter = (eventOffsetX - target.width / 2) / 2;
      x.set(offsetXFromCenter);
    }

    if (followCursor === 'y' || followCursor === true) {
      const eventOffsetY = event.clientY - target.top;
      const offsetYFromCenter = (eventOffsetY - target.height / 2) / 2;
      y.set(offsetYFromCenter);
    }
  };

  return <Trigger data-slot="tooltip-trigger" onMouseMove={handleMouseMove} {...props} />;
}

type TooltipPortalProps = Omit<ComponentProps<typeof Portal>, 'forceMount'>;

function TooltipPortal(props: TooltipPortalProps) {
  const { isOpen } = useTooltip();

  return (
    <AnimatePresence>
      {isOpen && <Portal forceMount data-slot="tooltip-portal" {...props} />}
    </AnimatePresence>
  );
}

type TooltipContentProps = Omit<ComponentProps<typeof Content>, 'forceMount' | 'asChild'> &
  HTMLMotionProps<'div'>;

function TooltipContent({
  onEscapeKeyDown,
  onPointerDownOutside,
  side,
  sideOffset,
  align,
  alignOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  style,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}: TooltipContentProps) {
  const { x, y, followCursor, followCursorSpringOptions } = useTooltip();
  const translateX = useSpring(x, followCursorSpringOptions);
  const translateY = useSpring(y, followCursorSpringOptions);

  return (
    <Content
      asChild
      forceMount
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      avoidCollisions={avoidCollisions}
      collisionBoundary={collisionBoundary}
      collisionPadding={collisionPadding}
      arrowPadding={arrowPadding}
      sticky={sticky}
      hideWhenDetached={hideWhenDetached}
      onEscapeKeyDown={onEscapeKeyDown}
      onPointerDownOutside={onPointerDownOutside}
    >
      <motion.div
        key="popover-content"
        data-slot="popover-content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={transition}
        style={{
          x: followCursor === 'x' || followCursor === true ? translateX : undefined,
          y: followCursor === 'y' || followCursor === true ? translateY : undefined,
          ...style,
        }}
        {...props}
      />
    </Content>
  );
}

type TooltipArrowProps = ComponentProps<typeof Arrow>;

function TooltipArrow(props: TooltipArrowProps) {
  return <Arrow data-slot="tooltip-arrow" {...props} />;
}

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
  useTooltip,
  type TooltipArrowProps,
  type TooltipContentProps,
  type TooltipContextType,
  type TooltipPortalProps,
  type TooltipProps,
  type TooltipProviderProps,
  type TooltipTriggerProps,
};
