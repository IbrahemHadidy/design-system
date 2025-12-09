import preview from '#storybook/preview';
import { Accordion, AccordionItem } from '@/components/ui/accordion';

const meta = preview.meta({
  title: 'Components/Accordion/Accent Mode',
  component: AccordionItem,

  argTypes: {
    value: {
      control: 'text',
      description: 'Unique value for the AccordionItem',
    },
    title: {
      control: 'text',
      description: 'Title displayed in the AccordionItem header',
    },
  },
});

export const Playground = meta.story({
  args: {
    value: '1',
    title: 'Accent Accordion Playground',
    children: (
      <p>
        This is the <strong>Accent</strong> mode playground. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </p>
    ),
  },
  render: (args) => (
    <Accordion
      mode="accent"
      type="single"
      collapsible
      className="flex w-full max-w-2xl flex-col gap-2"
    >
      <AccordionItem {...args} />
    </Accordion>
  ),
});
