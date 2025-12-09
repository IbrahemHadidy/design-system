'use client';

import { AnimatedDigits } from '@/components/ui/animated-digits';
import { getDirection } from '@/lib/utils/get-direction';
import { useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';
import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from 'tailwind-variants';

interface HalfCircularProgressProps {
  title?: string | ReactNode;
  percentage: number;
  percentageClass?: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  contentClass?: string;
  animationDuration?: number;
  hideIndicatorCircle?: boolean;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const HalfCircularProgress = ({
  title,
  percentage,
  percentageClass,
  size = 416,
  strokeWidth = 30,
  className,
  contentClass,
  animationDuration = 1000,
  hideIndicatorCircle = false,
}: HalfCircularProgressProps) => {
  const locale = useLocale();
  const rtl = getDirection(locale) === 'rtl';
  const reduceMotion = useReducedMotion();

  // SVG dimensions
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = radius + strokeWidth / 2;
  const circumference = Math.PI * radius;

  // Unique gradient ID
  const uid = useId();
  const gradId = `semi-circular-gradient-${uid}`;

  // Refs
  const pathRef = useRef<SVGPathElement>(null);
  const prevPercentage = useRef(reduceMotion ? percentage : 0);

  // States
  const [animatedPercentage, setAnimatedPercentage] = useState(reduceMotion ? percentage : 0);
  const [circlePos, setCirclePos] = useState({ x: rtl ? cx + radius : cx - radius, y: cy });

  // SVG Path
  const semiCirclePath = rtl
    ? `M ${cx + radius} ${cy} A ${radius} ${radius} 0 0 0 ${cx - radius} ${cy}`
    : `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  // ---------------- Animation ----------------
  useLayoutEffect(() => {
    if (!pathRef.current) return;
    const pathEl = pathRef.current;
    const pathLength = pathEl.getTotalLength();

    if (reduceMotion) {
      requestAnimationFrame(() => setAnimatedPercentage(percentage));
      const offset = (percentage / 100) * pathLength;
      const point = pathEl.getPointAtLength(offset);
      setCirclePos({ x: point.x, y: point.y });
      prevPercentage.current = percentage;
    }

    const start = prevPercentage.current;
    const end = percentage;
    prevPercentage.current = percentage;

    let startTime: number | null = null;

    const animateFrame = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentValue = start + (end - start) * easedProgress;
      setAnimatedPercentage(currentValue);

      const offset = (currentValue / 100) * pathLength;
      const point = pathEl.getPointAtLength(offset);
      setCirclePos({ x: point.x, y: point.y });

      if (progress < 1) requestAnimationFrame(animateFrame);
    };

    requestAnimationFrame(animateFrame);
  }, [percentage, animationDuration, rtl, reduceMotion]);

  // Dash offset for progress
  const dashOffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <figure
      className={cn(
        'relative flex w-full max-w-md flex-col items-center justify-center overflow-visible',
        className
      )}
      style={{ maxWidth: size }}
    >
      <svg
        role="img"
        aria-label={`Progress: ${Math.round(animatedPercentage)}%`}
        viewBox={`0 0 ${size} ${radius + strokeWidth}`}
        className="h-auto w-full overflow-visible"
      >
        <title>{`Progress: ${Math.round(animatedPercentage)}%`}</title>

        <defs>
          <linearGradient
            id={gradId}
            x1={rtl ? '100%' : '0%'}
            x2={rtl ? '0%' : '100%'}
            y1="0%"
            y2="0%"
          >
            <stop offset="0%" className="text-primary" stopColor="currentColor" />
            <stop offset="100%" className="text-primary/65" stopColor="currentColor" />
          </linearGradient>

          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        {/* Base arc */}
        <path
          d={semiCirclePath}
          fill="none"
          stroke="var(--primary)"
          strokeOpacity={0.3}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          ref={pathRef}
          d={semiCirclePath}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />

        {/* End indicator circles */}
        {!hideIndicatorCircle && (
          <>
            <circle
              cx={circlePos.x}
              cy={circlePos.y}
              r={strokeWidth}
              fill="var(--background)"
              filter="url(#shadow)"
            />
            <circle cx={circlePos.x} cy={circlePos.y} r={strokeWidth / 1.2} fill="var(--primary)" />
          </>
        )}
      </svg>

      {/* Center content */}
      <figcaption
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-end pb-4 text-center',
          contentClass
        )}
      >
        <AnimatedDigits
          value={Math.round(animatedPercentage)}
          height={64}
          className={percentageClass}
          showPercentage
        />
        {title && typeof title === 'string' ? <span className="text-xl">{title}</span> : title}
      </figcaption>

      <span className="sr-only">{`Progress is ${Math.round(animatedPercentage)} percent`}</span>
    </figure>
  );
};

export { HalfCircularProgress, type HalfCircularProgressProps };
