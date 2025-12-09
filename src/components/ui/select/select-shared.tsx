'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useRef, useState } from 'react';
import { LuCheck, LuX } from 'react-icons/lu';
import { cn } from 'tailwind-variants';

type Option = {
  value: string;
  label: string;
};

type SelectMode = 'single' | 'multi';
type MultiDisplay = 'comma' | 'tabs';
type MarkPosition = 'end' | 'start';
type MarkRadius = 'xl' | 'full';
type TabType = 'default' | 'close';
type TabVarient = 'default' | 'primary' | 'outline';

interface SelectBaseProps {
  options: Option[];
  placeholder?: string;
  value: string | string[];
  defaultValue?: string | string[];
  onChange: (value: string | string[]) => void;
  mode?: SelectMode;
  multiDisplay?: MultiDisplay;
  tabType?: TabType;
  tabVariant?: TabVarient;
  markPosition?: MarkPosition;
  markRadius?: MarkRadius;
  className?: string;
}

function ensureArray(val?: string | string[]) {
  if (val === undefined) return [];
  return Array.isArray(val) ? val : [val];
}

/**
 * Hook that contains shared selection and open state logic.
 */
function useSelect(props: SelectBaseProps) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string[] | string>(
    props.defaultValue ?? (props.mode === 'multi' ? [] : '')
  );

  const isControlled = props.value !== undefined;
  const selected = isControlled ? props.value : internal;

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  function toggleValue(val: string) {
    if (props.mode === 'single') {
      const out = val;
      if (!isControlled) setInternal(out);
      props.onChange?.(out);
      setOpen(false);
      return;
    }

    const current = new Set(ensureArray(selected));
    if (current.has(val)) current.delete(val);
    else current.add(val);
    const out = Array.from(current);
    if (!isControlled) setInternal(out);
    props.onChange?.(out);
  }

  function isSelected(val: string) {
    if (props.mode === 'single') return selected === val;
    return ensureArray(selected).includes(val);
  }

  return { open, setOpen, selected, toggleValue, isSelected, ref };
}

function SelectList({
  options,
  isSelected,
  toggleValue,
  mode,
  markPosition = 'end',
  markRadius = 'xl',
}: {
  options: Option[];
  isSelected: (val: string) => boolean;
  toggleValue: (val: string) => void;
  mode: SelectMode;
  markPosition?: MarkPosition;
  markRadius: 'xl' | 'full';
}) {
  return (
    <ul className="max-h-60 overflow-auto p-1">
      {options.map((opt: Option) => {
        const sel = isSelected(opt.value);
        return (
          <li
            key={opt.value}
            onClick={() => toggleValue(opt.value)}
            role="option"
            aria-selected={sel}
            className={cn(
              'hover:bg-muted/50 flex min-h-10 cursor-pointer items-center gap-2 rounded-xl p-2 text-sm select-none',
              sel && 'bg-muted/60'
            )}
          >
            {markPosition === 'start' && (
              <div className="flex min-w-5 items-center justify-center md:min-w-6">
                {mode === 'single' ? (
                  <Mark shown={sel} />
                ) : (
                  <Checkbox
                    checked={sel}
                    radius={markRadius}
                    className="size-5 md:size-6"
                    markClassName="size-3 md:size-4"
                  />
                )}
              </div>
            )}

            <div
              className={cn(
                'text-2xs min-w-0 flex-1 md:text-sm',
                mode === 'single' && sel ? 'font-medium' : ''
              )}
            >
              {opt.label}
            </div>

            {markPosition === 'end' && (
              <div className="flex items-center gap-2">
                {mode === 'single' ? (
                  <Mark shown={sel} />
                ) : (
                  <Checkbox
                    checked={sel}
                    radius={markRadius}
                    className="size-5 md:size-6"
                    markClassName="size-3 md:size-4"
                  />
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Mark icon */
function Mark({ shown }: { shown?: boolean }) {
  return (
    <span
      className={cn('inline-flex items-center justify-center', shown ? 'opacity-100' : 'opacity-0')}
    >
      <LuCheck size={16} />
    </span>
  );
}

/** Render placeholder/selected values */
interface RenderPlaceholderProps {
  options: Option[];
  selected: string | string[];
  mode: SelectMode;
  multiDisplay: MultiDisplay;
  tabType: TabType;
  tabVariant: TabVarient;
  placeholder: string;
  onRemove?: (value: string) => void;
}

function renderPlaceholderContent({
  options,
  selected,
  mode,
  multiDisplay,
  tabType,
  tabVariant,
  placeholder,
  onRemove,
}: RenderPlaceholderProps) {
  const arr = ensureArray(selected).filter(Boolean);
  if (arr.length === 0) return <span className="text-muted-foreground">{placeholder}</span>;

  if (mode === 'single') {
    const opt = options.find((o) => o.value === arr[0]);
    return <span>{opt?.label ?? arr[0]}</span>;
  }

  if (multiDisplay === 'comma') {
    const labels = arr.map((v) => options.find((o) => o.value === v)?.label ?? v);
    return <span>{labels.join(', ')}</span>;
  }

  // multiDisplay === 'tabs'
  return (
    <div className="group-[tabs] flex flex-wrap gap-2">
      {arr.map((v) => {
        const opt = options.find((o) => o.value === v);

        const tabClasses =
          tabVariant === 'primary'
            ? 'group bg-primary/50 text-primary rounded-full px-1.5 py-1 text-sm flex items-center gap-1'
            : tabVariant === 'outline'
              ? 'group bg-background text-primary border border-primary rounded-full px-1.5 py-1 text-sm flex items-center gap-1'
              : 'group bg-muted inline-flex items-center gap-1 rounded px-1.5 py-1 text-sm';

        return (
          <span
            key={v}
            className={tabClasses}
            onClick={(e) => {
              e.stopPropagation();
              if (onRemove && tabType === 'close') onRemove(v);
            }}
          >
            <span className="text-2xs md:text-xs">{opt?.label ?? v}</span>
            {onRemove && tabType === 'close' && (
              <button
                type="button"
                className="text-primary group-hover:text-primary-foreground group-hover:bg-primary ms-1 flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-150"
              >
                <LuX className="size-4" />
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}

export {
  ensureArray,
  Mark,
  renderPlaceholderContent,
  SelectList,
  useSelect,
  type MarkPosition,
  type MarkRadius,
  type MultiDisplay,
  type Option,
  type RenderPlaceholderProps,
  type SelectBaseProps,
  type SelectMode,
  type TabType,
  type TabVarient,
};
