'use client';

import { getDirection } from '@/lib/utils/get-direction';
import { Indicator, Item, Root } from '@radix-ui/react-radio-group';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { Children, cloneElement, isValidElement, type ComponentProps } from 'react';
import { cn, tv, type VariantProps } from 'tailwind-variants';

const radioItemVariants = tv({
  base: 'focus-visible:ring-ring/50 relative flex items-center justify-center transition-colors duration-150 focus-visible:ring-[3px] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    radius: {
      full: 'rounded-full',
      lg: 'rounded-lg',
    },
    size: {
      xs: 'h-4 w-4 md:h-5 md:w-5',
      sm: 'h-6 w-6 md:h-7 md:w-7',
      md: 'h-8 w-8 md:h-10 md:w-10',
      lg: 'h-10 w-10 md:h-12 md:w-12',
    },
    activeColor: {
      default: 'data-[state=checked]:bg-primary',
      'primary-light': 'data-[state=checked]:bg-primary/50',
    },
    inactiveColor: {
      light: 'bg-foreground/20',
      subtle: 'bg-muted',
    },
  },
  defaultVariants: {
    radius: 'full',
    size: 'md',
    activeColor: 'default',
    inactiveColor: 'light',
  },
});

const innerDotVariants = tv({
  base: 'absolute',
  variants: {
    radius: {
      full: 'rounded-full',
      lg: 'rounded-md',
    },
    size: {
      xs: 'h-2 w-2 md:h-3 md:w-3',
      sm: 'h-3 w-3 md:h-4 md:w-4',
      md: 'h-4 w-4 md:h-6 md:w-6',
      lg: 'h-5 w-5 md:h-7 md:w-7',
    },
    activeColor: {
      default: 'bg-accent',
      'primary-light': 'bg-primary-light',
    },
  },
  defaultVariants: {
    radius: 'full',
    size: 'md',
    activeColor: 'default',
  },
});

interface CustomRadioGroupItemProps
  extends ComponentProps<typeof Item>, VariantProps<typeof radioItemVariants> {}

interface RadioGroupProps
  extends ComponentProps<typeof Root>, VariantProps<typeof radioItemVariants> {}

function RadioGroup({
  className,
  radius,
  size,
  activeColor,
  inactiveColor,
  children,
  ...props
}: RadioGroupProps) {
  const locale = useLocale();
  const dir = getDirection(locale);

  // Automatically inject props into all RadioGroupItem children
  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement<CustomRadioGroupItemProps>(child)) return child;

    return cloneElement(child, {
      radius: child.props.radius ?? radius,
      size: child.props.size ?? size,
      activeColor: child.props.activeColor ?? activeColor,
      inactiveColor: child.props.inactiveColor ?? inactiveColor,
    });
  });

  return (
    <Root dir={dir} data-slot="radio-group" className={cn('grid gap-3', className)} {...props}>
      {enhancedChildren}
    </Root>
  );
}

function RadioGroupItem({
  className,
  radius,
  size,
  activeColor,
  inactiveColor,
  ...props
}: CustomRadioGroupItemProps) {
  return (
    <Item
      data-slot="radio-group-item"
      className={cn(radioItemVariants({ radius, size, activeColor, inactiveColor }), className)}
      {...props}
    >
      <Indicator asChild>
        <AnimatePresence>
          <motion.span
            key="indicator"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span
              className={cn(
                innerDotVariants({ radius, size, activeColor }),
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
              )}
            />
          </motion.span>
        </AnimatePresence>
      </Indicator>
    </Item>
  );
}

export {
  innerDotVariants,
  RadioGroup,
  RadioGroupItem,
  radioItemVariants,
  type CustomRadioGroupItemProps,
};
