'use client';

import { useCallback, useState } from 'react';

interface CommonControlledStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T, ...args: unknown[]) => void;
}

export function useControlledState<T, Rest extends unknown[] = []>(
  props: CommonControlledStateProps<T>
): readonly [T, (next: T, ...args: Rest) => void] {
  const { value, defaultValue, onChange } = props;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<T>(defaultValue as T);
  const currentValue = isControlled ? (value as T) : internal;

  const setValue = useCallback(
    (next: T, ...args: Rest) => {
      if (!isControlled) setInternal(next);
      onChange?.(next, ...args);
    },
    [isControlled, onChange]
  );

  return [currentValue, setValue] as const;
}
