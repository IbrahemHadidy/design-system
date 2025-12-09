'use client';

import { Button, type ButtonProps } from '@/components/ui/buttons/button';
import type { JSX, ReactNode } from 'react';
import { PiX, PiXCircle, PiXCircleFill, PiXFill } from 'react-icons/pi';
import { cn } from 'tailwind-variants';

type CloseButtonIcon = 'x' | 'circle';

const iconMap: Record<
  CloseButtonIcon,
  (props: { variant: 'outline' | 'solid'; className: string }) => JSX.Element
> = {
  x: ({ variant, className }) =>
    variant === 'outline' ? <PiX className={className} /> : <PiXFill className={className} />,
  circle: ({ variant, className }) =>
    variant === 'outline' ? (
      <PiXCircle className={className} />
    ) : (
      <PiXCircleFill className={className} />
    ),
};

interface CloseButtonProps extends Omit<ButtonProps, 'asChild'> {
  icon?: CloseButtonIcon;
  children?: ReactNode;
  gap?: string | number;
}

function CloseButton({
  variant = 'default',
  radius = 'full',
  icon = 'x',
  children,
  className,
  ...props
}: CloseButtonProps) {
  const isDefault = variant === 'default';

  const IconComponent = iconMap[icon];

  const buttonClass = cn(
    'gap-2',
    children ? 'px-4 py-2' : 'p-2!',
    isDefault ? 'text-primary-foreground' : 'text-primary',
    className
  );

  const icoVariant = isDefault && icon === 'x' ? 'outline' : 'solid';

  return (
    <Button {...props} variant={variant} radius={radius} className={buttonClass}>
      {children}
      <IconComponent variant={icoVariant} className="size-5" />
    </Button>
  );
}

export { CloseButton, iconMap, type CloseButtonIcon, type CloseButtonProps };
