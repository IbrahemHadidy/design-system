import preview from '#storybook/preview';
import {
  type CompletedVariant,
  type CurrentVariant,
  HorizontalTimeline,
  type Shape,
} from '@/components/ui/statistics/timeline/horizontal';

const sampleSteps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

const shapeVariants: Shape[] = ['circle', 'square'];
const currentVariants: CurrentVariant[] = ['solid', 'outline', 'indicator'];
const completedVariant: CompletedVariant[] = ['primary', 'success', 'success-light'];

const meta = preview.meta({
  title: 'Statistics/Timeline/Horizontal',
  component: HorizontalTimeline,
  argTypes: {
    steps: { control: 'object', description: 'Array of timeline step labels' },
    currentStep: {
      control: 'radio',
      options: sampleSteps,
    },
    shape: { control: 'select', options: shapeVariants },
    currentVariant: { control: 'select', options: currentVariants },
    completedVariant: {
      control: 'select',
      options: completedVariant,
    },
    useCheckForCompleted: { control: 'boolean' },
    animate: { control: 'boolean' },
    className: { control: 'text' },
  },
});

export const Playground = meta.story({
  args: {
    steps: sampleSteps,
    currentStep: sampleSteps[2],
    shape: 'circle',
    currentVariant: 'outline',
    completedVariant: 'success',
    useCheckForCompleted: true,
    animate: true,
  },
});
