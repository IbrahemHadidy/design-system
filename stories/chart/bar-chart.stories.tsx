import preview from '#storybook/preview';
import { ChartBar } from '@/components/ui/charts/bar';
import type { ChartConfig } from '@/components/ui/charts/chart';

const meta = preview.meta({
  title: 'Charts/Bar',
  component: ChartBar,

  argTypes: {
    variant: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Display either a single selectable series or multiple series at once',
      defaultValue: 'multiple',
    },

    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Set bar orientation direction',
      defaultValue: 'horizontal',
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

    // ====== DATA ======
    titleHeader: {
      control: 'text',
      description: 'Header text displayed above the main title',
    },
    title: { control: 'text', description: 'Main title displayed prominently in the component' },

    chartData: { control: 'object', description: 'Array of data points for the chart' },
    chartConfig: { control: 'object', description: 'Configuration for each series (label, color)' },
    yKeys: { control: 'object', description: 'Specify which Y keys to include in the chart' },

    // ====== CONTAINER ======
    containerHeight: {
      control: 'number',
      description: 'Height of the chart container (px)',
    },
    containerWidth: {
      control: 'number',
      description: 'Width of the chart container (px)',
    },

    // ====== BAR CUSTOMIZATION ======
    barSize: { control: 'number', description: 'Width of each bar' },
    barRadius: {
      control: 'number',
      description: 'Border radius of each bar',
      defaultValue: 8,
    },
    barGap: {
      control: 'number',
      description: 'Gap between bars within the same category',
      defaultValue: 10,
    },
    barCategoryGap: {
      control: 'number',
      description: 'Gap between groups/categories of bars along the X-axis',
      defaultValue: 10,
    },
    showBarBackground: {
      control: 'boolean',
      description: 'Whether to show a background bar behind each data bar',
    },

    // ====== AXES ======
    xKey: { control: 'text', description: 'Data key for the X-axis' },
    xAxisPosition: {
      control: 'select',
      options: ['top', 'bottom'],
      description: 'Position of the X-axis',
    },
    yAxisPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the Y-axis',
    },
    hideXAxis: { control: 'boolean', description: 'Hide the X-axis completely' },
    hideYAxis: { control: 'boolean', description: 'Hide the Y-axis completely' },

    // ====== GRID ======
    showGrid: { control: 'boolean', description: 'Show both horizontal and vertical grid lines' },
    showVerticalGrid: { control: 'boolean', description: 'Show vertical grid lines' },
    showHorizontalGrid: { control: 'boolean', description: 'Show horizontal grid lines' },
    gridDashed: { control: 'boolean', description: 'Toggle dashed style for grid lines' },
    gridStroke: { control: 'color', description: 'Color of grid lines' },
    gridStrokeWidth: { control: 'number', description: 'Width of grid lines' },
    gridDashArray: { control: 'text', description: 'Dash pattern for grid lines (e.g., "5 5")' },

    // ====== AXIS CUSTOMIZATION ======
    xTickRenderer: { control: false },
    yTickRenderer: { control: false },
    xTickLine: { control: 'boolean', description: 'Show tick line on X-axis' },
    yTickLine: { control: 'boolean', description: 'Show tick line on Y-axis' },
    xAxisLine: { control: 'boolean', description: 'Show axis line for X-axis' },
    yAxisLine: { control: 'boolean', description: 'Show axis line for Y-axis' },
    axisDashed: { control: 'boolean', description: 'Make axis lines dashed' },
    xTickMargin: { control: 'number', description: 'Margin between X tick and axis' },
    yTickMargin: { control: 'number', description: 'Margin between Y tick and axis' },
    axisStrokeWidth: { control: 'number', description: 'Thickness of X/Y axis lines' },
    yTickCount: { control: 'number', description: 'Number of Y-axis ticks' },

    // ====== TOOLTIP ======
    showTooltip: { control: 'boolean', description: 'Toggle tooltip visibility' },
    tooltipCursor: { control: 'boolean', description: 'Show cursor line on tooltip hover' },

    // ====== AXIS DIRECTION ======
    reverseX: { control: 'boolean', description: 'Reverse X-axis direction' },
    reverseY: { control: 'boolean', description: 'Reverse Y-axis direction' },

    // Chart margins
    chartMargin: {
      control: 'object',
      description: 'Chart margins: top, right, bottom, left',
      defaultValue: { top: 12, right: 12, bottom: 12, left: 12 },
    },
  },
});

// ====== SAMPLE DATA ======
const defaultData = [
  { month: '01/2024', desktop: 150, mobile: 200 },
  { month: '02/2024', desktop: 220, mobile: 180 },
  { month: '03/2024', desktop: 10, mobile: 240 },
  { month: '04/2024', desktop: 250, mobile: 220 },
  { month: '05/2024', desktop: 100, mobile: 26 },
  { month: '06/2024', desktop: 260, mobile: 10 },
  { month: '07/2024', desktop: 230, mobile: 280 },
  { month: '08/2024', desktop: 300, mobile: 240 },
  { month: '09/2024', desktop: 270, mobile: 10 },
];

const defaultConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
};

// ====== STORIES ======
export const Horizontal = meta.story({
  render: (args) => <ChartBar {...args} />,
  name: 'Horizontal Bars',
  args: {
    variant: 'multiple',
    orientation: 'horizontal',
    titleHeader: 'Total Visits',
    title: 4320,
    chartData: defaultData,
    chartConfig: defaultConfig,
    yKeys: undefined,
    containerHeight: 247,
    containerWidth: 1066,
    barSize: 25,
    barRadius: 8,
    barGap: 10,
    barCategoryGap: 60,
    showBarBackground: false,
    xKey: 'month',
    xAxisPosition: 'bottom',
    yAxisPosition: 'left',
    axisDashed: false,
    showGrid: true,
    showHorizontalGrid: true,
    showVerticalGrid: false,
    gridDashed: true,
    gridStroke: '#AFAFAF',
    gridDashArray: '5 5',
    showLegend: true,

    xTickRenderer: ({ x, y, payload }) => {
      const [month, year] = String(payload.value).split('/');
      return (
        <text x={x} y={y + 15} textAnchor="middle">
          <tspan x={x} dy="0" fill="var(--accent-foreground)" fontWeight="bold">
            {month}
          </tspan>
          <tspan x={x} dy="1.2em" fill="var(--muted-foreground)" fontSize="0.75em">
            {year}
          </tspan>
        </text>
      );
    },
    yTickRenderer: ({ x, y, payload }) => {
      const value = payload.value as number | string;
      return (
        <text x={x - 15} y={y} fill="var(--accent-foreground)" textAnchor="end">
          {value}
        </text>
      );
    },
  },
});

export const Vertical = meta.story({
  render: (args) => <ChartBar {...args} />,
  name: 'Vertical Bars',
  args: {
    variant: 'multiple',
    orientation: 'vertical',
    titleHeader: 'Total Visits',
    title: 4320,
    chartData: defaultData,
    chartConfig: defaultConfig,
    yKeys: undefined,
    containerHeight: 480,
    containerWidth: 710,
    barSize: 16,
    barRadius: 8,
    barGap: 4,
    barCategoryGap: 22,
    showBarBackground: false,
    xKey: 'desktop',
    xAxisPosition: 'bottom',
    yAxisPosition: 'left',
    axisDashed: false,
    showGrid: true,
    showHorizontalGrid: false,
    showVerticalGrid: true,
    gridDashed: true,
    gridStroke: '#AFAFAF',
    gridDashArray: '5 5',
    showLegend: true,
  },
});
