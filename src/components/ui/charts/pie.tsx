'use client';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/charts/chart';
import { LocalizedNumber } from '@/components/wrappers/localized-number';
import { useTranslations } from 'next-intl';
import { useId } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

interface ChartPieProps {
  chartData: Record<string, unknown>[];
  chartConfig: ChartConfig;
  nameKey: string;
  dataKey: string;
  size?: number;
  innerRadius?: number;
  outerRadius?: number;
  rounded?: boolean;
  showLegend?: boolean;
  legendAlign?: 'top' | 'bottom' | 'left' | 'right';
  legendClassName?: string;
  titleHeader?: string;
  title?: string | number;
}

function ChartPie({
  chartData,
  chartConfig,
  nameKey,
  dataKey,
  size = 256,
  innerRadius = 80,
  outerRadius = 128,
  rounded = true,
  showLegend = false,
  legendAlign = 'bottom',
  legendClassName = '',
  titleHeader,
  title,
}: ChartPieProps) {
  const t = useTranslations('Components.Chart');

  const total = chartData.reduce((acc, d) => acc + ((d.visitors as number) || 0), 0);

  // Accessibility targets
  const chartId = useId();
  const titleId = `${chartId}-title`;
  const descId = `${chartId}-desc`;

  const baseChart = (
    <ChartContainer config={chartConfig} className="mx-auto" style={{ width: size, height: size }}>
      <PieChart accessibilityLayer width={size} height={size}>
        <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} />} />
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          cornerRadius={rounded ? 10 : 0}
          paddingAngle={1}
          labelLine={false}
          label={({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
            const radius = innerRadius + (outerRadius - innerRadius) / 2;
            const RADIAN = Math.PI / 180;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const percent = Math.round((value / total) * 100);

            return (
              <text
                x={x}
                y={y}
                fill="var(--primary-foreground)"
                fontSize={18}
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                <LocalizedNumber value={percent} percentageSign />
              </text>
            );
          }}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartConfig[entry[nameKey] as string]?.color}
              className="pointer-events-none"
            />
          ))}
        </Pie>

        {showLegend && (
          <ChartLegend
            align={legendAlign === 'left' ? 'left' : legendAlign === 'right' ? 'right' : undefined}
            verticalAlign={
              legendAlign === 'bottom' ? 'bottom' : legendAlign === 'top' ? 'top' : undefined
            }
            content={<ChartLegendContent className={legendClassName} />}
          />
        )}
      </PieChart>
    </ChartContainer>
  );

  if (titleHeader || title) {
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

export { ChartPie, type ChartPieProps };
