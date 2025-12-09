import preview from '#storybook/preview';
import RadioGroup from '@/components/ui/radio-group';
import { useState } from 'react';

const meta = preview.meta({
  title: 'Components/Radio/Dot Mode',
  component: RadioGroup,
  argTypes: {
    radius: {
      control: { type: 'select' },
      options: ['full', 'lg'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    activeColor: {
      control: { type: 'select' },
      options: ['default', 'primary-light'],
    },
    inactiveColor: {
      control: { type: 'select' },
      options: ['light', 'subtle'],
    },
  },
});

export const Playground = meta.story({
  args: {
    mode: 'dot',
    radius: 'lg',
    size: 'md',
    activeColor: 'default',
    inactiveColor: 'light',
  },
  render: (args) => {
    const [value, setValue] = useState('option1');
    return <RadioGroup {...args} value={value} onValueChange={setValue} />;
  },
});
