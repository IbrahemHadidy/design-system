import preview from '#storybook/preview';
import { SegmentedProgress } from '@/components/ui/statistics/progress/segmented';

const meta = preview.meta({
  title: 'Statistics/Progress/SegmentedProgress',
  component: SegmentedProgress,
  argTypes: {
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress percentage (0–100)',
    },
    animate: {
      control: 'boolean',
      description: 'Enable/disable motion animation',
    },
  },
  args: {
    percentage: 50,
    animate: true,
  },
});

export const Default = meta.story({
  render: (args) => (
    <div className="mx-auto mt-10 w-[300px]">
      <SegmentedProgress {...args} />
    </div>
  ),
});
