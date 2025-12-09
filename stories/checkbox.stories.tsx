import preview from '#storybook/preview';
import { Checkbox, type CheckboxProps, checkboxVariants } from '@/components/ui/checkbox';
import { useState } from 'react';

const meta = preview.meta({
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: { control: 'boolean' },
    radius: { control: 'radio', options: Object.keys(checkboxVariants.variants.radius) },
  },
});

export const Playground = meta.story({
  args: {
    checked: false,
    radius: 'full',
  },
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);

    return <Checkbox {...args} checked={checked} onCheckedChange={(val) => setChecked(val)} />;
  },
});

export const Radii = meta.story({
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);

    return (
      <div className="flex flex-wrap gap-4">
        {Object.keys(checkboxVariants.variants.radius).map((radius) => (
          <Checkbox
            {...args}
            key={radius}
            checked={checked}
            onCheckedChange={(val) => setChecked(val)}
            radius={radius as CheckboxProps['radius']}
          />
        ))}
      </div>
    );
  },
});
