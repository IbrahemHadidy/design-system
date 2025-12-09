'use client';

import {
  Corner,
  Root,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  Viewport,
} from '@radix-ui/react-scroll-area';
import { type ComponentProps, useEffect, useRef, useState } from 'react';
import { cn } from 'tailwind-variants';

interface ScrollAreaProps extends ComponentProps<typeof Root> {
  fadeDuration?: number; // fade in/out duration in ms
  visibleDuration?: number; // how long scrollbar stays visible after scroll/mousemove
  visibleOpacity?: number; // 0..1 opacity when visible
}

function ScrollArea({
  className,
  children,
  fadeDuration = 300,
  visibleDuration = 250,
  visibleOpacity = 1,
  ...props
}: ScrollAreaProps) {
  const [visible, setVisible] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!viewportRef.current || !rootRef.current) return;
    let timeout: number;

    const show = () => {
      setVisible(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => setVisible(false), visibleDuration);
    };

    const handleScroll = () => show();
    const handleMouseEnter = () => show();
    const handleMouseMove = () => show();

    const viewport = viewportRef.current;
    const root = rootRef.current;

    viewport.addEventListener('scroll', handleScroll);
    root.addEventListener('mouseenter', handleMouseEnter);
    root.addEventListener('mousemove', handleMouseMove);

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      root.removeEventListener('mouseenter', handleMouseEnter);
      root.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [visibleDuration]);

  return (
    <Root
      type="always"
      ref={rootRef}
      data-slot="scroll-area"
      className={cn('relative', className)}
      {...props}
    >
      <Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        className="size-full overflow-auto rounded-[inherit] outline-none"
      >
        {children}
      </Viewport>

      {/* Scrollbars */}
      <ScrollBar
        visible={visible}
        fadeDuration={fadeDuration}
        visibleOpacity={visibleOpacity}
        orientation="vertical"
      />
      <ScrollBar
        visible={visible}
        fadeDuration={fadeDuration}
        visibleOpacity={visibleOpacity}
        orientation="horizontal"
      />

      <Corner />
    </Root>
  );
}

interface ScrollBarProps extends ComponentProps<typeof ScrollAreaScrollbar> {
  visible?: boolean;
  fadeDuration?: number;
  visibleOpacity?: number;
}

function ScrollBar({
  className,
  orientation = 'vertical',
  visible = true,
  fadeDuration = 300,
  visibleOpacity = 1,
  ...props
}: ScrollBarProps) {
  return (
    <ScrollAreaScrollbar
      orientation={orientation}
      {...props}
      className={cn(
        'flex touch-none p-px transition-opacity select-none',
        `duration-[${fadeDuration}ms]`,
        visible ? `opacity-[${visibleOpacity}]` : 'opacity-0',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
        className
      )}
    >
      <ScrollAreaThumb className="bg-border relative flex-1 rounded-full" />
    </ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
