'use client';

import {
  AccordionContent,
  AccordionHeader,
  AccordionTrigger,
  useAccordionItem,
} from '@/components/primitives/accordion';
import type { ReactNode } from 'react';
import { LuArrowRight, LuChevronDown, LuMinus, LuPlus, LuX } from 'react-icons/lu';
import { cn, tv, type VariantProps } from 'tailwind-variants';

type IconVariants = VariantProps<typeof iconVariants>;
type HeaderContentVariants = VariantProps<typeof headerContentVariants>;
type AccordionVariants = VariantProps<typeof accordionVariants>;

// Variants
const accordionVariants = tv({
  base: 'relative flex flex-col gap-1 overflow-hidden rounded-3xl transition-colors',
  variants: {
    variant: {
      primary: 'bg-primary hover:bg-primary/90 border-transparent',
      'primary-gradient':
        'from-primary hover:from-primary/90 to-primary-dark hover:to-primary-dark/80 border-transparent bg-linear-to-r rtl:bg-linear-to-l',
      secondary: 'bg-secondary border-border hover:bg-secondary/80 border',
      'secondary-accent': 'bg-secondary border-border hover:bg-secondary/80 border ps-4',
      outline: 'bg-background border-border hover:bg-accent border',
    },
  },
  defaultVariants: { variant: 'primary' },
});

const headerContentVariants = tv({
  base: 'px-4 text-sm font-medium md:text-base',
  variants: {
    variant: {
      primary: 'text-foreground',
      'primary-gradient': 'text-foreground',
      secondary: 'text-foreground',
      outline: 'text-foreground',
    },
  },
  defaultVariants: { variant: 'primary' },
});

const iconVariants = tv({
  base: 'flex items-center justify-center transition-all duration-300',
  variants: {
    icon: { chevron: '', plusminus: '', x: '' },
    shape: {
      none: '',
      circular: 'aspect-square size-6 rounded-full md:size-8',
      oval: 'aspect-3/2 h-8 w-12 rounded-3xl md:h-10 md:w-15',
      square: 'aspect-square size-6 rounded-md md:size-8',
    },
    bg: {
      none: '',
      primary: 'bg-primary text-primary-foreground',
      background: 'bg-background border-border border',
    },
  },
  defaultVariants: { icon: 'chevron', shape: 'circular', bg: 'none', color: 'default' },
});

type InnerDefaultAccordionItemProps = {
  mode: 'default';
  title: string;
  children: ReactNode;
  iconVariant?: IconVariants;
  variant?: AccordionVariants['variant'];
  accentOpenClass: string;
  accentClosedClass: string;
};

type InnerHeaderAccordionItemProps = {
  mode: 'header';
  title: string;
  children: ReactNode;
  iconVariant?: IconVariants;
  variant?: Exclude<AccordionVariants['variant'], 'secondary-accent'>;
};

type InnerAccordionItemProps = InnerDefaultAccordionItemProps | InnerHeaderAccordionItemProps;

function InnerAccordionItem(props: InnerAccordionItemProps) {
  const { mode, title, children, iconVariant, variant } = props;
  const isAccent = 'accentOpenClass' in props && 'accentClosedClass' in props;
  const accentOpenClass = isAccent ? props.accentOpenClass : undefined;
  const accentClosedClass = isAccent ? props.accentClosedClass : undefined;

  const { isOpen } = useAccordionItem();
  const useInverted = variant === 'primary' || variant === 'primary-gradient';

  // Determine icon color
  const iconColorClass = (() => {
    if (iconVariant?.shape === 'none')
      return useInverted ? 'text-primary-foreground' : 'text-foreground';
    if (iconVariant?.bg === 'primary') return 'text-primary-foreground';
    if (iconVariant?.bg === 'background') return 'text-foreground';
    return useInverted ? 'text-primary-foreground' : 'text-foreground';
  })();

  const renderIcon = () => {
    const wrapperClass =
      iconVariant?.shape === 'none'
        ? 'relative flex items-center justify-center'
        : cn(iconVariants(iconVariant), 'relative flex items-center justify-center');

    switch (iconVariant?.icon) {
      case 'x':
        return (
          <div className={wrapperClass}>
            <LuX
              className={cn(
                'absolute transform transition-all duration-300',
                isOpen ? 'rotate-180 opacity-100' : 'rotate-90 opacity-0',
                iconColorClass
              )}
            />
            <LuArrowRight
              className={cn(
                'absolute transform transition-all duration-300',
                isOpen
                  ? 'rotate-180 opacity-0 rtl:rotate-270'
                  : 'rotate-0 opacity-100 rtl:rotate-180',
                iconColorClass
              )}
            />
          </div>
        );
      case 'plusminus':
        return (
          <div className={wrapperClass}>
            <LuMinus
              className={cn(
                'absolute transform transition-all duration-500',
                isOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0',
                iconColorClass
              )}
            />
            <LuPlus
              className={cn(
                'absolute transform transition-all duration-500',
                isOpen ? 'rotate-90 opacity-0' : 'rotate-180 opacity-100',
                iconColorClass
              )}
            />
          </div>
        );
      case 'chevron':
      default:
        return (
          <div className={wrapperClass}>
            <LuChevronDown
              className={cn(
                'absolute transform transition-all duration-500',
                isOpen ? 'rotate-180' : 'rotate-0',
                iconColorClass
              )}
            />
          </div>
        );
    }
  };

  const triggerClassName = cn(
    mode === 'header' && accordionVariants({ variant }),
    'flex h-full w-full cursor-pointer flex-row items-center justify-between p-4 pe-5 text-start text-sm font-semibold md:p-5 md:pe-6 md:text-base lg:text-2xl',
    useInverted ? 'text-primary-foreground' : 'text-foreground'
  );

  return (
    <>
      {/* Accent bar */}
      {mode === 'default' && variant === 'secondary-accent' && (
        <div
          className={cn(
            'absolute start-4 top-2 bottom-2 w-1 transition-colors duration-300',
            isOpen ? accentOpenClass : accentClosedClass
          )}
        />
      )}

      <AccordionHeader className="h-full">
        <AccordionTrigger className={triggerClassName}>
          <span className="truncate">{title}</span>
          {renderIcon()}
        </AccordionTrigger>
      </AccordionHeader>

      {/* Content */}
      {mode === 'default' && (
        <AccordionContent keepRendered className="overflow-hidden">
          <div
            className={cn(
              'p-4 pe-5 pt-0 text-sm font-medium md:text-base',
              useInverted ? 'text-primary-foreground' : 'text-foreground'
            )}
          >
            {children}
          </div>
        </AccordionContent>
      )}

      {mode === 'header' && (
        <AccordionContent keepRendered className={cn(headerContentVariants({ variant }))}>
          {children}
        </AccordionContent>
      )}
    </>
  );
}

export {
  accordionVariants,
  headerContentVariants,
  iconVariants,
  InnerAccordionItem,
  type AccordionVariants,
  type HeaderContentVariants,
  type IconVariants,
};
