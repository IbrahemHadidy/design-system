'use client';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/charts/chart';
import { useTranslations } from 'next-intl';
import { useId, type ReactNode } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

interface ChartAreaProps {
  titleHeader?: string;
  title?: number | string;
  chartData: Array<Record<string, unknown>>;
  chartConfig: ChartConfig;
  containerHeight?: number | `${number}%`;
  containerWidth?: number | `${number}%`;
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
  areaType?: 'linear' | 'monotone' | 'natural' | 'basis';
  areaOpacity?: number;
  areaStrokeWidth?: number;
  disableGradient?: boolean;
  areaDashed?: boolean;
  areaDashArray?: string;
  showTooltip?: boolean;
  yKeys?: string[];
  reverseX?: boolean;
  reverseY?: boolean;
  areaMargin?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  showLegend?: boolean;
  legendAlign?: 'top' | 'bottom' | 'left' | 'right';
  legendClassName?: string;
}

function ChartArea({
  titleHeader,
  title,
  chartData,
  chartConfig,
  containerHeight,
  containerWidth,
  xKey,
  xAxisPosition = 'bottom',
  yAxisPosition = 'left',
  hideXAxis = false,
  hideYAxis = false,
  showGrid = true,
  showVerticalGrid = true,
  showHorizontalGrid = true,
  gridDashed = true,
  gridStroke = '#e0e0e0',
  gridStrokeWidth = 1,
  gridDashArray = '5 5',
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
  areaType = 'natural',
  areaOpacity = 0.4,
  areaStrokeWidth = 1,
  disableGradient = false,
  areaDashed = false,
  areaDashArray = '5 5',
  showTooltip = true,
  yKeys,
  reverseX = false,
  reverseY = false,
  areaMargin = { top: 12, right: 12, bottom: 12, left: 12 },
  showLegend = false,
  legendAlign = 'bottom',
  legendClassName = '',
}: ChartAreaProps) {
  const t = useTranslations('Components.Chart');

  const seriesKeys = yKeys ?? Object.keys(chartConfig);

  // Accessibility targets
  const chartId = useId();
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;

  const baseChart = (
    <ChartContainer config={chartConfig} height={containerHeight} width={containerWidth}>
      <AreaChart accessibilityLayer data={chartData} margin={areaMargin}>
        {showGrid && (
          <CartesianGrid
            vertical={showVerticalGrid}
            horizontal={showHorizontalGrid}
            stroke={gridStroke}
            strokeWidth={gridStrokeWidth}
            strokeDasharray={gridDashed ? gridDashArray : undefined}
          />
        )}

        {!hideXAxis && (
          <XAxis
            dataKey={xKey}
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
            content={<ChartTooltipContent />}
          />
        )}

        {!disableGradient && (
          <defs>
            {seriesKeys.map((key) => (
              <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
        )}

        {seriesKeys.map((key) => (
          <Area
            key={key}
            dataKey={key}
            type={areaType}
            fill={disableGradient ? 'none' : `url(#fill${key})`}
            fillOpacity={areaOpacity}
            stroke={`var(--color-${key})`}
            strokeWidth={areaStrokeWidth}
            strokeDasharray={areaDashed ? areaDashArray : undefined}
            isAnimationActive
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
      </AreaChart>
    </ChartContainer>
  );

  const hasHeading = Boolean(titleHeader || title);

  if (hasHeading) {
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

export { ChartArea, type ChartAreaProps };
