import preview from '#storybook/preview';
import { CircularStepProgressTimeline } from '@/components/ui/statistics/timeline/circular-progress';

const sampleSteps = ['Planning', 'Design', 'Development', 'Testing', 'Launch'];

const meta = preview.meta({
  title: 'Statistics/Timeline/CircularStepProgressTimeline',
  component: CircularStepProgressTimeline,
  argTypes: {
    currentStep: {
      control: 'radio',
      options: sampleSteps,
      description: 'Select the currently active step',
    },
    size: {
      control: { type: 'number', min: 20, max: 200, step: 1 },
      description: 'Diameter of the circular progress component',
    },
    labelClass: { control: 'text' },
  },
  decorators: [
    (Story) => {
      return (
        <div className="flex size-[400px] items-start justify-start">
          <Story />
        </div>
      );
    },
  ],
});

export const Playground = meta.story({
  args: {
    steps: sampleSteps,
    currentStep: 'Development',
    size: 50,
  },
});
