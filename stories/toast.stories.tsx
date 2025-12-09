import preview from '#storybook/preview';
import { ToastComponent, ToastProvider } from '@/components/ui/toast';
import { getRandomId } from '@/lib/utils/get-random-id';
import { useState } from 'react';

const variants = ['default', 'success', 'error', 'warning', 'info', 'loading'] as const;
const styleVariants = ['bulk-border', 'bulk', 'outline', 'outline-bulk-icon', 'solid'] as const;
const accentPositions = ['none', 'top', 'bottom', 'start', 'end'] as const;
const showIconOptions = [true, false];

const meta = preview.meta({
  title: 'Components/Toast',
  component: ToastComponent,
});

export const Playground = meta.story({
  render: (args) => {
    return (
      <ToastProvider>
        <div className="flex justify-center p-8">
          <ToastComponent {...args} isVisible={true} onClose={() => {}} />
        </div>
      </ToastProvider>
    );
  },
  args: {
    title: 'Sample Toast',
    description: 'This is a customizable toast.',
    variant: 'default',
    styleVariant: 'bulk',
    accentPosition: 'none',
    showIcon: true,
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    styleVariant: { control: 'select', options: styleVariants },
    accentPosition: { control: 'select', options: accentPositions },
    showIcon: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
});

// Component to render a single variant tab
function VariantTab({ variant }: { variant: (typeof variants)[number] }) {
  const [visibleToasts, setVisibleToasts] = useState<
    {
      id: string;
      title: string;
      description: string;
      variant: (typeof variants)[number];
      styleVariant: (typeof styleVariants)[number];
      accentPosition: (typeof accentPositions)[number];
      showIcon: boolean;
    }[]
  >([]);

  const showToast = (props: Omit<(typeof visibleToasts)[number], 'id'>) => {
    const id = getRandomId();
    setVisibleToasts([{ id, ...props }]);
  };

  return (
    <ToastProvider>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">{variant.toUpperCase()} Variant</h2>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {styleVariants.map((styleVariant) => {
            const applicableAccents =
              styleVariant === 'solid' ? (['none'] as const) : accentPositions;

            return applicableAccents.map((accentPosition) => {
              if (variant === 'default') {
                return (
                  <button
                    key={`${styleVariant}-${accentPosition}`}
                    className="bg-primary/85 hover:bg-primary text-primary-foreground cursor-pointer rounded px-4 py-2"
                    onClick={() =>
                      showToast({
                        title: `${variant.toUpperCase()} Toast`,
                        description: 'This is a sample toast message.',
                        variant,
                        styleVariant,
                        accentPosition,
                        showIcon: false,
                      })
                    }
                  >
                    {variant} / {styleVariant} / {accentPosition} / Icon
                  </button>
                );
              }

              return showIconOptions.map((showIcon) => (
                <button
                  key={`${styleVariant}-${accentPosition}-${showIcon}`}
                  className="bg-primary/85 hover:bg-primary text-primary-foreground cursor-pointer rounded px-4 py-2"
                  onClick={() =>
                    showToast({
                      title: `${variant.toUpperCase()} Toast`,
                      description: 'This is a sample toast message.',
                      variant,
                      styleVariant,
                      accentPosition,
                      showIcon,
                    })
                  }
                >
                  {variant} / {styleVariant} / {accentPosition} / {showIcon ? 'Icon' : 'No Icon'}
                </button>
              ));
            });
          })}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {visibleToasts.map((toast) => (
            <ToastComponent
              key={toast.id}
              {...toast}
              isVisible={true}
              onClose={() => setVisibleToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            />
          ))}
        </div>
      </div>
    </ToastProvider>
  );
}

export const AllVariantsTabbed = meta.story({
  render: () => (
    <div className="flex flex-col gap-8">
      {variants.map((variant) => (
        <VariantTab key={variant} variant={variant} />
      ))}
    </div>
  ),
});
