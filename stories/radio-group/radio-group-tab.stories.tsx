import preview from '#storybook/preview';
import RadioGroup from '@/components/ui/radio-group';
import { useState } from 'react';

const options = [
  { label: 'Tab 1', value: 'tab1' },
  { label: 'Tab 2', value: 'tab2' },
  { label: 'Tab 3', value: 'tab3' },
];

const meta = preview.meta({
  title: 'Components/Radio/Tab mode',
  component: RadioGroup,
  argTypes: {
    options: {
      control: 'object',
      description:
        'List of selectable options. Each option should include a `label` for display and a `value` for the item identifier.',
    },
    value: { control: 'text' },
    onValueChange: { action: 'changed' },
    className: { control: 'text' },
  },
});

export const Playground = meta.story({
  args: { mode: 'tab', options },
  render: (args) => {
    const [value, setValue] = useState('tab1');
    return <RadioGroup {...args} value={value} onValueChange={setValue} />;
  },
});
