import preview from '#storybook/preview';
import { ChartRadial } from '@/components/ui/charts/radial';

const defaultData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--chart-3)' },
];

const defaultConfig = {
  chrome: { label: 'Chrome', color: 'var(--chart-1)' },
  safari: { label: 'Safari', color: 'var(--chart-2)' },
  firefox: { label: 'Firefox', color: 'var(--chart-3)' },
};

const meta = preview.meta({
  title: 'Charts/Radial',
  component: ChartRadial,

  argTypes: {
    titleHeader: {
      control: 'text',
      description: 'Header text displayed above the main title',
    },
    title: { control: 'text', description: 'Main title displayed prominently in the component' },
    chartData: {
      description: 'Array of data objects for each slice/bar of the chart',
    },
    chartConfig: {
      description: 'Configuration object mapping keys to label and color',
    },
    nameKey: {
      control: 'text',
      description: 'The key in chartData that represents the category name',
    },
    dataKey: { control: 'text', description: 'Key to use for values in the chart series' },
    size: {
      control: 'number',
      description: 'The width and height of the chart container (square)',
    },
    innerRadius: {
      control: 'number',
      description: 'Inner radius of the radial chart (for donut effect)',
    },
    outerRadius: {
      control: 'number',
      description: 'Outer radius of the radial chart',
    },
    barSize: {
      control: 'number',
      description: 'Thickness of each radial bar',
    },
    rounded: {
      control: 'boolean',
      description: 'Whether the bars have rounded ends',
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
    size: 270,
    innerRadius: 60,
    outerRadius: 110,
    barSize: 10,
    rounded: true,
    nameKey: 'browser',
    dataKey: 'visitors',
    showLegend: true,
  },
});
