'use client';

import { AccordionItem as RadixAccordionItem } from '@/components/primitives/accordion';
import type { ReactNode } from 'react';
import { cn } from 'tailwind-variants';
import {
  accordionVariants,
  InnerAccordionItem,
  type AccordionVariants,
  type IconVariants,
} from './accordion-shared';

type DefaultAccordionItemProps = {
  value: string;
  title: string;
  children: ReactNode;
  iconVariant?: IconVariants;
  variant?: AccordionVariants['variant'];
  accentOpenClass?: string;
  accentClosedClass?: string;
};

function DefaultAccordionItem({
  value,
  title,
  children,
  iconVariant,
  variant = 'primary',
  accentOpenClass = 'bg-primary',
  accentClosedClass = 'bg-primary/50',
}: DefaultAccordionItemProps) {
  return (
    <RadixAccordionItem
      value={value}
      className={cn(accordionVariants({ variant }), 'w-full touch-auto')}
    >
      <InnerAccordionItem
        mode="default"
        title={title}
        iconVariant={iconVariant}
        variant={variant}
        accentOpenClass={accentOpenClass}
        accentClosedClass={accentClosedClass}
      >
        {children}
      </InnerAccordionItem>
    </RadixAccordionItem>
  );
}

export {
  DefaultAccordionItem as AccordionItem,
  accordionVariants,
  type AccordionVariants,
  type DefaultAccordionItemProps,
};
