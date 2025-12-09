import { Button } from '@/components/ui/buttons/button';
import { getDirection } from '@/lib/utils/get-direction';
import { Item, Root } from '@radix-ui/react-radio-group';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

interface RadioGroupButtonProps extends ComponentProps<typeof Root> {
  options: { label: string; value: string }[];
}

function RadioGroupButton({
  options,
  value,
  onValueChange,
  className,
  ...props
}: RadioGroupButtonProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Root
      className={cn('flex flex-wrap gap-3', className)}
      value={value}
      onValueChange={onValueChange}
      {...props}
      dir={dir}
    >
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <Item key={option.value} value={option.value} asChild>
            <Button
              variant={isSelected ? 'default' : 'outline'}
              radius="lg"
              className="px-7 py-4 md:px-8 md:py-4.5"
            >
              {option.label}
            </Button>
          </Item>
        );
      })}
    </Root>
  );
}

export { RadioGroupButton, type RadioGroupButtonProps };
