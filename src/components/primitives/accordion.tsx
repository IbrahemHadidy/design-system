'use client';

import { getStrictContext } from '@/components/contexts/get-strict-context';
import { useControlledState } from '@/hooks/use-controlled-state';
import { getDirection } from '@/lib/utils/get-direction';
import { Content, Header, Item, Root, Trigger } from '@radix-ui/react-accordion';
import { AnimatePresence, motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { useLocale } from 'next-intl';
import { useLayoutEffect, useState, type ComponentProps } from 'react';

type AccordionContextType = {
  value: string | string[] | undefined;
  setValue: (value: string | string[] | undefined) => void;
};

type AccordionItemContextType = {
  value: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const [AccordionProvider, useAccordion] =
  getStrictContext<AccordionContextType>('AccordionContext');

const [AccordionItemProvider, useAccordionItem] =
  getStrictContext<AccordionItemContextType>('AccordionItemContext');

type AccordionProps = ComponentProps<typeof Root>;

function Accordion(props: AccordionProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  const [value, setValue] = useControlledState<string | string[] | undefined>({
    value: props?.value,
    defaultValue: props?.defaultValue,
    onChange: props?.onValueChange as (value: string | string[] | undefined) => void,
  });

  return (
    <AccordionProvider value={{ value, setValue }}>
      <Root data-slot="accordion" {...props} dir={dir} onValueChange={setValue} />
    </AccordionProvider>
  );
}

type AccordionItemProps = ComponentProps<typeof Item>;

function AccordionItem(props: AccordionItemProps) {
  const { value } = useAccordion();
  const [isOpen, setIsOpen] = useState(value?.includes(props?.value) ?? false);

  useLayoutEffect(() => {
    requestAnimationFrame(() => setIsOpen(value?.includes(props?.value) ?? false));
  }, [value, props?.value]);

  return (
    <AccordionItemProvider value={{ isOpen, setIsOpen, value: props.value }}>
      <Item data-slot="accordion-item" {...props} />
    </AccordionItemProvider>
  );
}

type AccordionHeaderProps = ComponentProps<typeof Header>;

function AccordionHeader(props: AccordionHeaderProps) {
  return <Header data-slot="accordion-header" {...props} />;
}

type AccordionTriggerProps = ComponentProps<typeof Trigger>;

function AccordionTrigger(props: AccordionTriggerProps) {
  return <Trigger data-slot="accordion-trigger" {...props} />;
}

type AccordionContentProps = Omit<ComponentProps<typeof Content>, 'asChild' | 'forceMount'> &
  HTMLMotionProps<'div'> & {
    keepRendered?: boolean;
  };

function AccordionContent({
  keepRendered = false,
  transition = { type: 'spring', stiffness: 150, damping: 22 },
  ...props
}: AccordionContentProps) {
  const { isOpen } = useAccordionItem();
  const reduceMotion = useReducedMotion();

  const instant = { duration: 0 };

  return (
    <AnimatePresence initial={false}>
      {keepRendered ? (
        <Content asChild forceMount>
          <motion.div
            key="accordion-content"
            data-slot="accordion-content"
            initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
            animate={
              isOpen
                ? { height: 'auto', opacity: 1, '--mask-stop': '100%' }
                : { height: 0, opacity: 0, '--mask-stop': '0%' }
            }
            transition={reduceMotion ? instant : transition}
            style={{
              maskImage: 'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
              WebkitMaskImage:
                'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
              overflow: 'hidden',
            }}
            {...props}
          />
        </Content>
      ) : (
        isOpen && (
          <Content asChild forceMount>
            <motion.div
              key="accordion-content"
              data-slot="accordion-content"
              initial={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
              animate={{ height: 'auto', opacity: 1, '--mask-stop': '100%' }}
              exit={{ height: 0, opacity: 0, '--mask-stop': '0%' }}
              transition={reduceMotion ? instant : transition}
              style={{
                maskImage: 'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                WebkitMaskImage:
                  'linear-gradient(black var(--mask-stop), transparent var(--mask-stop))',
                overflow: 'hidden',
              }}
              {...props}
            />
          </Content>
        )
      )}
    </AnimatePresence>
  );
}

export {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  useAccordion,
  useAccordionItem,
  type AccordionContentProps,
  type AccordionContextType,
  type AccordionHeaderProps,
  type AccordionItemContextType,
  type AccordionItemProps,
  type AccordionProps,
  type AccordionTriggerProps,
};
