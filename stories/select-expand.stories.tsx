import preview from '#storybook/preview';
import { SelectExpand } from '@/components/ui/select/select-expand';
import type { Option } from '@/components/ui/select/select-shared';
import type { ComponentProps } from 'react';
import { useState } from 'react';

const sampleOptions: Option[] = [
  { value: 'apple', label: 'Apple 🍎' },
  { value: 'banana', label: 'Banana 🍌' },
  { value: 'orange', label: 'Orange 🍊' },
  { value: 'grape', label: 'Grape 🍇' },
  { value: 'mango', label: 'Mango 🥭' },
];

const meta = preview.meta({
  title: 'Form/Select/SelectExpand',
  component: SelectExpand,
  argTypes: {
    mode: { control: 'radio', options: ['single', 'multi'] },
    multiDisplay: { control: 'radio', options: ['comma', 'tabs'] },
    markPosition: { control: 'radio', options: ['start', 'end'] },
    markRadius: { control: 'radio', options: ['full', 'xl'] },
    openedBorder: { control: 'radio', options: ['border', 'primary'] },
    closedBorder: { control: 'radio', options: ['border', 'primary'] },
    tabType: { control: 'radio', options: ['default', 'close'] },
    tabVariant: { control: 'radio', options: ['default', 'outline', 'primary'] },
    placeholder: { control: 'text' },
  },
});

export const Playground = meta.story({
  render: (args) => <SelectWrapper {...args} />,
  args: {
    placeholder: 'Select a fruit...',
    mode: 'single',
    markPosition: 'end',
    markRadius: 'full',
    multiDisplay: 'comma',
    openedBorder: 'border',
    closedBorder: 'border',
    tabType: 'default',
    tabVariant: 'default',
    onChange: () => {},
    options: sampleOptions,
    value: sampleOptions[0].value,
    className: '',
  },
});

const SelectWrapper = ({
  mode = 'single',
  markRadius = 'full',
  ...props
}: Omit<ComponentProps<typeof SelectExpand>, 'value' | 'onChange' | 'options'> & {
  mode?: 'single' | 'multi';
  markRadius?: 'full' | 'xl';
}) => {
  const [value, setValue] = useState<string | string[]>(mode === 'single' ? '' : []);

  return (
    <div className="max-w-xs">
      <SelectExpand
        options={sampleOptions}
        value={value}
        onChange={setValue}
        mode={mode}
        markRadius={markRadius}
        {...props}
      />
    </div>
  );
};

export const Default = meta.story({ render: () => <SelectWrapper /> });

export const MultiSelectComma = meta.story({
  render: () => <SelectWrapper mode="multi" multiDisplay="comma" />,
});

export const MultiSelectTabs = meta.story({
  render: () => <SelectWrapper mode="multi" multiDisplay="tabs" />,
});

export const MarkPositionVariants = meta.story({
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <SelectWrapper mode="multi" markPosition="start" placeholder="Mark at start" />
      <SelectWrapper mode="multi" markPosition="end" placeholder="Mark at end" />
    </div>
  ),
});

export const BorderVariants = meta.story({
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <SelectWrapper openedBorder="border" closedBorder="border" placeholder="Border" />
      <SelectWrapper openedBorder="primary" closedBorder="primary" placeholder="Primary" />
    </div>
  ),
});

export const TabTypes = meta.story({
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <SelectWrapper mode="multi" multiDisplay="tabs" tabType="close" placeholder="Border" />
      <SelectWrapper
        mode="multi"
        multiDisplay="tabs"
        tabType="default"
        placeholder="Primary Border"
      />
    </div>
  ),
});

export const TabVariants = meta.story({
  render: () => (
    <div className="flex max-w-xs flex-col gap-4">
      <SelectWrapper
        mode="multi"
        multiDisplay="tabs"
        tabType="close"
        tabVariant="default"
        placeholder="Default Tabs"
      />
      <SelectWrapper
        mode="multi"
        multiDisplay="tabs"
        tabType="close"
        tabVariant="outline"
        placeholder="Outline Tabs"
      />
      <SelectWrapper
        mode="multi"
        multiDisplay="tabs"
        tabType="close"
        tabVariant="primary"
        placeholder="Primary Tabs"
      />
    </div>
  ),
});
