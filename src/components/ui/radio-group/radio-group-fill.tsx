'use client';

import { getDirection } from '@/lib/utils/get-direction';
import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { cn, tv, type VariantProps } from 'tailwind-variants';

const radioItemVariants = tv({
  base: 'focus-visible:ring-ring/50 bg-background border-primary relative size-8 cursor-pointer border transition-colors duration-150 focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:size-10',
  variants: {
    radius: {
      full: 'rounded-full',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: { radius: 'full' },
});

const innerDotVariants = tv({
  base: 'bg-background absolute',
  variants: {
    radius: {
      full: 'rounded-full',
      lg: 'rounded-md',
    },
  },
  defaultVariants: { radius: 'full' },
});

interface RadioGroupFillProps
  extends ComponentProps<typeof Root>, VariantProps<typeof radioItemVariants> {
  options: { label?: string; value: string }[];
}

function RadioGroupFill({ options, radius = 'full', className, ...props }: RadioGroupFillProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Root className={cn('grid gap-3', className)} {...props} dir={dir}>
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2 px-2 py-1">
          <Item
            value={option.value}
            className={cn(radioItemVariants({ radius }), 'focus:outline-none')}
          >
            <Indicator asChild>
              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    innerDotVariants({ radius }),
                    'bg-primary absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 md:size-7'
                  )}
                />
              </div>
            </Indicator>
          </Item>
          {option.label && <span>{option.label}</span>}
        </div>
      ))}
    </Root>
  );
}

export { innerDotVariants, RadioGroupFill, radioItemVariants, type RadioGroupFillProps };
