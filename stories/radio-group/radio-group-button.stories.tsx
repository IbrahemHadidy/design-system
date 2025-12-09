import preview from '#storybook/preview';
import RadioGroup from '@/components/ui/radio-group';
import { useState } from 'react';

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const meta = preview.meta({
  title: 'Components/Radio/Button Mode',
  component: RadioGroup,
  argTypes: {
    options: {
      control: 'object',
      description:
        'List of selectable options. Each option should include a `label` for display and a `value` for the item identifier.',
    },
    value: { control: 'text' },
    onValueChange: { action: 'changed' },
  },
});

export const Playground = meta.story({
  args: { mode: 'button', options },
  render: (args) => {
    const [value, setValue] = useState('option1');
    return <RadioGroup {...args} value={value} onValueChange={setValue} />;
  },
});
