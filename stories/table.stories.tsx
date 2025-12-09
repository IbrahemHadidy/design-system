import preview from '#storybook/preview';
import type { ResponsiveTableProps } from '@/components/ui/table';
import { ResponsiveTable } from '@/components/ui/table';

const sampleHeaders: ResponsiveTableProps['headers'] = ['Item', 'Quantity', 'Amount'];

const sampleRows: ResponsiveTableProps['rows'] = [
  {
    Item: { content: 'Apple', align: 'left' },
    Quantity: { content: 3, align: 'center' },
    Amount: { content: '$9', align: 'right' },
  },
  {
    Item: { content: 'Orange', align: 'left' },
    Quantity: { content: 5, align: 'center' },
    Amount: { content: '$15', align: 'right' },
  },
  {
    Item: { content: 'Banana', align: 'left' },
    Quantity: { content: 2, align: 'center' },
    Amount: { content: '$4', align: 'right' },
  },
];

const meta = preview.meta({
  title: 'Components/ResponsiveTable',
  component: ResponsiveTable,
  argTypes: {
    headerType: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    rowStyle: {
      control: 'radio',
      options: ['basic', 'separated', 'striped'],
    },
  },
});

export const Playground = meta.story({
  args: {
    headers: sampleHeaders,
    rows: sampleRows,
    headerType: 'primary',
    rowStyle: 'basic',
  },
  argTypes: {
    headerType: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    rowStyle: {
      control: 'radio',
      options: ['basic', 'separated', 'striped'],
    },
  },
});

export const Basic = meta.story({
  args: {
    headers: sampleHeaders,
    rows: sampleRows,
    headerType: 'primary',
    rowStyle: 'basic',
  },
});

export const Separated = meta.story({
  args: {
    headers: sampleHeaders,
    rows: sampleRows,
    headerType: 'primary',
    rowStyle: 'separated',
  },
});

export const Striped = meta.story({
  args: {
    headers: sampleHeaders,
    rows: sampleRows,
    headerType: 'primary',
    rowStyle: 'striped',
  },
});

export const SecondaryHeader = meta.story({
  args: {
    headers: sampleHeaders,
    rows: sampleRows,
    headerType: 'secondary',
    rowStyle: 'basic',
  },
});
