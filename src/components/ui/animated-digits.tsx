'use client';

import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useLocale, type Locale } from 'next-intl';
import { useEffect } from 'react';
import { cn } from 'tailwind-variants';

interface NumberProps {
  mv: MotionValue<number>;
  number: number;
  height: number;
  prefersReducedMotion: boolean | null;
  locale: Locale;
}

function Number({ mv, number, height, prefersReducedMotion, locale }: NumberProps) {
  const localizedDigit = new Intl.NumberFormat(locale, {
    useGrouping: false,
    numberingSystem: locale === 'ar' ? 'arab' : 'latn',
  }).format(number);

  const y = useTransform(mv, (latest) => {
    if (prefersReducedMotion) return 0;

    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) memo -= 10 * height;
    return memo;
  });

  return (
    <motion.span
      style={prefersReducedMotion ? undefined : { y }}
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      {localizedDigit}
    </motion.span>
  );
}

interface DigitProps {
  place: number;
  value: number;
  height: number;
  hidden?: boolean;
  locale: Locale;
}

function Digit({ place, value, height, hidden, locale }: DigitProps) {
  const prefersReducedMotion = useReducedMotion();
  const valueRoundedToPlace = Math.floor(value / place) % 10;

  const animatedValue = useSpring(valueRoundedToPlace, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  if (prefersReducedMotion) {
    const localizedDigit = new Intl.NumberFormat(locale, {
      useGrouping: false,
      numberingSystem: locale === 'ar' ? 'arab' : 'latn',
    }).format(valueRoundedToPlace);

    return (
      <div
        style={{ height, opacity: hidden ? 0 : 1 }}
        className="relative flex w-[1ch] items-center justify-center overflow-hidden"
      >
        <span aria-hidden>{localizedDigit}</span>
      </div>
    );
  }

  return (
    <div
      style={{ height, opacity: hidden ? 0 : 1 }}
      className="relative w-[1ch] overflow-hidden transition-opacity duration-200"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number
          key={i}
          mv={animatedValue}
          number={i}
          height={height}
          prefersReducedMotion={prefersReducedMotion}
          locale={locale}
        />
      ))}
    </div>
  );
}

interface AnimatedDigitsProps {
  value: number;
  height?: number;
  fontSize?: number;
  places?: number[];
  className?: string;
  showPercentage?: boolean;
}

function AnimatedDigits({
  value,
  height = 28,
  fontSize = 40,
  places,
  className = '',
  showPercentage = false,
}: AnimatedDigitsProps) {
  const locale = useLocale();

  const computedPlaces = places
    ? places
    : Array.from({ length: Math.max(1, String(Math.floor(Math.abs(value))).length) }, (_, i) =>
        Math.pow(10, Math.max(0, String(Math.floor(Math.abs(value))).length - i - 1))
      );

  return (
    <div
      style={{ fontSize, height }}
      className={cn(
        'relative flex w-fit items-center justify-center overflow-hidden px-3 text-center text-2xl font-medium',
        className
      )}
      aria-hidden
      dir="ltr"
    >
      {/* Arabic % symbol */}
      {showPercentage && locale === 'ar' && <span className="mr-1">٪</span>}

      {computedPlaces.map((place) => (
        <Digit key={place} place={place} value={value} height={height} locale={locale} />
      ))}

      {/* English % symbol */}
      {showPercentage && locale === 'en' && <span className="ml-1">%</span>}
    </div>
  );
}

export { AnimatedDigits, Digit, Number };
export type { AnimatedDigitsProps, DigitProps, NumberProps };
