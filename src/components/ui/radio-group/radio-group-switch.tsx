import { Switch } from '@/components/ui/switch';
import { getDirection } from '@/lib/utils/get-direction';
import { Item, Root } from '@radix-ui/react-radio-group';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { cn } from 'tailwind-variants';

interface RadioGroupSwitchProps extends ComponentProps<typeof Root> {
  options: { label: string; value: string }[];
}

function RadioGroupSwitch({ options, className, ...props }: RadioGroupSwitchProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  return (
    <Root className={cn('flex gap-4', className)} {...props} dir={dir}>
      {options.map((option) => (
        <Item key={option.value} value={option.value} className="focus:outline-none">
          <div className="flex items-center gap-2">
            <Switch
              checked={props.value === option.value}
              disabled={props.disabled}
              onCheckedChange={() => {
                if (props.onValueChange) props.onValueChange(option.value);
              }}
            />
            <span>{option.label}</span>
          </div>
        </Item>
      ))}
    </Root>
  );
}

export { RadioGroupSwitch, type RadioGroupSwitchProps };
