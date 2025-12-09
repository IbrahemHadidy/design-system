import preview from '#storybook/preview';
import {
  LinearProgress,
  type LinearProgressProps,
} from '@/components/ui/statistics/progress/linear';

const variants: LinearProgressProps['variant'][] = ['default', 'indicator', 'thick'];

const meta = preview.meta({
  title: 'Statistics/Progress/LinearProgress',
  component: LinearProgress,
  argTypes: {
    variant: {
      control: 'radio',
      options: variants,
    },
    percentage: { control: { type: 'range', min: 0, max: 100 } },
    rounded: { control: 'boolean' },
    hideLabel: { control: 'boolean' },
    animate: { control: 'boolean' },
    gradient: { control: 'boolean' },
  },
});

export const Playground = meta.story({
  args: {
    variant: 'default',
    percentage: 50,
    rounded: true,
    hideLabel: false,
    animate: true,
    gradient: true,
  },
  render: (args) => <LinearProgress {...args} />,
});

export const Default = meta.story({
  args: {
    variant: 'default',
    percentage: 65,
    rounded: true,
    hideLabel: false,
    animate: true,
    gradient: true,
  },
});

export const Thick = meta.story({
  args: {
    variant: 'thick',
    percentage: 45,
    rounded: true,
    hideLabel: false,
    animate: true,
    gradient: true,
  },
});
