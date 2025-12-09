import preview from '#storybook/preview';
import { SegmentedTimeline } from '@/components/ui/statistics/timeline/segmented';
import { useState } from 'react';

const steps = ['Start', 'Step 1', 'Step 2', 'Step 3', 'Finish'];

const meta = preview.meta({
  title: 'Statistics/Timeline/SegmentedTimeline',
  component: SegmentedTimeline,
  argTypes: {
    steps: { control: 'object' },
    currentStep: { control: 'radio', options: steps },
    currentWide: { control: 'boolean' },
    showCompleteColor: { control: 'boolean' },
    showDots: { control: 'boolean' },
    className: { control: 'text' },
  },
});

export const Playground = meta.story({
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(args.currentStep || args.steps[0]);

    return (
      <div className="flex flex-col gap-4">
        <SegmentedTimeline {...args} currentStep={currentStep} />
        <div className="flex flex-wrap gap-2">
          {args.steps.map((step: string) => (
            <button
              key={step}
              className={`rounded px-3 py-1 ${
                currentStep === step ? 'bg-primary text-white' : 'bg-muted text-foreground'
              }`}
              onClick={() => setCurrentStep(step)}
            >
              {step}
            </button>
          ))}
        </div>
      </div>
    );
  },
  args: {
    steps,
    currentStep: 'Step 1',
    currentWide: false,
    showCompleteColor: false,
    showDots: true,
  },
});

export const Default = meta.story({
  args: {
    steps,
    currentStep: 'Step 2',
    currentWide: false,
    showCompleteColor: false,
    showDots: true,
  },
});

export const WideActiveStep = meta.story({
  args: {
    steps,
    currentStep: 'Step 2',
    currentWide: true,
    showCompleteColor: false,
    showDots: true,
  },
});

export const SuccessColor = meta.story({
  args: {
    steps,
    currentStep: 'Step 3',
    currentWide: false,
    showCompleteColor: true,
    showDots: true,
  },
});

export const WithoutDots = meta.story({
  args: {
    steps,
    currentStep: 'Step 2',
    currentWide: false,
    showCompleteColor: false,
    showDots: false,
  },
});
