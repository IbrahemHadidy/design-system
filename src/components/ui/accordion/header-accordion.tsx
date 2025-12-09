'use client';

import { AccordionItem as RadixHeaderAccordionItem } from '@/components/primitives/accordion';
import type { ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { InnerAccordionItem, type IconVariants } from './accordion-shared';

type HeaderAccordionVariants = VariantProps<typeof headerVariants>;

const headerVariants = tv({
  base: 'focus-visible:ring-primary/80 flex h-16 w-full items-center justify-between rounded-4xl px-4 py-3 pe-5 text-start text-sm font-semibold focus:outline-none focus-visible:ring-2 md:h-24 md:px-5 md:pe-6 md:text-2xl',
  variants: {
    variant: {
      primary: 'bg-primary hover:bg-primary/90 border-transparent',
      'primary-gradient':
        'from-primary hover:from-primary/90 to-primary-dark hover:to-primary-dark/80 border-transparent bg-linear-to-r rtl:bg-linear-to-l',
      secondary: 'bg-secondary border-border hover:bg-secondary/80 border',
      outline: 'bg-background border-border hover:bg-accent border',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type AccordionVariants = 'primary' | 'primary-gradient' | 'secondary' | 'outline';

type HeaderAccordionItemProps = {
  value: string;
  title: string;
  children: ReactNode;
  iconVariant?: IconVariants;
  variant?: AccordionVariants;
};

function HeaderAccordionItem({
  value,
  title,
  children,
  iconVariant,
  variant = 'primary',
}: HeaderAccordionItemProps) {
  return (
    <RadixHeaderAccordionItem className="relative flex flex-col gap-1 rounded-3xl" value={value}>
      <InnerAccordionItem mode="header" title={title} iconVariant={iconVariant} variant={variant}>
        {children}
      </InnerAccordionItem>
    </RadixHeaderAccordionItem>
  );
}

export {
  HeaderAccordionItem as AccordionItem,
  headerVariants,
  InnerAccordionItem,
  type HeaderAccordionItemProps,
  type HeaderAccordionVariants,
};
