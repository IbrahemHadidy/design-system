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
import { useId } from 'react';
import { RadialBar, RadialBarChart } from 'recharts';

interface ChartRadialProps {
  titleHeader?: string;
  title?: number | string;
  chartData: Array<Record<string, unknown>>;
  chartConfig: ChartConfig;
  nameKey: string;
  dataKey: string;
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  barSize?: number;
  rounded?: boolean;
  showLegend?: boolean;
  legendAlign?: 'top' | 'bottom' | 'left' | 'right';
  legendClassName?: string;
}

function ChartRadial({
  titleHeader,
  title,
  chartData,
  chartConfig,
  nameKey,
  dataKey,
  size = 270,
  innerRadius = 60,
  outerRadius = 135,
  barSize = 12,
  rounded = true,
  showLegend = true,
  legendAlign = 'bottom',
  legendClassName = '',
}: ChartRadialProps) {
  const t = useTranslations('Components.Chart');

  // Accessibility targets
  const chartId = useId();
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;

  const baseChart = (
    <ChartContainer config={chartConfig} className="mx-auto" style={{ width: size, height: size }}>
      <RadialBarChart
        accessibilityLayer
        dataKey={dataKey}
        data={chartData}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        barSize={barSize}
      >
        <ChartTooltip
          aria-hidden
          wrapperStyle={{ outline: 'none' }}
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey={nameKey} />}
        />
        <RadialBar dataKey={dataKey} background cornerRadius={rounded ? '50%' : 0} />
        {showLegend && (
          <ChartLegend
            align={legendAlign === 'left' ? 'left' : legendAlign === 'right' ? 'right' : undefined}
            verticalAlign={
              legendAlign === 'bottom' ? 'bottom' : legendAlign === 'top' ? 'top' : undefined
            }
            content={<ChartLegendContent nameKey={nameKey} className={legendClassName} />}
          />
        )}
      </RadialBarChart>
    </ChartContainer>
  );

  const hasHeading = Boolean(titleHeader || title);

  if (hasHeading) {
    return (
      <figure
        className="border-border box-content flex max-w-full flex-col rounded-3xl md:border md:p-6"
        style={{ width: size }}
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

export { ChartRadial, type ChartRadialProps };
