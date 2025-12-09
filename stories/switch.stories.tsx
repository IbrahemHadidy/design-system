import preview from '#storybook/preview';
import { Switch, type SwitchProps } from '@/components/ui/switch';
import { useState } from 'react';
import { LuCheck, LuX } from 'react-icons/lu';

const meta = preview.meta({
  title: 'Components/Switch',
  component: Switch,

  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'success', 'warning', 'error'],
    },
    disabled: { control: 'boolean' },
    activeIcon: { control: false },
    disabledIcon: { control: false },
  },
});

export const Sizes = meta.story({
  render: () => {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(false);
    const [lg, setLg] = useState(false);

    return (
      <div className="flex items-center gap-4">
        <Switch size="sm" checked={sm} onCheckedChange={setSm} />
        <Switch size="md" checked={md} onCheckedChange={setMd} />
        <Switch size="lg" checked={lg} onCheckedChange={setLg} />
      </div>
    );
  },
});

export const Colors = meta.story({
  render: () => {
    const [primary, setPrimary] = useState(false);
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState(false);
    const [error, setError] = useState(false);

    return (
      <div className="flex items-center gap-4">
        <Switch color="primary" checked={primary} onCheckedChange={setPrimary} />
        <Switch color="success" checked={success} onCheckedChange={setSuccess} />
        <Switch color="warning" checked={warning} onCheckedChange={setWarning} />
        <Switch color="error" checked={error} onCheckedChange={setError} />
      </div>
    );
  },
});

export const Playground = meta.story({
  render: (args: SwitchProps) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        {...args}
        checked={checked}
        onCheckedChange={setChecked}
        activeIcon={<LuCheck size={14} />}
        disabledIcon={<LuX size={14} />}
      />
    );
  },
  args: {
    size: 'md',
    color: 'primary',
    disabled: false,
  },
});
