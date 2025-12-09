import preview from '#storybook/preview';
import { VerticalTimeline } from '@/components/ui/statistics/timeline/vertical';

const sampleSteps = ['Planning', 'Design', 'Development', 'Testing', 'Launch'];

const meta = preview.meta({
  title: 'Statistics/Timeline/VerticalTimeline',
  component: VerticalTimeline,
  argTypes: {
    shape: { control: 'select', options: ['circle', 'suqare'] },
    currentVariant: {
      control: 'select',
      options: ['solid', 'outline', 'indicator'],
      description: 'Visual style of the current step circle.',
    },
    completedVariant: {
      control: 'select',
      options: ['primary', 'success', 'success-light'],
      description: 'Color style for completed steps.',
    },
    useCheckForCompleted: {
      control: 'boolean',
      description: 'Whether to use a checkmark instead of a number for completed steps.',
    },
    animate: {
      control: 'boolean',
      description: 'Enable or disable motion animations.',
    },
    currentStep: {
      control: 'radio',
      options: sampleSteps,
      description: 'The currently active step label.',
    },
    className: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
});

export const Playground = meta.story({
  args: {
    steps: sampleSteps,
    currentStep: 'Launch',
    shape: 'circle',
    currentVariant: 'solid',
    completedVariant: 'primary',
    useCheckForCompleted: true,
    animate: true,
    className: 'h-150',
  },
});
