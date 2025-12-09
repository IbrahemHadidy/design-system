'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';
import { Anchor, Arrow, Close, Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import type { ComponentProps } from 'react';

type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const [PopoverProvider, usePopover] = getStrictContext<PopoverContextType>('PopoverContext');

type PopoverProps = ComponentProps<typeof Root>;

function Popover(props: PopoverProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <PopoverProvider value={{ isOpen, setIsOpen }}>
      <Root data-slot="popover" {...props} onOpenChange={setIsOpen} />
    </PopoverProvider>
  );
}

type PopoverTriggerProps = ComponentProps<typeof Trigger>;

function PopoverTrigger(props: PopoverTriggerProps) {
  return <Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverPortalProps = Omit<ComponentProps<typeof Portal>, 'forceMount'>;

function PopoverPortal(props: PopoverPortalProps) {
  const { isOpen } = usePopover();

  return (
    <AnimatePresence>
      {isOpen && <Portal forceMount data-slot="popover-portal" {...props} />}
    </AnimatePresence>
  );
}

type PopoverContentProps = Omit<ComponentProps<typeof Content>, 'forceMount' | 'asChild'> &
  HTMLMotionProps<'div'>;

function PopoverContent({
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onFocusOutside,
  onInteractOutside,
  align,
  alignOffset,
  side,
  sideOffset,
  avoidCollisions,
  collisionBoundary,
  collisionPadding,
  arrowPadding,
  sticky,
  hideWhenDetached,
  transition = { type: 'spring', stiffness: 300, damping: 25 },
  ...props
}: PopoverContentProps) {
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
      onOpenAutoFocus={onOpenAutoFocus}
      onCloseAutoFocus={onCloseAutoFocus}
      onEscapeKeyDown={onEscapeKeyDown}
      onPointerDownOutside={onPointerDownOutside}
      onInteractOutside={onInteractOutside}
      onFocusOutside={onFocusOutside}
    >
      <motion.div
        key="popover-content"
        data-slot="popover-content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={transition}
        {...props}
      />
    </Content>
  );
}

type PopoverAnchorProps = ComponentProps<typeof Anchor>;

function PopoverAnchor({ ...props }: PopoverAnchorProps) {
  return <Anchor data-slot="popover-anchor" {...props} />;
}

type PopoverArrowProps = ComponentProps<typeof Arrow>;

function PopoverArrow(props: PopoverArrowProps) {
  return <Arrow data-slot="popover-arrow" {...props} />;
}

type PopoverCloseProps = ComponentProps<typeof Close>;

function PopoverClose(props: PopoverCloseProps) {
  return <Close data-slot="popover-close" {...props} />;
}

export {
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  usePopover,
  type PopoverAnchorProps,
  type PopoverArrowProps,
  type PopoverCloseProps,
  type PopoverContentProps,
  type PopoverContextType,
  type PopoverPortalProps,
  type PopoverProps,
  type PopoverTriggerProps,
};
