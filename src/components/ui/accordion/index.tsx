import { Accordion as AccordionPrimitive } from '@/components/primitives/accordion';
import { type ComponentProps, createContext, type ReactNode, useContext } from 'react';
import * as AccentVariant from './accent-accordion';
import * as DefaultVariant from './default-accordion';
import * as HeaderVariant from './header-accordion';

type AccordionType = 'default' | 'accent' | 'header';

const accordionMap = {
  default: DefaultVariant,
  accent: AccentVariant,
  header: HeaderVariant,
} as const;

const AccordionTypeContext = createContext<AccordionType>('default');

type AccordionProps = {
  mode?: AccordionType;
  children: ReactNode;
} & ComponentProps<typeof AccordionPrimitive>;

function Accordion({ mode = 'default', children, ...props }: AccordionProps) {
  return (
    <AccordionTypeContext.Provider value={mode}>
      <AccordionPrimitive {...props}>{children}</AccordionPrimitive>
    </AccordionTypeContext.Provider>
  );
}

type AccordionItemPropsMap = {
  default: ComponentProps<typeof DefaultVariant.AccordionItem>;
  accent: ComponentProps<typeof AccentVariant.AccordionItem>;
  header: ComponentProps<typeof HeaderVariant.AccordionItem>;
};

type CombinedAccordionItemProps<T extends AccordionType = 'default'> = {
  mode?: T;
} & AccordionItemPropsMap[T];

function AccordionItem<T extends AccordionType = 'default'>(props: CombinedAccordionItemProps<T>) {
  const contextType = useContext(AccordionTypeContext);
  const { mode = contextType, ...rest } = props;

  const Variant = accordionMap[mode];
  const Component = Variant.AccordionItem;

  return <Component {...rest} />;
}

export { Accordion, AccordionItem, type CombinedAccordionItemProps };
