'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type UIEvent,
} from 'react';
import { PiCheckCircle, PiInfo, PiWarning, PiWarningCircle, PiX } from 'react-icons/pi';
import { cn, tv } from 'tailwind-variants';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastCancel {
  label: string;
  onClick: () => void;
}

interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration?: number;
  action?: ReactNode | ToastAction;
  cancel?: ToastCancel;
  onClose?: () => void;
  stackIndex?: number;
  isVisible?: boolean;
  isStacked?: boolean;
  isHovered?: boolean;
  stackDirection?: 'up' | 'down';
  isExiting?: boolean;
  totalCount?: number;
}

interface ToastState extends ToastProps {
  id: string;
  timestamp: number;
}

interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
  styleVariant?: 'bulk-border' | 'bulk' | 'outline' | 'outline-bulk-icon' | 'solid';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  accentPosition?: 'top' | 'bottom' | 'start' | 'end' | 'none';
  showIcon?: boolean;
  duration?: number;
  action?: ReactNode | ToastAction;
  cancel?: ToastCancel;
}

type ToastListener = (toasts: ToastState[]) => void;

class ToastManager {
  private toasts: ToastState[] = [];
  private listeners: Set<ToastListener> = new Set();

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }

  add(props: ToastProps) {
    const id = props.id || Math.random().toString(36).substr(2, 9);

    const existingIndex = this.toasts.findIndex((toast) => toast.id === id);
    if (existingIndex !== -1) {
      this.toasts[existingIndex] = {
        ...this.toasts[existingIndex],
        ...props,
        id,
      };
      this.notify();
      return id;
    }

    const newToast: ToastState = {
      ...props,
      id,
      timestamp: Date.now(),
    };

    this.toasts = [newToast, ...this.toasts];

    if (this.toasts.length > 10) {
      this.toasts = this.toasts.slice(0, 10);
    }

    this.notify();
    return id;
  }

  update(id: string, props: Partial<ToastProps>) {
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      this.toasts[index] = { ...this.toasts[index], ...props };
      this.notify();
    }
  }

  remove(id: string) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  clear() {
    this.toasts = [];
    this.notify();
  }

  getToasts() {
    return [...this.toasts];
  }
}

const toastManager = new ToastManager();

function toast(message: string, options?: ToastOptions): string;
function toast(options: ToastOptions & { title: string }): string;
function toast(
  messageOrOptions: string | (ToastOptions & { title: string }),
  options?: ToastOptions
): string {
  let toastProps: ToastOptions & { title: string };

  if (typeof messageOrOptions === 'string') {
    toastProps = {
      title: messageOrOptions,
      ...options,
    };
  } else {
    toastProps = messageOrOptions;
  }

  return toastManager.add(toastProps);
}

toast.success = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'success', ...options });

toast.error = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'error', ...options });

toast.warning = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'warning', ...options });

toast.info = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'info', ...options });

toast.loading = (message: string, options?: ToastOptions) =>
  toast({ title: message, variant: 'loading', duration: Infinity, ...options });

toast.promise = <T,>(
  promise: Promise<T>,
  options: {
    loading: string;
    success: string;
    error: string;
  }
): Promise<T> => {
  const id = toast.loading(options.loading);

  promise
    .then(() => {
      toastManager.update(id, {
        title: options.success,
        variant: 'success',
        duration: 5000,
      });
    })
    .catch(() => {
      toastManager.update(id, {
        title: options.error,
        variant: 'error',
        duration: 5000,
      });
    });

  return promise;
};

toast.dismiss = (id?: string) => {
  if (id) {
    toastManager.remove(id);
  } else {
    toastManager.clear();
  }
};

const solidBgVariants = {
  default: 'bg-primary text-primary-foreground',
  success: 'bg-success text-success-foreground',
  error: 'bg-error text-error-foreground',
  warning: 'bg-warning text-warning-foreground',
  info: 'bg-info text-info-foreground',
  loading: 'bg-loading text-loading-foreground',
};

const toastVariants = tv({
  base: 'toast-base pointer-events-auto fixed z-100 flex min-h-14 w-[calc(100%-2rem)] max-w-83 items-center justify-between space-x-4 overflow-hidden rounded-2xl shadow-lg md:min-h-16 md:max-w-102',
  variants: {
    variant: {
      default: 'border-primary-foreground bg-primary text-primary-foreground',
      success: 'border-success-light-foreground bg-success-light text-success-light-foreground',
      error: 'border-error-light-foreground bg-error-light text-error-light-foreground',
      warning: 'border-warning-light-foreground bg-warning-light text-warning-light-foreground',
      info: 'border-info-light-foreground bg-info-light text-info-light-foreground',
      loading: 'border-loading-light-foreground bg-loading-light text-loading-light-foreground',
    },
    styleVariant: {
      'bulk-border': 'border',
      bulk: 'border-0',
      outline: 'border',
      'outline-bulk-icon': 'border',
      solid: '', // will be replaced dynamically
    },
    position: {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'right-4 bottom-4',
      'bottom-left': 'bottom-4 left-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    styleVariant: 'bulk',
    position: 'bottom-right',
  },
});

const toastAccentVariants = tv({
  variants: {
    variant: {
      default: 'bg-primary-foreground',
      success: 'bg-success-light-foreground',
      error: 'bg-error-light-foreground',
      warning: 'bg-warning-light-foreground',
      info: 'bg-info-light-foreground',
      loading: 'bg-loading-light-foreground',
    },
    accentPosition: {
      top: 'absolute top-0 h-2 w-83 md:w-102',
      bottom: 'absolute bottom-0 h-2 w-83 md:w-102',
      start: 'h-fill absolute w-4',
      end: 'h-fill absolute end-0 w-4',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    accentPosition: 'top',
  },
});

const toastBulkIcoVariants = tv({
  base: 'rounded-md p-2',
  variants: {
    variant: {
      success: 'bg-success',
      error: 'bg-error',
      warning: 'bg-warning',
      info: 'bg-info',
      loading: 'bg-loading',
    },
  },
});

const ToastIcons = {
  success: (solid?: boolean) => (
    <PiCheckCircle
      className={cn(
        'size-5 shrink-0',
        solid ? 'text-success-foreground' : 'text-success-light-foreground'
      )}
    />
  ),
  error: (solid?: boolean) => (
    <PiWarningCircle
      className={cn(
        'size-5 shrink-0',
        solid ? 'text-error-foreground' : 'text-error-light-foreground'
      )}
    />
  ),
  warning: (solid?: boolean) => (
    <PiWarning
      className={cn(
        'size-5 shrink-0',
        solid ? 'text-warning-foreground' : 'text-warning-light-foreground'
      )}
    />
  ),
  info: (solid?: boolean) => (
    <PiInfo
      className={cn(
        'size-5 shrink-0',
        solid ? 'text-info-foreground' : 'text-info-light-foreground'
      )}
    />
  ),
  loading: (solid?: boolean) => (
    <div className="relative size-5 shrink-0">
      <motion.div
        className={cn(
          'absolute inset-0 shadow-[0_0_4px_var(--loading)]',
          solid ? 'bg-loading-foreground' : 'bg-loading-light-foreground'
        )}
        animate={{ rotateX: [0, 180, 0], rotateY: [0, 180, 0] }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
      />
    </div>
  ),
};

const ToastComponent: FC<
  ToastProps & {
    styleVariant?: 'bulk-border' | 'bulk' | 'outline' | 'outline-bulk-icon' | 'solid';
    accentPosition?: 'top' | 'bottom' | 'start' | 'end' | 'none';
    showIcon?: boolean;
  }
> = ({
  title,
  description,
  variant = 'default',
  position = 'top-right',
  duration = 5000,
  onClose,
  action,
  cancel,
  stackIndex = 0,
  isVisible = true,
  isStacked = false,
  isHovered = false,
  stackDirection = 'down',
  isExiting = false,
  totalCount = 1,
  styleVariant = 'solid',
  accentPosition = 'none',
  showIcon = true,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const toastRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const isTouchAction = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [toastWidth, setToastWidth] = useState(320);

  useLayoutEffect(() => {
    if (toastRef.current) {
      setToastWidth(toastRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(innerWidth < 768);
    };

    checkMobile();
    addEventListener('resize', checkMobile);
    return () => removeEventListener('resize', checkMobile);
  }, []);

  const handleClose = useCallback(
    (e?: UIEvent) => {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      onClose?.();
    },
    [onClose]
  );

  const handleTouchStart = useCallback((e: TouchEvent | MouseEvent) => {
    if (e.target instanceof Element) {
      if (closeButtonRef.current?.contains(e.target) || e.target.closest('button[role="button"]')) {
        isTouchAction.current = true;
        return;
      }
    }

    e.stopPropagation();

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;

    startX.current = clientX;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (isTouchAction.current || !isDragging.current || !toastRef.current) return;

      e.stopPropagation();
      e.preventDefault();

      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const diff = clientX - startX.current;

      if (isMobile) {
        setTranslateX(diff);
      } else {
        if (position.includes('right') && diff > 0) {
          setTranslateX(diff);
        } else if (position.includes('left') && diff < 0) {
          setTranslateX(diff);
        }
      }
    },
    [position, isMobile]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (isTouchAction.current) {
        isTouchAction.current = false;
        return;
      }

      if (!isDragging.current || !toastRef.current) return;

      e.stopPropagation();

      const toastWidth = toastRef.current.offsetWidth;
      const swipeThreshold = toastWidth * 0.3;

      if (Math.abs(translateX) >= swipeThreshold) {
        handleClose();
      } else {
        setTranslateX(0);
      }

      isDragging.current = false;
    },
    [translateX, handleClose]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!isHovered && duration !== Infinity && duration > 0 && !isExiting) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, isHovered, handleClose, isExiting]);

  useEffect(() => {
    const currentRef = toastRef.current;
    if (currentRef) {
      const touchStartOptions = { passive: false };

      currentRef.addEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener,
        touchStartOptions
      );
      addEventListener('touchmove', handleTouchMove as unknown as EventListener, {
        passive: false,
      });
      addEventListener('touchend', handleTouchEnd as unknown as EventListener);

      currentRef.addEventListener('mousedown', handleTouchStart as unknown as EventListener);
      addEventListener('mousemove', handleTouchMove as unknown as EventListener);
      addEventListener('mouseup', handleTouchEnd as unknown as EventListener);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
        removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
        removeEventListener('touchend', handleTouchEnd as unknown as EventListener);

        currentRef.removeEventListener('mousedown', handleTouchStart as unknown as EventListener);
        removeEventListener('mousemove', handleTouchMove as unknown as EventListener);
        removeEventListener('mouseup', handleTouchEnd as unknown as EventListener);
      }
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (!isVisible) return null;

  const getTransform = () => {
    if (isStacked && stackIndex > 0) {
      const offset = stackIndex * 8;
      const scale = Math.max(0.85, 1 - stackIndex * 0.05);

      if (stackDirection === 'up') {
        return `translateX(${translateX}px) translateY(-${offset}px) scale(${scale})`;
      } else {
        return `translateX(${translateX}px) translateY(${offset}px) scale(${scale})`;
      }
    } else if (!isStacked && stackIndex > 0) {
      const expandedOffset = stackIndex * 88;

      if (stackDirection === 'up') {
        return `translateX(${translateX}px) translateY(-${expandedOffset}px)`;
      } else {
        return `translateX(${translateX}px) translateY(${expandedOffset}px)`;
      }
    }

    return `translateX(${translateX}px)`;
  };

  const opacity =
    translateX !== 0
      ? Math.max(0.3, 1 - Math.abs(translateX) / toastWidth)
      : isStacked && stackIndex >= 3
        ? 0.4
        : 1;

  const getZIndex = () => {
    return 1100 - stackIndex;
  };

  const renderAction = () => {
    if (!action) return null;

    if (isValidElement(action)) {
      const actionElement = action as ReactElement<{
        onClick?: (e: MouseEvent) => void;
      }>;
      return (
        <div className="ms-2 shrink-0">
          {cloneElement(actionElement, {
            onClick: (e: MouseEvent) => {
              e.stopPropagation();
              if (actionElement.props.onClick) {
                actionElement.props.onClick(e);
              }
              handleClose();
            },
          })}
        </div>
      );
    }

    if (typeof action === 'object' && action !== null && 'label' in action && 'onClick' in action) {
      const actionObj = action as ToastAction;
      return (
        <div className="ms-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              actionObj.onClick();
              handleClose();
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded px-3 py-1 text-xs font-medium transition-colors"
          >
            {actionObj.label}
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <motion.div
      ref={toastRef}
      role="alert"
      aria-live="polite"
      className={cn(
        toastVariants({ variant, position, styleVariant }),
        styleVariant === 'solid' && solidBgVariants[variant]
      )}
      initial={{
        x: position.includes('right') ? 400 : -400,
        y: position.includes('top') ? -100 : 100,
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        x: 0,
        y: 0,
        opacity,
        scale: isStacked && stackIndex > 0 ? Math.max(0.85, 1 - stackIndex * 0.05) : 1,
        transform: getTransform(),
      }}
      exit={{
        x: position.includes('right') ? 400 : -400,
        opacity: 0,
        scale: 0.9,
        transition: { duration: 0.2, ease: 'easeIn' },
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 400,
        duration: 0.3,
      }}
      style={{
        zIndex: getZIndex(),
        pointerEvents: 'auto',
      }}
    >
      <div className="relative flex w-full flex-col items-center">
        {accentPosition === 'top' && styleVariant !== 'solid' && (
          <div className={toastAccentVariants({ variant, accentPosition })} />
        )}

        <div className="relative flex w-full min-w-0 items-start gap-3">
          {accentPosition === 'start' && styleVariant !== 'solid' && (
            <div className={toastAccentVariants({ variant, accentPosition })} />
          )}

          <div className="flex w-full min-w-0 flex-col p-4 md:p-5">
            {title ? (
              <div
                className={cn(
                  'flex items-center justify-between gap-2',
                  showIcon && styleVariant === 'outline-bulk-icon' && '-translate-y-1'
                )}
              >
                {showIcon && variant !== 'default' && (
                  <div
                    className={cn(
                      'shrink-0',
                      styleVariant === 'outline-bulk-icon' && toastBulkIcoVariants({ variant })
                    )}
                  >
                    {ToastIcons[variant as keyof typeof ToastIcons](styleVariant === 'solid')}
                  </div>
                )}

                <div className="flex-1 truncate">
                  <div className="text-sm font-semibold md:text-base">{title}</div>
                </div>

                <button
                  ref={closeButtonRef}
                  onClick={handleClose}
                  className="shrink-0 rounded-full p-1 transition-opacity hover:bg-black/20 hover:opacity-75"
                  aria-label="Close"
                >
                  <PiX className="size-5" />
                </button>
              </div>
            ) : (
              showIcon &&
              variant !== 'default' && (
                <div
                  className={cn(
                    'flex items-start gap-2',
                    showIcon && styleVariant === 'outline-bulk-icon' && '-translate-y-1'
                  )}
                >
                  {showIcon && (
                    <div
                      className={cn(
                        'shrink-0',
                        styleVariant === 'outline-bulk-icon' && toastBulkIcoVariants({ variant })
                      )}
                    >
                      {ToastIcons[variant as keyof typeof ToastIcons](styleVariant === 'solid')}
                    </div>
                  )}
                  <span className="text-2xs font-normal opacity-70 md:text-xs">{description}</span>
                </div>
              )
            )}

            {title && description && (
              <div className="text-2xs truncate font-normal opacity-70 md:text-xs">
                {description}
              </div>
            )}
          </div>

          {accentPosition === 'end' && styleVariant !== 'solid' && (
            <div className={toastAccentVariants({ variant, accentPosition })} />
          )}
        </div>

        {accentPosition === 'bottom' && styleVariant !== 'solid' && (
          <div className={toastAccentVariants({ variant, accentPosition })} />
        )}
      </div>

      {isStacked && stackIndex === 0 && totalCount > 3 && (
        <motion.div
          className="bg-muted-foreground text-muted absolute -top-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          +{totalCount - 3}
        </motion.div>
      )}
      {renderAction()}
      {cancel && (
        <div className="ms-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              cancel.onClick();
              handleClose();
            }}
            className="bg-muted text-muted-foreground hover:bg-muted/80 rounded px-3 py-1 text-xs font-medium transition-colors"
          >
            {cancel.label}
          </button>
        </div>
      )}
    </motion.div>
  );
};

interface ToastStackProps {
  toasts: ToastState[];
  position: string;
  onRemoveToast: (id: string) => void;
}

const ToastStack: FC<ToastStackProps> = ({ toasts, position, onRemoveToast }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(innerWidth < 768);
    };

    checkMobile();
    addEventListener('resize', checkMobile);

    return () => {
      removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    setIsHovered(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const { clientX, clientY } = e;

      if (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        return;
      }

      hoverTimeoutRef.current = setTimeout(() => {
        setIsHovered(false);
        hoverTimeoutRef.current = null;
      }, 150);
    },
    [isMobile]
  );

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleRemoveToast = useCallback(
    (id: string) => {
      const toastToRemove = toasts.find((t: ToastState) => t.id === id);
      if (
        toastToRemove &&
        toasts.filter((t: ToastState) => t.position === toastToRemove.position).length === 1
      ) {
        setIsHovered(false);
        setIsTapped(false);
      }
      onRemoveToast(id);
    },
    [toasts, onRemoveToast]
  );

  const handleStackInteraction = () => {
    if (isMobile) {
      setIsTapped(!isTapped);
    }
  };

  const getVisibleToasts = () => {
    const maxVisible = 3;
    const shouldStack = toasts.length > 1;
    const isExpanded = isMobile ? isTapped : isHovered;

    if (shouldStack && !isExpanded) {
      return toasts.slice(0, maxVisible);
    }

    return toasts.slice(0, maxVisible);
  };

  const visibleToasts = getVisibleToasts();

  const getStackDirection = (pos: string) => {
    return pos.includes('bottom') ? 'up' : 'down';
  };

  const stackDirection = getStackDirection(position);
  const shouldStack = toasts.length > 1;
  const isExpanded = isMobile ? isTapped : isHovered;

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed z-100"
      style={{
        [position.includes('top') ? 'top' : 'bottom']: '1rem',
        [position.includes('right') ? 'right' : 'left']: '1rem',
      }}
    >
      <div
        className="pointer-events-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleStackInteraction}
      >
        <AnimatePresence mode="popLayout">
          {visibleToasts.map((toastProps, index) => (
            <ToastComponent
              key={toastProps.id}
              {...toastProps}
              stackIndex={index}
              isVisible={true}
              isStacked={shouldStack && !isExpanded}
              isHovered={isHovered || isTapped}
              stackDirection={stackDirection}
              totalCount={toasts.length}
              onClose={() => handleRemoveToast(toastProps.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

function ToastContainer() {
  const [toasts, setToasts] = useState(toastManager.getToasts());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(innerWidth < 768);
    };

    checkMobile();
    addEventListener('resize', checkMobile);
    return () => removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);

  const handleRemoveToast = useCallback((id: string) => {
    toastManager.remove(id);
  }, []);

  const processedToasts = toasts.map((toast) => {
    if (isMobile && toast.variant !== 'info') {
      return { ...toast, position: 'top-right' as const };
    }
    return toast;
  });

  const toastsByPosition = processedToasts.reduce(
    (acc, toast) => {
      const position = toast.position || 'top-right';
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(toast);
      return acc;
    },
    {} as Record<string, ToastState[]>
  );

  if (toasts.length === 0) return null;

  return (
    <>
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <ToastStack
          key={position}
          toasts={positionToasts}
          position={position}
          onRemoveToast={handleRemoveToast}
        />
      ))}
    </>
  );
}

const useToast = () => {
  return { toast };
};

const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export {
  solidBgVariants,
  toast,
  toastAccentVariants,
  toastBulkIcoVariants,
  ToastComponent,
  ToastContainer,
  ToastIcons,
  ToastManager,
  toastManager,
  ToastProvider,
  ToastStack,
  toastVariants,
  useToast,
  type ToastAction,
  type ToastCancel,
  type ToastListener,
  type ToastOptions,
  type ToastProps,
  type ToastStackProps,
  type ToastState,
};
