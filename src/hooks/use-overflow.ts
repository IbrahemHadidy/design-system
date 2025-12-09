'use client';

import { useEffect, useRef, useState } from 'react';

export function useOverflow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (!el) return;
      if (el.offsetParent === null) return;
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    });

    observer.observe(el);

    if (el.offsetParent !== null) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, isOverflowing };
}
