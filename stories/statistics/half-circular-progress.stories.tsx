import preview from '#storybook/preview';
import { HalfCircularProgress } from '@/components/ui/statistics/progress/half-circular';

const meta = preview.meta({
  title: 'Statistics/Progress/Half Circular',
  component: HalfCircularProgress,
  argTypes: {
    percentage: { control: { type: 'range', min: 0, max: 100 } },
    size: { control: { type: 'number', min: 50, max: 500 } },
    strokeWidth: { control: { type: 'number', min: 1, max: 50 } },
    animationDuration: { control: { type: 'number', min: 0, max: 5000 } },
    hideIndicatorCircle: { control: 'boolean' },
    title: { control: 'text' },
    percentageClass: { control: 'text' },
    contentClass: { control: 'text' },
    className: { control: 'text' },
  },
});

export const Playground = meta.story({
  args: {
    percentage: 65,
    size: 416,
    strokeWidth: 20,
    animationDuration: 1000,
    hideIndicatorCircle: false,
    title: (
      <span className="text-lg">
        Sales: <strong>$24,400</strong>
      </span>
    ),
  },
});
