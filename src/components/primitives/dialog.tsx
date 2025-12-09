'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';
import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import type { ComponentProps } from 'react';

type DialogContextType = {
  isOpen: boolean;
  setIsOpen: DialogProps['onOpenChange'];
};

const [DialogProvider, useDialog] = getStrictContext<DialogContextType>('DialogContext');

type DialogProps = ComponentProps<typeof Root>;

function Dialog(props: DialogProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props?.open,
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
  });

  return (
    <DialogProvider value={{ isOpen, setIsOpen }}>
      <Root data-slot="dialog" {...props} onOpenChange={setIsOpen} />
    </DialogProvider>
  );
}

type DialogTriggerProps = ComponentProps<typeof Trigger>;

function DialogTrigger(props: DialogTriggerProps) {
  return <Trigger data-slot="dialog-trigger" {...props} />;
}

type DialogPortalProps = Omit<ComponentProps<typeof Portal>, 'forceMount'>;

function DialogPortal(props: DialogPortalProps) {
  const { isOpen } = useDialog();

  return (
    <AnimatePresence>
      {isOpen && <Portal data-slot="dialog-portal" forceMount {...props} />}
    </AnimatePresence>
  );
}

type DialogOverlayProps = Omit<ComponentProps<typeof Overlay>, 'forceMount' | 'asChild'> &
  HTMLMotionProps<'div'>;

function DialogOverlay({
  transition = { duration: 0.2, ease: 'easeInOut' },
  ...props
}: DialogOverlayProps) {
  return (
    <Overlay data-slot="dialog-overlay" asChild forceMount>
      <motion.div
        key="dialog-overlay"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={transition}
        {...props}
      />
    </Overlay>
  );
}

type DialogFlipDirection = 'top' | 'bottom' | 'left' | 'right';

type DialogContentProps = Omit<ComponentProps<typeof Content>, 'forceMount' | 'asChild'> &
  HTMLMotionProps<'div'> & {
    from?: DialogFlipDirection;
  };

function DialogContent({
  from = 'top',
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
  transition = { type: 'spring', stiffness: 150, damping: 25 },
  ...props
}: DialogContentProps) {
  const initialRotation = from === 'bottom' || from === 'left' ? '20deg' : '-20deg';
  const isVertical = from === 'top' || from === 'bottom';
  const rotateAxis = isVertical ? 'rotateX' : 'rotateY';

  return (
    <Content
      asChild
      forceMount
      onOpenAutoFocus={onOpenAutoFocus}
      onCloseAutoFocus={onCloseAutoFocus}
      onEscapeKeyDown={onEscapeKeyDown}
      onPointerDownOutside={onPointerDownOutside}
      onInteractOutside={onInteractOutside}
    >
      <motion.div
        key="dialog-content"
        data-slot="dialog-content"
        initial={{
          opacity: 0,
          filter: 'blur(4px)',
          transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        }}
        animate={{
          opacity: 1,
          filter: 'blur(0px)',
          transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
        }}
        exit={{
          opacity: 0,
          filter: 'blur(4px)',
          transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
        }}
        transition={transition}
        {...props}
      />
    </Content>
  );
}

type DialogCloseProps = ComponentProps<typeof Close>;

function DialogClose(props: DialogCloseProps) {
  return <Close data-slot="dialog-close" {...props} />;
}

type DialogHeaderProps = ComponentProps<'div'>;

function DialogHeader(props: DialogHeaderProps) {
  return <div data-slot="dialog-header" {...props} />;
}

type DialogFooterProps = ComponentProps<'div'>;

function DialogFooter(props: DialogFooterProps) {
  return <div data-slot="dialog-footer" {...props} />;
}

type DialogTitleProps = ComponentProps<typeof Title>;

function DialogTitle(props: DialogTitleProps) {
  return <Title data-slot="dialog-title" {...props} />;
}

type DialogDescriptionProps = ComponentProps<typeof Description>;

function DialogDescription(props: DialogDescriptionProps) {
  return <Description data-slot="dialog-description" {...props} />;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  useDialog,
  type DialogCloseProps,
  type DialogContentProps,
  type DialogContextType,
  type DialogDescriptionProps,
  type DialogFlipDirection,
  type DialogFooterProps,
  type DialogHeaderProps,
  type DialogOverlayProps,
  type DialogPortalProps,
  type DialogProps,
  type DialogTitleProps,
  type DialogTriggerProps,
};
