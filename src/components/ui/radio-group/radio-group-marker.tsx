'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { getDirection } from '@/lib/utils/get-direction';
import { Item, Root } from '@radix-ui/react-radio-group';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

interface RadioGroupMarkerProps extends ComponentProps<typeof Root> {
  options: { label: string; value: string }[];
}

function RadioGroupMarker({
  options,
  value,
  onValueChange,
  disabled,
  className,
  ...props
}: RadioGroupMarkerProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Root
      className={cn('flex gap-4', className)}
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      {...props}
      dir={dir}
    >
      {options.map((option) => (
        <Item key={option.value} value={option.value} className="focus:outline-none">
          <div className="flex items-center gap-2">
            <Checkbox checked={value === option.value} radius="full" />
            <span>{option.label}</span>
          </div>
        </Item>
      ))}
    </Root>
  );
}

export { RadioGroupMarker, type RadioGroupMarkerProps };
