import preview from '#storybook/preview';
import { Button, type ButtonProps, buttonVariants } from '@/components/ui/buttons/button';

const meta = preview.meta({
  title: 'Components/Buttons/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(buttonVariants.variants.variant),
      description: 'Visual style variant of the button.',
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
    onClick: {
      action: 'clicked',
      description: 'Event handler called when the button is clicked.',
    },
  },
});

export const Playground = meta.story({
  args: {
    children: 'Button',
    variant: 'default',
    radius: 'lg',
    size: 'default',
    disabled: false,
  },
});

export const Variants = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      {Object.keys(buttonVariants.variants.variant).map((variant) => (
        <Button key={variant} variant={variant as ButtonProps['variant']}>
          {variant}
        </Button>
      ))}
    </div>
  ),
});

export const Sizes = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      {Object.keys(buttonVariants.variants.size).map((size) => (
        <Button key={size} size={size as ButtonProps['size']}>
          {size}
        </Button>
      ))}
    </div>
  ),
});

export const Radii = meta.story({
  render: () => (
    <div className="flex flex-wrap gap-4">
      {Object.keys(buttonVariants.variants.radius).map((size) => (
        <Button key={size} radius={size as ButtonProps['radius']}>
          {size}
        </Button>
      ))}
    </div>
  ),
});
