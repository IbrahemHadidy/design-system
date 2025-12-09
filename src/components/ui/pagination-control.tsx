'use client';

import {
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
} from '@/components/ui/pagination';
import { getVisiblePages } from '@/lib/utils/get-visible-pages';
import type { RefObject } from 'react';
import { cn } from 'tailwind-variants';

interface PaginationControlProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  isFetching: boolean;
  radius: 'sm' | 'full';
  currentStyle?: 'outline' | 'default';
  nextPrevStyle?: 'outline' | 'default' | 'no-border';
  showFirstLast?: boolean;
  borderType?: 'none' | 'border' | 'rounded-rounded';
  barGradient?: boolean;
  maxSlots?: number;
  disableEllipsisClick?: boolean;
  disableScroll?: boolean;
  scrollRef?: RefObject<HTMLElement>;
}

function PaginationControl({
  currentPage,
  lastPage,
  onPageChange,
  isLoading,
  isFetching,
  radius,
  showFirstLast,
  currentStyle = 'default',
  nextPrevStyle = 'default',
  borderType = 'none',
  barGradient = false,
  maxSlots = 6,
  disableEllipsisClick = false,
  disableScroll = false,
  scrollRef,
}: PaginationControlProps) {
  const pages = getVisiblePages(currentPage, lastPage, maxSlots);

  return (
    <Pagination className={cn((isLoading || isFetching) && 'pointer-events-none opacity-50')}>
      <PaginationContent
        className={cn(
          borderType !== 'none' && 'border-primary border p-[0.88rem]',
          borderType !== 'none' && barGradient && 'from-background to-primary/50 bg-linear-to-b',
          borderType !== 'border' && 'rounded-md',
          borderType !== 'rounded-rounded' && 'rounded-full',
          'flex items-center justify-center gap-1'
        )}
      >
        {/* First button */}
        {showFirstLast && (
          <PaginationItem>
            <PaginationFirst
              onClick={() => {
                if (currentPage > 1) onPageChange(1);
              }}
              aria-label="First page"
              radius={radius}
              currentStyle={nextPrevStyle}
              scrollRef={scrollRef}
              disableScroll={disableScroll}
              className={cn(borderType !== 'none' && 'border-0')}
            />
          </PaginationItem>
        )}

        {/* Previous button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            aria-label="Previous page"
            radius={radius}
            currentStyle={nextPrevStyle}
            scrollRef={scrollRef}
            disableScroll={disableScroll}
            className={cn(borderType !== 'none' && 'border-0')}
          />
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              disableEllipsisClick ? (
                <PaginationEllipsis />
              ) : (
                <PaginationEllipsisJump onJump={onPageChange} lastPage={lastPage} radius={radius} />
              )
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                currentStyle={currentStyle}
                radius={radius}
                scrollRef={scrollRef}
                disableScroll={disableScroll}
                className={cn(borderType !== 'none' && 'border-0')}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (currentPage < lastPage) onPageChange(currentPage + 1);
            }}
            aria-label="Next page"
            radius={radius}
            currentStyle={nextPrevStyle}
            scrollRef={scrollRef}
            disableScroll={disableScroll}
            className={cn(borderType !== 'none' && 'border-0')}
          />
        </PaginationItem>

        {/* Last button */}
        {showFirstLast && (
          <PaginationItem>
            <PaginationLast
              onClick={() => {
                if (currentPage < lastPage) onPageChange(lastPage);
              }}
              aria-label="Last page"
              radius={radius}
              currentStyle={nextPrevStyle}
              scrollRef={scrollRef}
              disableScroll={disableScroll}
              className={cn(borderType !== 'none' && 'border-0')}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export { PaginationControl, type PaginationControlProps };
