'use client';

import { getDirection } from '@/lib/utils/get-direction';
import { Item, Root } from '@radix-ui/react-radio-group';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

interface RadioGroupTabProps extends ComponentProps<typeof Root> {
  options: { label: string; value: string }[];
}

function RadioGroupTab({ options, value, onValueChange, className, ...props }: RadioGroupTabProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Root
      className={cn('bg-muted inline-flex rounded-lg p-1.5 disabled:opacity-70', className)}
      value={value}
      onValueChange={onValueChange}
      {...props}
      dir={dir}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <Item key={option.value} value={option.value} asChild>
            <button
              className={cn(
                'rounded-lg px-10 py-3 text-sm font-medium transition-colors md:py-3.5',
                'focus:ring-primary/50 focus:ring-1 focus:ring-offset-1 focus:outline-none',
                isSelected
                  ? 'text-primary bg-background shadow'
                  : 'text-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          </Item>
        );
      })}
    </Root>
  );
}

export { RadioGroupTab, type RadioGroupTabProps };
