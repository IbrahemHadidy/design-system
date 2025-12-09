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

interface SelectPopupProps extends SelectBaseProps {
  triggerShadow?: 'none' | 'sm';
  triggerBorder?: 'border' | 'primary';
  popupShadow?: 'none' | 'sm';
  popupBorder?: 'border' | 'primary';
}

function SelectPopup({
  options,
  placeholder = 'Select...',
  mode = 'single',
  multiDisplay = 'comma',
  markPosition = 'end',
  markRadius = 'xl',
  triggerShadow = 'sm',
  triggerBorder = 'border',
  popupShadow = 'sm',
  popupBorder = 'border',
  tabType = 'default',
  tabVariant = 'default',
  className,
  ...rest
}: SelectPopupProps) {
  const { open, setOpen, selected, toggleValue, isSelected, ref } = useSelect({
    options,
    placeholder,
    mode,
    multiDisplay,
    markPosition,
    ...rest,
  });

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={cn(
          'text- inline-flex min-h-15 w-full items-center justify-between gap-2 rounded-2xl px-3 py-2 text-sm transition-all',
          triggerShadow === 'sm' ? 'shadow-sm' : 'shadow-none',
          triggerBorder === 'primary' ? 'border-primary border' : 'border-border border',
          'bg-card'
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
              tabVariant,
              placeholder,
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className={cn(
              'bg-card absolute right-0 left-0 z-50 mt-1 overflow-hidden rounded-2xl',
              popupShadow === 'sm' && 'shadow-lg',
              popupBorder === 'primary' ? 'border-primary border' : 'border-border border'
            )}
            role="listbox"
          >
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

export { SelectPopup, type SelectPopupProps };
