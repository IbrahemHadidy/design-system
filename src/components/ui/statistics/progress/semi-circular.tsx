import { useId } from 'react';
import { cn } from 'tailwind-variants';

type StrokeLinecapVariant = 'round' | 'butt';

interface SemiCircularProgressProps {
  variant?: 'default' | 'background';
  size?: number;
  strokeWidth?: number;
  percentage: number;
  gapDegree?: number;
  secondaryThin?: boolean;
  rounded?: boolean;
  double?: boolean;
  className?: string;
  showLabel?: boolean;
  animate?: boolean;
}

function SemiCircularProgress({
  variant = 'default',
  size,
  strokeWidth = 10,
  percentage,
  gapDegree = 60,
  secondaryThin = false,
  rounded = true,
  double = false,
  className = '',
  showLabel = true,
  animate = true,
}: SemiCircularProgressProps) {
  const pct = Math.max(0, Math.min(100, percentage));

  // responsive default sizes
  const finalSize = size ?? (double ? 122 : 90);

  const radius = (finalSize - strokeWidth) / 2;
  const innerRadius = double ? radius - strokeWidth * 1.3 : radius;
  const circumference = 2 * Math.PI * radius;
  const innerCircumference = 2 * Math.PI * innerRadius;

  const gapLength = (gapDegree / 360) * circumference;
  const arcLength = circumference - gapLength;
  const innerGapLength = (gapDegree / 360) * innerCircumference;
  const innerArcLength = innerCircumference - innerGapLength;

  const scale = variant === 'background' ? 1.5 : 1;

  const rotation = 120;

  const outerDashArray = `${arcLength} ${circumference}`;
  const outerDashOffset = arcLength * (1 - pct / 100);

  const innerDashArray = `${innerArcLength} ${innerCircumference}`;
  const innerDashOffset = innerArcLength * (1 - pct / 100);

  const uid = useId();
  const gradId = `cpg-grad-${uid}`;

  const secondary = variant === 'background' ? 'var(--background)' : 'color(var(--primary) / 50)';

  const baseReturn = (
    <div
      className={cn(
        'relative inline-block',
        double
          ? 'h-[122px] w-[122px] md:h-[150px] md:w-[150px]'
          : 'h-[90px] w-[90px] md:h-[115px] md:w-[115px]',
        className
      )}
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${finalSize} ${finalSize}`}
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
            gradientUnits="userSpaceOnUse"
            transform={`rotate(${rotation} ${finalSize / 2} ${finalSize / 2})`}
          >
            <stop offset="0%" className="text-primary" stopColor="currentColor" />
            <stop offset="100%" className="text-primary/65" stopColor="currentColor" />
          </linearGradient>
        </defs>

        {/* Secondary path */}
        <circle
          cx={finalSize / 2}
          cy={finalSize / 2}
          r={radius}
          fill="none"
          stroke={secondary}
          strokeWidth={secondaryThin ? strokeWidth / 5 : strokeWidth}
          strokeDasharray={outerDashArray}
          strokeDashoffset={0}
          strokeLinecap={rounded ? 'round' : 'butt'}
          strokeOpacity={variant !== 'background' ? 0.3 : 1}
          transform={`rotate(${rotation} ${finalSize / 2} ${finalSize / 2})`}
        />

        {/* Main progress */}
        <circle
          cx={finalSize / 2}
          cy={finalSize / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={outerDashArray}
          strokeDashoffset={outerDashOffset}
          strokeLinecap={rounded ? 'round' : 'butt'}
          transform={`rotate(${rotation} ${finalSize / 2} ${finalSize / 2})`}
          style={{
            transition: animate ? 'stroke-dashoffset 700ms cubic-bezier(.2,.9,.2,1)' : undefined,
          }}
        />

        {double && (
          <>
            {/* Inner secondary path (faded background) */}
            <circle
              cx={finalSize / 2}
              cy={finalSize / 2}
              r={innerRadius}
              fill="none"
              stroke={secondary}
              strokeWidth={secondaryThin ? strokeWidth / 6 : strokeWidth / 1.5}
              strokeDasharray={innerDashArray}
              strokeDashoffset={0}
              strokeLinecap={rounded ? 'round' : 'butt'}
              strokeOpacity={variant !== 'background' ? 0.3 : 1}
              transform={`rotate(${rotation} ${finalSize / 2} ${finalSize / 2})`}
            />

            {/* Inner progress circle */}
            <circle
              cx={finalSize / 2}
              cy={finalSize / 2}
              r={innerRadius}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth={secondaryThin ? strokeWidth / 3 : strokeWidth / 1.5}
              strokeDasharray={innerDashArray}
              strokeDashoffset={innerDashOffset}
              strokeLinecap={rounded ? 'round' : 'butt'}
              transform={`rotate(${rotation} ${finalSize / 2} ${finalSize / 2})`}
              style={{
                transition: animate
                  ? 'stroke-dashoffset 700ms cubic-bezier(.2,.9,.2,1)'
                  : undefined,
              }}
            />
          </>
        )}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <div
          className={cn(
            'flex h-17.5 w-17.5 items-center justify-center rounded-full md:h-25 md:w-25',
            variant === 'background' && 'bg-background'
          )}
        >
          {showLabel && (
            <span
              className={cn(
                'text-sm font-medium md:text-base',
                variant === 'background' && 'text-base md:text-lg'
              )}
            >
              {Math.round(pct)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (variant === 'background') {
    return (
      <div
        className={cn(
          'bg-secondary flex size-40 items-center justify-center rounded-full md:size-56.5',
          double && 'size-55 md:size-70'
        )}
      >
        {baseReturn}
      </div>
    );
  }

  return baseReturn;
}

export { SemiCircularProgress, type SemiCircularProgressProps, type StrokeLinecapVariant };
