import preview from '#storybook/preview';
import { buttonVariants } from '@/components/ui/buttons/button';
import { CloseButton, iconMap } from '@/components/ui/buttons/close-button';

const variants = ['default', 'secondary', 'outline'] as const;

const meta = preview.meta({
  title: 'Components/Buttons/CloseButton',
  component: CloseButton,

  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual style variant of the button.',
    },
    icon: {
      control: 'select',
      options: Object.keys(iconMap),
      description: 'Icon displayed inside the button.',
    },
    radius: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.radius),
      description: 'Border radius of the button.',
    },
    size: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.size),
      description: 'Size of the button.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled or clickable.',
    },
    children: {
      control: 'text',
      description: 'Button label or inner content.',
    },
  },
  args: {
    variant: 'default',
    icon: 'x',
    radius: 'full',
    disabled: false,
    children: undefined,
  },
});

// Playground story
export const Playground = meta.story({
  args: {
    variant: 'default',
    icon: 'x',
    radius: 'full',
    children: 'Close',
    disabled: false,
  },
  render: (args) => <CloseButton {...args} />,
});

// Render all combinations
export const AllCombinations = meta.story({
  render: (args) => {
    const icons = ['x', 'circle'] as const;

    return (
      <div className="space-y-6">
        {variants.map((variant) =>
          icons.map((icon) => (
            <div key={`${variant}-${icon}`} className="flex gap-4">
              <CloseButton {...args} variant={variant} icon={icon} />
              <CloseButton {...args} variant={variant} icon={icon}>
                Text
              </CloseButton>
            </div>
          ))
        )}
      </div>
    );
  },
});
