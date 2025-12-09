import preview from '#storybook/preview';
import type { CounterProps, CounterVariants } from '@/components/ui/counter';
import { Counter, counterVariants } from '@/components/ui/counter';
import { useState } from 'react';

const variants = Object.keys(counterVariants.variants.variant) as CounterVariants['variant'][];
const radii = Object.keys(counterVariants.variants.radius) as CounterVariants['radius'][];

const meta = preview.meta({
  title: 'Components/Counter',
  component: Counter,
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual style variant of the Counter buttons and display.',
    },
    radius: {
      control: 'select',
      options: radii,
      description: 'Border radius of the Counter container and buttons.',
    },
    value: {
      control: 'number',
      description: 'Current value of the Counter (controlled).',
    },
    min: {
      control: 'number',
      description: 'Minimum value the Counter can reach.',
    },
    max: {
      control: 'number',
      description: 'Maximum value the Counter can reach.',
    },
    step: {
      control: 'number',
      description: 'Increment/decrement step for the Counter.',
    },
    fontSize: {
      control: 'number',
      description: 'Font size of the animated digits.',
    },
    padding: {
      control: 'number',
      description: 'Additional vertical padding added to the digit height.',
    },
    places: {
      control: 'object',
      description: 'Array specifying the place values for each animated digit.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the value changes.',
    },
    className: {
      control: 'text',
      description: 'Additional className to apply to the Counter container.',
    },
  },
  args: {
    variant: 'secondary',
    radius: 'lg',
    min: 0,
    max: 9,
    step: 1,
    value: 0,
    fontSize: 40,
    padding: 0,
    places: [10, 1],
  },
});

export const Playground = meta.story({
  args: {
    variant: 'secondary',
    radius: 'lg',
  },
});

export const Variants = meta.story({
  render: () => (
    <div className="grid gap-10">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col items-center gap-6">
          <h3 className="text-lg font-semibold capitalize">{variant}</h3>
          <CounterExample variant={variant} radius="full" />
        </div>
      ))}
    </div>
  ),
});

export const Radii = meta.story({
  render: () => (
    <div className="grid gap-10">
      {radii.map((radius) => (
        <div key={radius} className="flex flex-col items-center gap-6">
          <h3 className="text-lg font-semibold capitalize">{radius}</h3>
          <CounterExample variant="primary" radius={radius} />
        </div>
      ))}
    </div>
  ),
});

function CounterExample({ variant, radius }: Pick<CounterProps, 'variant' | 'radius'>) {
  const [value, setValue] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Counter
        variant={variant}
        radius={radius}
        value={value}
        min={0}
        max={9}
        onChange={setValue}
      />
      <p className="text-muted-foreground text-sm">
        Value: <span className="font-semibold">{value}</span>
      </p>
    </div>
  );
}
