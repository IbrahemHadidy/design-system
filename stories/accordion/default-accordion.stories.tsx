import preview from '#storybook/preview';
import { Accordion, AccordionItem } from '@/components/ui/accordion';
import {
  accordionVariants,
  type AccordionVariants,
  iconVariants,
} from '@/components/ui/accordion/accordion-shared';

const variants = Object.keys(accordionVariants.variants.variant) as AccordionVariants['variant'][];

const meta = preview.meta({
  title: 'Components/Accordion/Default Mode',
  component: AccordionItem,
  parameters: { deepControls: { enabled: true } },

  argTypes: {
    value: {
      control: 'text',
      description: 'Unique value for the AccordionItem',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the AccordionItem header',
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual style variant of the AccordionItem',
    },
    iconVariant: {
      control: 'object',
      description:
        'Icon configuration object. Example:\n' +
        '{\n' +
        '  <span style="color: #0066ff">icon</span>: ' +
        Object.keys(iconVariants.variants.icon)
          .map((v) => '<span style="color: #ff6600">' + v + '</span>')
          .join(' | ') +
        ',\n' +
        '  <span style="color: #0066ff">shape</span>: ' +
        Object.keys(iconVariants.variants.shape)
          .map((v) => '<span style="color: #ff6600">' + v + '</span>')
          .join(' | ') +
        ',\n' +
        '  <span style="color: #0066ff">bg</span>: ' +
        Object.keys(iconVariants.variants.bg)
          .map((v) => '<span style="color: #ff6600">' + v + '</span>')
          .join(' | ') +
        '\n' +
        '}',
    },
    accentOpenClass: {
      control: 'text',
      description: 'CSS class applied when the item with accent variant is open',
    },
    accentClosedClass: {
      control: 'text',
      description: 'CSS class applied when the item with accent variant is closed',
    },
  },
});

export const Playground = meta.story({
  args: {
    value: '1',
    title: 'Default Accordion Playground',
    iconVariant: {
      icon: 'chevron',
      shape: 'circular',
      bg: 'background',
    },
    children: (
      <p>
        This is the <strong>Default</strong> mode playground. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet,
        adipiscing nec, ultricies sed, dolor.
      </p>
    ),
  },
  render: (args) => {
    return (
      <Accordion type="single" collapsible className="flex w-full max-w-xl flex-col gap-2">
        <AccordionItem {...args} />
      </Accordion>
    );
  },
});

export const VariantTabs = meta.story({
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-6">
      {variants.map((variant) => (
        <Accordion key={variant} type="single" collapsible className="flex flex-col gap-2">
          <AccordionItem value="1" title={`${variant} Accordion`} variant={variant}>
            <p>
              This is the <strong>{variant}</strong> variant. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit
              amet, adipiscing nec, ultricies sed, dolor.
            </p>
          </AccordionItem>
          <AccordionItem value="2" title={`${variant} Accordion Item 2`} variant={variant}>
            <p>
              Another item in <strong>{variant}</strong> variant. Maecenas ligula massa, varius a,
              semper congue, euismod non, mi.
            </p>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  ),
});

export const ButtonVariants = meta.story({
  render: () => (
    <Accordion type="single" collapsible className="flex w-full max-w-xl flex-col gap-2">
      <AccordionItem
        value="1"
        title="Chevron Circular Primary"
        iconVariant={{ icon: 'chevron', shape: 'circular', bg: 'primary' }}
      >
        <p>
          Button with circular background color and chevron icon. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </AccordionItem>

      <AccordionItem
        value="2"
        title="Arrow Oval Background"
        iconVariant={{ icon: 'chevron', shape: 'oval', bg: 'background' }}
      >
        <p>
          Oval shaped button with chevron icon and background color. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </AccordionItem>

      <AccordionItem
        value="3"
        title="Plus/Minus Square"
        iconVariant={{ icon: 'plusminus', shape: 'square', bg: 'background' }}
      >
        <p>
          Square button with plus/minus icon and background color. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </p>
      </AccordionItem>

      <AccordionItem
        value="4"
        title="X Circular Background"
        iconVariant={{ icon: 'x', shape: 'circular', bg: 'background' }}
      >
        <p>
          Circular button with X icon and background color. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>
      </AccordionItem>
    </Accordion>
  ),
});

export const ButtonColorVariants = meta.story({
  render: () => (
    <Accordion type="single" collapsible className="flex w-full max-w-xl flex-col gap-2">
      <AccordionItem
        value="1"
        variant="secondary"
        title="Square Button – No Background"
        iconVariant={{ icon: 'chevron', shape: 'square', bg: 'none' }}
      >
        <p>
          A secondary variant accordion item with a square chevron button and no background color.
          Shows the icon clearly without any button fill.
        </p>
      </AccordionItem>

      <AccordionItem
        value="2"
        variant="secondary"
        title="Square Button – Background Color"
        iconVariant={{ icon: 'chevron', shape: 'square', bg: 'background' }}
      >
        <p>
          A secondary variant accordion item with a square chevron button and a neutral background.
          Highlights the button with a subtle background fill.
        </p>
      </AccordionItem>

      <AccordionItem
        value="3"
        variant="secondary"
        title="Square Button – Primary Color"
        iconVariant={{ icon: 'plusminus', shape: 'square', bg: 'primary' }}
      >
        <p>
          A secondary variant accordion item with a square plus/minus button in the primary color.
          Draws attention to the button with a prominent background fill.
        </p>
      </AccordionItem>
    </Accordion>
  ),
});
