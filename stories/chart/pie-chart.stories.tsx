import preview from '#storybook/preview';
import { ChartPie } from '@/components/ui/charts/pie';

const defaultData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--chart-3)' },
  { browser: 'edge', visitors: 173, fill: 'var(--chart-4)' },
];

const defaultConfig = {
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
  edge: { label: 'Edge', color: 'var(--chart-4)' },
};

const meta = preview.meta({
  title: 'Charts/Pie',
  component: ChartPie,

  argTypes: {
    titleHeader: {
      control: 'text',
      description: 'Header text displayed above the main title',
    },
    title: { control: 'text', description: 'Main title displayed prominently in the component' },
    chartData: { control: 'object', description: 'Data array for pie slices' },
    chartConfig: { control: 'object', description: 'Config for colors and labels' },
    nameKey: { control: 'text', description: 'Key to use for name in tooltip/legend' },
    dataKey: { control: 'text', description: 'Key to use for values in the chart series' },
    size: { control: 'number', description: 'Chart width/height' },
    innerRadius: { control: 'number', description: 'Inner radius for donut' },
    outerRadius: { control: 'number', description: 'Outer radius for donut' },
    rounded: {
      control: 'boolean',
      description: 'Whether slices have rounded edges',
      defaultValue: true,
    },
    showLegend: {
      control: 'boolean',
      description: 'Whether to show the chart legend',
    },
    legendAlign: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Alignment of the chart legend',
    },
    legendClassName: {
      control: 'text',
      description: 'Custom className to style the legend',
    },
  },
});

export const Default = meta.story({
  args: {
    titleHeader: 'Total Visits',
    title: 4320,
    chartData: defaultData,
    chartConfig: defaultConfig,
    nameKey: 'browser',
    dataKey: 'visitors',
    size: 256,
    innerRadius: 60,
    outerRadius: 98,
    rounded: true,
    showLegend: true,
  },
});
