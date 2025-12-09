'use client';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/charts/chart';
import { RadioGroupTab } from '@/components/ui/radio-group/radio-group-tab';
import { useTranslations } from 'next-intl';
import { useId, useState, type ReactNode } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface ChartBarProps {
  titleHeader?: string;
  title?: number | string;
  chartData: Array<Record<string, unknown>>;
  chartConfig: ChartConfig;

  containerHeight?: number | `${number}%`;
  containerWidth?: number | `${number}%`;

  barSize?: number;
  barRadius?: number;
  barGap?: number;
  barCategoryGap?: number;
  showBarBackground?: boolean;

  xKey: string;
  xAxisPosition?: 'top' | 'bottom';
  yAxisPosition?: 'left' | 'right';
  hideXAxis?: boolean;
  hideYAxis?: boolean;

  showGrid?: boolean;
  showVerticalGrid?: boolean;
  showHorizontalGrid?: boolean;
  gridDashed?: boolean;
  gridStroke?: string;
  gridStrokeWidth?: number;
  gridDashArray?: string;

  xTickRenderer?: (props: {
    x: number;
    y: number;
    payload: { value: unknown };
    index: number;
  }) => ReactNode;
  yTickRenderer?: (props: {
    x: number;
    y: number;
    payload: { value: unknown };
    index: number;
  }) => ReactNode;
  xTickLine?: boolean;
  yTickLine?: boolean;
  xAxisLine?: boolean;
  yAxisLine?: boolean;
  axisDashed?: boolean;
  xTickMargin?: number;
  yTickMargin?: number;
  axisStrokeWidth?: number;
  yTickCount?: number;

  showTooltip?: boolean;
  tooltipCursor?: boolean;
  yKeys?: string[];
  reverseX?: boolean;
  reverseY?: boolean;

  chartMargin?: { top?: number; right?: number; bottom?: number; left?: number };

  variant?: 'single' | 'multiple';
  orientation?: 'vertical' | 'horizontal';
  showLegend?: boolean;
  legendAlign?: 'top' | 'bottom' | 'left' | 'right';
  legendClassName?: string;
}

function ChartBar({
  titleHeader,
  title,
  chartData,
  chartConfig,
  containerHeight,
  containerWidth,
  barSize = 40,
  barRadius = 8,
  barGap = 10,
  barCategoryGap = 10,
  showBarBackground = false,
  xKey,
  xAxisPosition = 'bottom',
  yAxisPosition = 'left',
  hideXAxis = false,
  hideYAxis = false,
  showGrid = true,
  showVerticalGrid = true,
  showHorizontalGrid = true,
  gridStroke = '#e0e0e0',
  gridStrokeWidth = 1,
  gridDashArray = '5 5',
  gridDashed = true,
  xTickRenderer,
  yTickRenderer,
  xTickLine = false,
  yTickLine = false,
  xAxisLine = true,
  yAxisLine = true,
  axisDashed = false,
  xTickMargin = 8,
  yTickMargin = 8,
  axisStrokeWidth = 1,
  yTickCount,
  showTooltip = true,
  tooltipCursor = true,
  yKeys,
  reverseX = false,
  reverseY = false,
  chartMargin = { top: 12, right: 12, bottom: 12, left: 12 },
  variant = 'multiple',
  orientation = 'horizontal',
  showLegend = false,
  legendAlign = 'bottom',
  legendClassName = '',
}: ChartBarProps) {
  const t = useTranslations('Components.Chart');

  const allKeys = yKeys ?? Object.keys(chartConfig);
  const [selectedKey, setSelectedKey] = useState<string>(allKeys[0]);
  const seriesKeys = variant === 'single' ? [selectedKey] : allKeys;

  // Accessibility targets
  const chartId = useId();
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;

  const baseChart = (
    <ChartContainer config={chartConfig} height={containerHeight} width={containerWidth}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout={orientation}
        margin={chartMargin}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
      >
        {showGrid && (
          <CartesianGrid
            vertical={showVerticalGrid}
            horizontal={showHorizontalGrid}
            stroke={gridStroke}
            strokeWidth={gridStrokeWidth}
            strokeDasharray={gridDashed ? gridDashArray : 'none'}
          />
        )}

        {!hideXAxis && (
          <XAxis
            dataKey={orientation === 'horizontal' ? xKey : undefined}
            type={orientation === 'horizontal' ? 'category' : 'number'}
            orientation={xAxisPosition}
            tick={xTickRenderer ? (props) => <>{xTickRenderer(props)}</> : undefined}
            tickLine={xTickLine}
            axisLine={
              xAxisLine
                ? {
                    stroke: '#333',
                    strokeWidth: axisStrokeWidth,
                    strokeDasharray: axisDashed ? gridDashArray : 'none',
                  }
                : false
            }
            tickMargin={xTickMargin}
            reversed={reverseX}
          />
        )}

        {!hideYAxis && (
          <YAxis
            dataKey={orientation === 'vertical' ? xKey : undefined}
            type={orientation === 'vertical' ? 'category' : 'number'}
            orientation={yAxisPosition}
            tick={yTickRenderer ? (props) => <>{yTickRenderer(props)}</> : undefined}
            tickLine={yTickLine}
            axisLine={
              yAxisLine
                ? {
                    stroke: '#333',
                    strokeWidth: axisStrokeWidth,
                    strokeDasharray: axisDashed ? gridDashArray : 'none',
                  }
                : false
            }
            tickMargin={yTickMargin}
            reversed={reverseY}
            tickCount={yTickCount}
            domain={[0, 'auto']}
          />
        )}

        {showTooltip && (
          <ChartTooltip
            aria-hidden
            wrapperStyle={{ outline: 'none' }}
            cursor={
              tooltipCursor && <rect rx={barRadius} fill="var(--secondary)" pointerEvents="none" />
            }
            content={<ChartTooltipContent />}
          />
        )}

        {seriesKeys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            barSize={barSize}
            radius={
              orientation === 'vertical'
                ? [0, barRadius, barRadius, 0]
                : [barRadius, barRadius, 0, 0]
            }
            isAnimationActive
            background={
              showBarBackground ? { fill: 'var(--secondary)', radius: barRadius } : undefined
            }
          />
        ))}

        {showLegend && (
          <ChartLegend
            align={legendAlign === 'left' ? 'left' : legendAlign === 'right' ? 'right' : undefined}
            verticalAlign={
              legendAlign === 'bottom' ? 'bottom' : legendAlign === 'top' ? 'top' : undefined
            }
            content={<ChartLegendContent className={legendClassName} />}
          />
        )}
      </BarChart>
    </ChartContainer>
  );

  if (titleHeader || title) {
    return (
      <figure
        className="border-border box-content flex max-w-full flex-col rounded-3xl md:border md:p-6"
        style={{ width: containerWidth }}
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <figcaption className="w-full space-y-1">
          {titleHeader && (
            <h2 id={titleId} className="text-muted-foreground text-sm font-medium md:text-base">
              {titleHeader}
            </h2>
          )}
          {title && <p className="text-primary text-lg font-semibold md:text-xl">{title}</p>}
        </figcaption>

        {variant === 'single' && allKeys.length > 1 && (
          <RadioGroupTab
            value={selectedKey}
            onValueChange={setSelectedKey}
            options={allKeys.map((key) => ({
              label: String(chartConfig[key].label ?? key),
              value: key,
            }))}
            className="mt-2 h-14 md:mt-0"
          />
        )}

        <p id={descId} className="sr-only">
          {t('thisChartShows', { title: titleHeader ?? title ?? t('defaultTitle') })}
        </p>

        <div className="border-border my-3 w-full border-t md:my-6" aria-hidden />

        <div className="w-full touch-pan-x overflow-x-auto">{baseChart}</div>
      </figure>
    );
  }

  return baseChart;
}

export { ChartBar, type ChartBarProps };
