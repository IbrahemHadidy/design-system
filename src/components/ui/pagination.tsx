import { buttonVariants, type ButtonProps } from '@/components/ui/buttons/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { ComponentProps, MouseEvent, RefObject } from 'react';
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
  LuEllipsis,
} from 'react-icons/lu';
import { cn } from 'tailwind-variants';

function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> & {
    radius?: 'sm' | 'full';
    currentStyle?: 'default' | 'outline' | 'no-border';
    scrollRef?: RefObject<HTMLElement>;
    disableScroll?: boolean;
  } & ComponentProps<'button'>;

function PaginationLink({
  className,
  isActive,
  radius,
  currentStyle,
  size = 'icon',
  onClick,
  scrollRef,
  disableScroll,
  ...props
}: PaginationLinkProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disableScroll) {
      if (scrollRef?.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const paginationNav = e.currentTarget.closest('[data-slot="pagination"]');
        const grandparent = paginationNav?.parentElement?.parentElement;
        if (grandparent) grandparent.scrollTo({ top: 0, behavior: 'smooth' });
        else scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    onClick?.(e);
  };

  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      onClick={handleClick}
      className={cn(
        buttonVariants({
          variant: isActive ? (currentStyle !== 'no-border' ? currentStyle : 'text') : 'ghost',
          size,
          radius,
        }),
        currentStyle !== 'no-border' && 'border',
        'size-8',
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  currentStyle,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="icon"
      className={cn(
        'flex size-8 items-center justify-center gap-1',
        currentStyle !== 'no-border' ? 'border px-2.5 sm:ps-2.5' : '',
        className
      )}
      currentStyle={currentStyle}
      {...props}
    >
      <LuChevronLeft
        className={cn('rtl:rotate-180', currentStyle === 'no-border' ? 'size-7' : 'size-5')}
      />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  currentStyle,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="icon"
      className={cn(
        'flex size-8 items-center justify-center gap-1',
        currentStyle !== 'no-border' ? 'border px-2.5 sm:ps-2.5' : '',
        className
      )}
      currentStyle={currentStyle}
      {...props}
    >
      <LuChevronRight
        className={cn('rtl:rotate-180', currentStyle === 'no-border' ? 'size-7' : 'size-5')}
      />
    </PaginationLink>
  );
}

function PaginationFirst({
  className,
  currentStyle,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to first page"
      size="icon"
      className={cn(
        'flex size-8 items-center justify-center gap-1',
        currentStyle !== 'no-border' ? 'border px-2.5 sm:ps-2.5' : '',
        className
      )}
      currentStyle={currentStyle}
      {...props}
    >
      <LuChevronsLeft
        className={cn('rtl:rotate-180', currentStyle === 'no-border' ? 'size-8' : 'size-6')}
      />
    </PaginationLink>
  );
}

function PaginationLast({
  className,
  currentStyle,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to last page"
      size="icon"
      className={cn(
        'flex size-8 items-center justify-center gap-1',
        currentStyle !== 'no-border' ? 'border px-2.5 sm:ps-2.5' : '',
        className
      )}
      currentStyle={currentStyle}
      {...props}
    >
      <LuChevronsRight
        className={cn('rtl:rotate-180', currentStyle === 'no-border' ? 'size-8' : 'size-6')}
      />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      data-slot="pagination-ellipsis"
      className={cn('text-primary flex size-8 items-center justify-center', className)}
      {...props}
    >
      <LuEllipsis aria-hidden className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

type PaginationEllipsisJumpProps = {
  onJump: (page: number) => void;
  lastPage: number;
  radius?: 'sm' | 'full';
  currentStyle?: 'default' | 'outline' | 'no-border';
} & ComponentProps<'button'>;

function PaginationEllipsisJump({
  onJump,
  lastPage,
  radius = 'full',
  currentStyle = 'default',
  className,
  ...props
}: PaginationEllipsisJumpProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Jump to page"
          className={cn(
            buttonVariants({
              variant: currentStyle === 'no-border' ? 'text' : 'ghost',
              size: 'icon',
              radius,
            }),
            currentStyle !== 'no-border' && 'border',
            'flex size-8 items-center justify-center',
            className
          )}
          {...props}
        >
          <LuEllipsis className="size-4" aria-hidden />
          <span className="sr-only">More pages</span>
        </button>
      </PopoverTrigger>

      <PopoverContent side="top" align="center" className="w-40 space-y-2 p-3">
        <p className="text-sm font-medium">Go to page</p>
        <JumpInput onJump={onJump} lastPage={lastPage} />
      </PopoverContent>
    </Popover>
  );
}

function JumpInput({ onJump, lastPage }: { onJump: (p: number) => void; lastPage: number }) {
  return (
    <Input
      type="number"
      min={1}
      max={lastPage}
      placeholder="Page..."
      className="h-8"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const value = Number((e.target as HTMLInputElement).value);
          if (!isNaN(value) && value >= 1 && value <= lastPage) {
            onJump(value);
          }
        }
      }}
    />
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationEllipsisJump,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  type PaginationEllipsisJumpProps,
  type PaginationLinkProps,
};
