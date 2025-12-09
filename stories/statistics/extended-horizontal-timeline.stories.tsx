import preview from '#storybook/preview';
import { ExtendedHorizontalTimeline } from '@/components/ui/statistics/timeline/extended-horizontal';

const steps = ['Start', 'Middle', 'Almost There', 'End'];

const meta = preview.meta({
  title: 'Statistics/Timeline/Extended Horizontal',
  component: ExtendedHorizontalTimeline,

  argTypes: {
    steps: {
      control: 'object',
      description: 'Array of step labels',
      defaultValue: ['Planning', 'Design', 'Development', 'Launch'],
    },
    currentStep: {
      control: 'radio',
      options: steps,
      description: 'Currently active step',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Shape of the step indicators',
    },
    currentVariant: {
      control: 'select',
      options: ['solid', 'outline', 'indicator'],
      description: 'Style variant for the active step',
    },
    completedVariant: {
      control: 'select',
      options: ['primary', 'success', 'success-light'],
      description: 'Style variant for completed steps',
    },
    useCheckForCompleted: {
      control: 'boolean',
      description: 'Show a check icon instead of a number for completed steps',
    },
    className: {
      control: 'text',
      description: 'Additional classes for the wrapper container',
    },
  },
});

export const Playground = meta.story({
  args: {
    steps,
    currentStep: 'Almost There',
    shape: 'circle',
    currentVariant: 'outline',
    completedVariant: 'primary',
    useCheckForCompleted: false,
  },
});
