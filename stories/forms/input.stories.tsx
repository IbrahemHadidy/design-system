import preview from '#storybook/preview';
import { Input, inputVariants } from '@/components/ui/field/input';
import { useState } from 'react';
import { LuFlaskConical, LuFlaskRound, LuLock, LuMail, LuSearch } from 'react-icons/lu';

const meta = preview.meta({
  title: 'Form/Input',
  component: Input,

  argTypes: {
    type: {
      control: 'text',
      description: 'Input type, e.g., "text", "password", "email".',
    },
    size: {
      control: 'radio',
      options: Object.keys(inputVariants.variants.size),
      description: 'Input size: small, medium, or large.',
    },
    state: {
      control: 'radio',
      options: Object.keys(inputVariants.variants.state),
      description: 'Visual state of the input, e.g., default, error, disabled.',
    },
    startIcon: {
      control: false,
      description: 'Optional icon displayed at the start of the input.',
    },
    endIcon: {
      control: false,
      description: 'Optional icon displayed at the end of the input.',
    },
    loading: {
      control: 'boolean',
      description: 'Displays a loading spinner and disables interactions.',
    },
    skeleton: {
      control: 'boolean',
      description: 'Displays a skeleton placeholder and disables interactions.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field and prevents user interaction.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when the input is empty.',
    },
  },
  args: {
    placeholder: 'Type something...',
    size: 'md',
    state: 'default',
    loading: false,
    skeleton: false,
    disabled: false,
  },
});

export const Playground = meta.story({
  render: (args) => {
    const [showStartIcon, setShowStartIcon] = useState(true);
    const [showEndIcon, setShowEndIcon] = useState(true);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <button
            className="bg-secondary hover:secondary/70 cursor-pointer rounded px-2 py-1"
            onClick={() => setShowStartIcon((s) => !s)}
          >
            {showStartIcon ? 'Hide Test Start Icon' : 'Show Test Start Icon'}
          </button>
          <button
            className="bg-secondary hover:secondary/70 cursor-pointer rounded px-2 py-1"
            onClick={() => setShowEndIcon((s) => !s)}
          >
            {showEndIcon ? 'Hide Test End Icon' : 'Show Test End Icon'}
          </button>
        </div>

        <Input
          {...args}
          startIcon={showStartIcon ? LuFlaskRound : undefined}
          endIcon={showEndIcon ? LuFlaskConical : undefined}
        />
      </div>
    );
  },
});

export const WithStartIcon = meta.story({
  args: {
    startIcon: LuSearch,
  },
});

export const WithEndIcon = meta.story({
  args: {
    endIcon: LuMail,
  },
});

export const Error = meta.story({
  args: {
    state: 'error',
    placeholder: 'Invalid value',
  },
});

export const Disabled = meta.story({
  args: {
    disabled: true,
  },
});

export const Loading = meta.story({
  args: {
    loading: true,
  },
});

export const Skeleton = meta.story({
  args: {
    skeleton: true,
  },
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
});

export const PasswordField = meta.story({
  args: {
    type: 'password',
    startIcon: LuLock,
  },
});
