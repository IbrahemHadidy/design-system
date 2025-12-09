import preview from '#storybook/preview';
import { InputField } from '@/components/ui/field/input-field';
import { useState } from 'react';

const meta = preview.meta({
  title: 'Form/InputField',
  component: InputField,
  argTypes: {
    label: { control: 'text' },
    labelPosition: { control: 'radio', options: ['top', 'border'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    id: { control: 'text' },
  },
});

export const Playground = meta.story({
  args: {
    id: 'playground',
    label: 'Interactive Input',
    labelPosition: 'top',
    placeholder: 'Type here...',
    type: 'text',
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
});

export const Default = meta.story({
  args: {
    id: 'username',
    label: 'Username',
    labelPosition: 'top',
    placeholder: 'Enter your username',
    type: 'text',
    disabled: false,
  },
});

export const LabelBorder = meta.story({
  args: {
    id: 'email',
    label: 'Email',
    labelPosition: 'border',
    placeholder: 'Enter your email',
    type: 'email',
    disabled: false,
  },
});

export const Disabled = meta.story({
  args: {
    id: 'password',
    label: 'Password',
    labelPosition: 'top',
    placeholder: 'Enter your password',
    type: 'password',
    disabled: true,
    value: 'Cannot edit',
  },
});
