'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import { AutoHeight, type AutoHeightProps } from '@/components/primitives/effects/auto-height';
import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from '@/components/primitives/effects/highlight';
import { useControlledState } from '@/hooks/use-controlled-state';
import { getDirection } from '@/lib/utils/get-direction';
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';
import { useLocale } from 'next-intl';
import type { ComponentProps, ReactNode } from 'react';

type TabsContextType = {
  value: string | undefined;
  setValue: TabsProps['onValueChange'];
};

const [TabsProvider, useTabs] = getStrictContext<TabsContextType>('TabsContext');

type TabsProps = ComponentProps<typeof Root>;

function Tabs(props: TabsProps) {
  const [value, setValue] = useControlledState({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
  });

  return (
    <TabsProvider value={{ value, setValue }}>
      <Root data-slot="tabs" {...props} onValueChange={setValue} />
    </TabsProvider>
  );
}

type TabsHighlightProps = Omit<HighlightProps, 'controlledItems' | 'value'>;

function TabsHighlight({
  transition = { type: 'spring', stiffness: 200, damping: 25 },
  ...props
}: TabsHighlightProps) {
  const { value } = useTabs();
  const reduceMotion = useReducedMotion();

  return (
    <Highlight
      data-slot="tabs-highlight"
      controlledItems
      value={value}
      transition={reduceMotion ? undefined : transition}
      click={false}
      {...props}
    />
  );
}

type TabsListProps = ComponentProps<typeof List>;

function TabsList(props: TabsListProps) {
  return <List data-slot="tabs-list" {...props} />;
}

type TabsHighlightItemProps = HighlightItemProps & {
  value: string;
};

function TabsHighlightItem(props: TabsHighlightItemProps) {
  return <HighlightItem data-slot="tabs-highlight-item" {...props} />;
}

type TabsTriggerProps = ComponentProps<typeof Trigger>;

function TabsTrigger(props: TabsTriggerProps) {
  return <Trigger data-slot="tabs-trigger" {...props} />;
}

type TabsContentProps = ComponentProps<typeof Content> & HTMLMotionProps<'div'>;

function TabsContent({
  value,
  forceMount,
  transition = { duration: 0.5, ease: 'easeInOut' },
  ...props
}: TabsContentProps) {
  const locale = useLocale();
  const dir = getDirection(locale);
  const reduceMotion = useReducedMotion();

  const animationProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, filter: 'blur(4px)' },
        animate: { opacity: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, filter: 'blur(4px)' },
        transition,
      };

  return (
    <AnimatePresence mode="wait">
      <Content asChild forceMount={forceMount} value={value}>
        <motion.div
          data-slot="tabs-content"
          layout={!reduceMotion}
          layoutDependency={value}
          dir={dir}
          {...animationProps}
          {...props}
        />
      </Content>
    </AnimatePresence>
  );
}

type TabsContentsAutoProps = AutoHeightProps & {
  mode?: 'auto-height';
  children: ReactNode;
  transition?: Transition;
};

type TabsContentsLayoutProps = Omit<HTMLMotionProps<'div'>, 'transition'> & {
  mode: 'layout';
  children: ReactNode;
  transition?: Transition;
};

type TabsContentsProps = TabsContentsAutoProps | TabsContentsLayoutProps;

const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 30,
};

function isAutoMode(props: TabsContentsProps): props is TabsContentsAutoProps {
  return !('mode' in props) || props.mode === 'auto-height';
}

function TabsContents(props: TabsContentsProps) {
  const { value } = useTabs();
  const reduceMotion = useReducedMotion();

  if (!reduceMotion && isAutoMode(props)) {
    const { transition = defaultTransition, ...autoProps } = props;

    return (
      <AutoHeight data-slot="tabs-contents" deps={[value]} transition={transition} {...autoProps} />
    );
  }

  const { transition = defaultTransition, style, ...layoutProps } = props;

  return (
    <motion.div
      data-slot="tabs-contents"
      layout={!reduceMotion ? 'size' : false}
      layoutDependency={value}
      style={{ overflow: 'hidden', ...style }}
      transition={reduceMotion ? undefined : { layout: transition }}
      {...layoutProps}
    />
  );
}

export {
  Tabs,
  TabsContent,
  TabsContents,
  TabsHighlight,
  TabsHighlightItem,
  TabsList,
  TabsTrigger,
  type TabsContentProps,
  type TabsContentsProps,
  type TabsHighlightItemProps,
  type TabsHighlightProps,
  type TabsListProps,
  type TabsProps,
  type TabsTriggerProps,
};
