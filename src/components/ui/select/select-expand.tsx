'use client';

import { AnimatePresence, motion } from 'motion/react';
import { LuChevronDown } from 'react-icons/lu';
import { cn } from 'tailwind-variants';
import {
  renderPlaceholderContent,
  SelectList,
  useSelect,
  type SelectBaseProps,
} from './select-shared';

type Option = {
  value: string;
  label: string;
};

type SelectMode = 'single' | 'multi';
type MarkPosition = 'start' | 'end';

interface SelectExpandProps extends SelectBaseProps {
  openedBorder?: 'border' | 'primary';
  closedBorder?: 'border' | 'primary';
}

export default function SelectExpand({
  options,
  placeholder = 'Select...',
  mode = 'single',
  multiDisplay = 'comma',
  markPosition = 'end',
  markRadius = 'xl',
  openedBorder = 'border',
  closedBorder = 'border',
  tabType = 'default',
  tabVariant = 'default',
  className,
  ...rest
}: SelectExpandProps) {
  const { open, setOpen, selected, toggleValue, isSelected, ref } = useSelect({
    options,
    placeholder,
    mode,
    multiDisplay,
    markPosition,
    ...rest,
  });

  const borderColor = open ? openedBorder : closedBorder;

  return (
    <div ref={ref} className={cn('relative w-full rounded-2xl', className)}>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          'bg-card flex min-h-15 w-full items-center justify-between rounded-2xl border px-3 py-2 text-sm transition-[border-color,border-radius] duration-200',
          open
            ? `rounded-b-none border-b-0 border-${borderColor} transition-none`
            : `rounded-b-2xl border-${borderColor} delay-[100ms]`
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="text-2xs truncate md:text-sm">
            {renderPlaceholderContent({
              options,
              selected,
              mode,
              multiDisplay,
              tabType,
              placeholder,
              tabVariant,
              onRemove: (value) => {
                if (mode === 'single') return;
                const newSelected = (selected as string[]).filter((v) => v !== value);
                rest.onChange(newSelected);
              },
            })}
          </div>
        </div>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <LuChevronDown size={18} />
        </motion.span>
      </button>

      {/* Inline expanding list */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              'bg-card mt-0 overflow-hidden rounded-b-2xl border border-t-0',
              `border-${openedBorder}`
            )}
          >
            <div className="flex w-full justify-center px-3">
              <div className="bg-border h-px flex-1 self-center" />
            </div>

            <SelectList
              options={options}
              isSelected={isSelected}
              toggleValue={toggleValue}
              mode={mode}
              markPosition={markPosition}
              markRadius={markRadius}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { SelectExpand, type MarkPosition, type Option, type SelectExpandProps, type SelectMode };
