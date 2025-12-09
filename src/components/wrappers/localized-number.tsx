'use client';

import { useLocale } from 'next-intl';

interface LocalizedNumberProps {
  value: number;
  percentageSign?: boolean;
  fixedDecimals?: number;
  autoDecimals?: boolean;
}

function LocalizedNumber({
  value,
  percentageSign = false,
  fixedDecimals,
  autoDecimals = true,
}: LocalizedNumberProps) {
  const locale = useLocale();

  const minimumFractionDigits =
    fixedDecimals !== undefined ? fixedDecimals : autoDecimals && Number.isInteger(value) ? 0 : 2;

  const maximumFractionDigits = fixedDecimals !== undefined ? fixedDecimals : autoDecimals ? 2 : 2;

  const formattedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    numberingSystem: locale === 'ar' ? 'arab' : 'latn',
  }).format(value);

  const percentageSignDisplay = locale === 'ar' ? '٪' : '%';

  return (
    <>
      {formattedNumber}
      {percentageSign ? percentageSignDisplay : ''}
    </>
  );
}

export { LocalizedNumber, type LocalizedNumberProps };
