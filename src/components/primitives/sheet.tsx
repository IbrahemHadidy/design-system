'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';
import { getDirection } from '@/lib/utils/get-direction';
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
import { useLocale } from 'next-intl';
import type { ComponentProps, CSSProperties } from 'react';

type SheetContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const [SheetProvider, useSheet] = getStrictContext<SheetContextType>('SheetContext');

type SheetProps = ComponentProps<typeof Root>;

function Sheet(props: SheetProps) {
  const [isOpen, setIsOpen] = useControlledState({
    value: props.open,
    defaultValue: props.defaultOpen,
    onChange: props.onOpenChange,
  });

  return (
    <SheetProvider value={{ isOpen, setIsOpen }}>
      <Root data-slot="sheet" {...props} onOpenChange={setIsOpen} />
    </SheetProvider>
  );
}

type SheetTriggerProps = ComponentProps<typeof Trigger>;

function SheetTrigger(props: SheetTriggerProps) {
  return <Trigger data-slot="sheet-trigger" {...props} />;
}

type SheetCloseProps = ComponentProps<typeof Close>;

function SheetClose(props: SheetCloseProps) {
  return <Close data-slot="sheet-close" {...props} />;
}

type SheetPortalProps = ComponentProps<typeof Portal>;

function SheetPortal(props: SheetPortalProps) {
  const { isOpen } = useSheet();

  return (
    <AnimatePresence>
      {isOpen && <Portal forceMount data-slot="sheet-portal" {...props} />}
    </AnimatePresence>
  );
}

type SheetOverlayProps = Omit<ComponentProps<typeof Overlay>, 'asChild' | 'forceMount'> &
  HTMLMotionProps<'div'>;

function SheetOverlay({
  transition = { duration: 0.2, ease: 'easeInOut' },
  ...props
}: SheetOverlayProps) {
  return (
    <Overlay asChild forceMount>
      <motion.div
        key="sheet-overlay"
        data-slot="sheet-overlay"
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={transition}
        {...props}
      />
    </Overlay>
  );
}

type Side = 'top' | 'bottom' | 'left' | 'right';

type SheetContentProps = ComponentProps<typeof Content> &
  HTMLMotionProps<'div'> & {
    side?: Side;
  };

function SheetContent({
  side: initialSide,
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  style,
  ...props
}: SheetContentProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  let side: Side;
  if (initialSide) side = initialSide;
  else if (dir === 'ltr') side = 'right';
  else side = 'left';

  const axis = side === 'left' || side === 'right' ? 'x' : 'y';

  const offscreen: Record<Side, { x?: string; y?: string; opacity: number }> = {
    right: { x: '100%', opacity: 0 },
    left: { x: '-100%', opacity: 0 },
    top: { y: '-100%', opacity: 0 },
    bottom: { y: '100%', opacity: 0 },
  };

  const positionStyle: Record<Side, CSSProperties> = {
    right: { insetBlock: 0, right: 0 },
    left: { insetBlock: 0, left: 0 },
    top: { insetInline: 0, top: 0 },
    bottom: { insetInline: 0, bottom: 0 },
  };

  return (
    <Content asChild forceMount {...props}>
      <motion.div
        key="sheet-content"
        data-slot="sheet-content"
        data-side={side}
        initial={offscreen[side]}
        animate={{ [axis]: 0, opacity: 1 }}
        exit={offscreen[side]}
        style={{
          position: 'fixed',
          ...positionStyle[side],
          ...style,
        }}
        transition={transition}
        {...props}
        dir={dir}
      />
    </Content>
  );
}

type SheetHeaderProps = ComponentProps<'div'>;

function SheetHeader(props: SheetHeaderProps) {
  return <div data-slot="sheet-header" {...props} />;
}

type SheetFooterProps = ComponentProps<'div'>;

function SheetFooter(props: SheetFooterProps) {
  return <div data-slot="sheet-footer" {...props} />;
}

type SheetTitleProps = ComponentProps<typeof Title>;

function SheetTitle(props: SheetTitleProps) {
  return <Title data-slot="sheet-title" {...props} />;
}

type SheetDescriptionProps = ComponentProps<typeof Description>;

function SheetDescription(props: SheetDescriptionProps) {
  return <Description data-slot="sheet-description" {...props} />;
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  useSheet,
  type SheetCloseProps,
  type SheetContentProps,
  type SheetDescriptionProps,
  type SheetFooterProps,
  type SheetHeaderProps,
  type SheetOverlayProps,
  type SheetPortalProps,
  type SheetProps,
  type SheetTitleProps,
  type SheetTriggerProps,
};
