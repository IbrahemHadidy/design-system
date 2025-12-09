'use client';

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  useAccordionItem,
} from '@/components/primitives/accordion';
import type { ReactNode } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import { cn } from 'tailwind-variants';

type AccentAccordionItemProps = {
  value: string;
  title: string;
  children: ReactNode;
};

function AccentAccordionItem({ value, title, children }: AccentAccordionItemProps) {
  return (
    <AccordionItem
      value={value}
      className="relative flex flex-col border-none bg-transparent p-6 pe-4"
    >
      <InnerAccentAccordionItem title={title}>{children}</InnerAccentAccordionItem>
    </AccordionItem>
  );
}

function InnerAccentAccordionItem({ title, children }: { title: string; children: ReactNode }) {
  const { isOpen } = useAccordionItem();

  return (
    <>
      <div
        className={cn(
          'absolute top-0 bottom-0 w-1 transition-colors duration-300',
          'start-0',
          isOpen ? 'bg-primary' : 'bg-primary/50'
        )}
      />

      <AccordionHeader>
        <AccordionTrigger className="flex h-12 w-full cursor-pointer items-center justify-between text-start text-sm font-semibold hover:underline md:text-2xl">
          {title}
          <LuChevronDown
            className={cn(
              'size-8 transition-transform duration-300',
              isOpen ? 'rotate-180' : 'rotate-0'
            )}
          />
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent keepRendered className="text-xs font-medium md:text-base">
        {children}
      </AccordionContent>
    </>
  );
}

export {
  AccentAccordionItem as AccordionItem,
  InnerAccentAccordionItem,
  type AccentAccordionItemProps,
};
