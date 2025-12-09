import preview from '#storybook/preview';
import { ChartArea } from '@/components/ui/charts/area';
import type { ChartConfig } from '@/components/ui/charts/chart';

const meta = preview.meta({
  title: 'Charts/Area',
  component: ChartArea,

  argTypes: {
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
      description: 'Height of the chart container (in pixels)',
    },
    containerWidth: {
      control: 'number',
      description: 'Width of the chart container (in pixels)',
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

    // ====== AREA CUSTOMIZATION ======
    areaType: {
      control: 'select',
      options: ['linear', 'monotone', 'natural', 'basis'],
      description: 'Defines the curve type for the area',
    },
    areaOpacity: { control: 'number', description: 'Opacity of the filled area' },
    areaStrokeWidth: { control: 'number', description: 'Thickness of area stroke' },
    disableGradient: { control: 'boolean', description: 'Disable gradient fill for the area' },
    areaDashed: { control: 'boolean', description: 'Toggle dashed area lines' },
    areaDashArray: {
      control: 'text',
      description: 'Dash pattern for area lines (e.g., "4 4")',
    },

    // ====== TOOLTIP ======
    showTooltip: { control: 'boolean', description: 'Toggle tooltip visibility' },

    // ====== AXIS DIRECTION ======
    reverseX: { control: 'boolean', description: 'Reverse X-axis direction' },
    reverseY: { control: 'boolean', description: 'Reverse Y-axis direction' },

    // Area margins
    areaMargin: {
      control: 'object',
      description: 'Chart margins: top, right, bottom, left',
      defaultValue: { top: 12, right: 12, bottom: 12, left: 12 },
    },

    // Legend
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

// ====== SAMPLE DATA ======
const defaultData = [
  { month: '01/2024', desktop: 150, mobile: 200, tablet: 180 },
  { month: '02/2024', desktop: 220, mobile: 180, tablet: 20 },
  { month: '03/2024', desktop: 10, mobile: 240, tablet: 170 },
  { month: '04/2024', desktop: 250, mobile: 220, tablet: 200 },
  { month: '05/2024', desktop: 100, mobile: 26, tablet: 230 },
  { month: '06/2024', desktop: 260, mobile: 10, tablet: 240 },
  { month: '07/2024', desktop: 230, mobile: 280, tablet: 20 },
  { month: '08/2024', desktop: 300, mobile: 240, tablet: 270 },
  { month: '09/2024', desktop: 270, mobile: 10, tablet: 250 },
  { month: '10/2024', desktop: 320, mobile: 280, tablet: 300 },
  { month: '11/2024', desktop: 290, mobile: 30, tablet: 310 },
  { month: '12/2024', desktop: 350, mobile: 300, tablet: 340 },
];

const defaultConfig: ChartConfig = {
  desktop: { label: 'Desktop', color: 'var(--chart-1)' },
  mobile: { label: 'Mobile', color: 'var(--chart-2)' },
  tablet: { label: 'Tablet', color: 'var(--chart-3)' },
};

export const Default = meta.story({
  render: (args) => <ChartArea {...args} />,
  args: {
    titleHeader: 'Total Visits',
    title: 4320,
    chartData: defaultData,
    chartConfig: defaultConfig,
    yKeys: undefined,
    containerHeight: 247,
    containerWidth: 1066,
    xKey: 'month',
    xAxisPosition: 'top',
    yAxisPosition: 'left',
    hideXAxis: false,
    hideYAxis: false,
    showGrid: true,
    showVerticalGrid: true,
    showHorizontalGrid: false,
    gridStroke: '#AFAFAF',
    gridStrokeWidth: 1,
    gridDashArray: '5 5',
    xTickLine: false,
    yTickLine: false,
    xAxisLine: true,
    yAxisLine: true,
    axisDashed: true,
    xTickMargin: 8,
    yTickMargin: 8,
    axisStrokeWidth: 0,
    yTickCount: 6,
    areaType: 'linear',
    areaOpacity: 0.4,
    areaStrokeWidth: 1,
    disableGradient: false,
    areaDashed: false,
    areaDashArray: '5 5',
    showTooltip: true,
    reverseX: false,
    reverseY: false,
    areaMargin: { top: 15, right: 15, bottom: 0, left: 0 },
    showLegend: true,

    xTickRenderer: ({ x, y, payload }) => {
      const [month, year] = String(payload.value).split('/');
      return (
        <text x={x} y={y - 20} textAnchor="middle">
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

export const WithoutTotal = meta.story({
  render: (args) => <ChartArea {...args} />,
  args: {
    chartData: defaultData,
    chartConfig: defaultConfig,
    yKeys: undefined,
    containerHeight: 247,
    containerWidth: 1066,
    xKey: 'month',
    xAxisPosition: 'top',
    yAxisPosition: 'left',
    hideXAxis: false,
    hideYAxis: false,
    showGrid: true,
    showVerticalGrid: true,
    showHorizontalGrid: false,
    gridStroke: '#AFAFAF',
    gridStrokeWidth: 1,
    gridDashArray: '5 5',
    xTickLine: false,
    yTickLine: false,
    xAxisLine: true,
    yAxisLine: true,
    axisDashed: true,
    xTickMargin: 8,
    yTickMargin: 8,
    axisStrokeWidth: 0,
    yTickCount: 6,
    areaType: 'linear',
    areaOpacity: 0.4,
    areaStrokeWidth: 1,
    disableGradient: false,
    areaDashed: false,
    areaDashArray: '5 5',
    showTooltip: true,
    reverseX: false,
    reverseY: false,
    areaMargin: { top: 15, right: 15, bottom: 0, left: 0 },
    showLegend: true,

    xTickRenderer: ({ x, y, payload }) => {
      const [month, year] = String(payload.value).split('/');
      return (
        <text x={x} y={y - 20} textAnchor="middle">
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
