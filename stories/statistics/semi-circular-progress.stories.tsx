import preview from '#storybook/preview';
import { SemiCircularProgress } from '@/components/ui/statistics/progress/semi-circular';

const meta = preview.meta({
  title: 'Statistics/Progress/SemiCircularProgress',
  component: SemiCircularProgress,
  argTypes: {
    percentage: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: { type: 'number', min: 50, max: 300 } },
    strokeWidth: { control: { type: 'number', min: 1, max: 50 } },
    gapDegree: { control: { type: 'number', min: 0, max: 360 } },
    variant: { control: 'select', options: ['default', 'background'] },
    secondaryThin: { control: 'boolean' },
    rounded: { control: 'boolean' },
    double: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    animate: { control: 'boolean' },
    className: { control: 'text' },
  },
});

export const Playground = meta.story({
  args: {
    percentage: 65,
    size: 120,
    strokeWidth: 10,
    gapDegree: 60,
    variant: 'default',
    secondaryThin: false,
    rounded: true,
    double: false,
    showLabel: true,
    animate: true,
  },
});

export const Default = meta.story({
  args: {
    percentage: 50,
    variant: 'default',
    size: 100,
    strokeWidth: 8,
  },
});

export const Background = meta.story({
  args: {
    percentage: 75,
    variant: 'background',
    size: 120,
    strokeWidth: 10,
  },
});

export const Double = meta.story({
  args: {
    percentage: 85,
    double: true,
    size: 130,
    strokeWidth: 12,
    variant: 'default',
  },
});

export const ButtStroke = meta.story({
  args: {
    percentage: 40,
    rounded: false,
    size: 100,
    strokeWidth: 10,
  },
});

export const ThinSecondary = meta.story({
  args: {
    percentage: 60,
    secondaryThin: true,
    size: 110,
    strokeWidth: 12,
    double: true,
  },
});

export const Animated = meta.story({
  args: {
    percentage: 90,
    animate: true,
    size: 120,
    strokeWidth: 10,
    double: true,
  },
});
