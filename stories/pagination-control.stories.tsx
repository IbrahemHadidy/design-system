import preview from '#storybook/preview';
import { PaginationControl } from '@/components/ui/pagination-control';
import type { ComponentProps } from 'react';
import { useState } from 'react';

const meta = preview.meta({
  title: 'Components/Pagination/PaginationControl',
  component: PaginationControl,
  args: {},
});

const PaginationWrapper = ({
  initialPage = 1,
  lastPage = 20,
  radius = 'sm',
  ...props
}: Omit<
  ComponentProps<typeof PaginationControl>,
  'currentPage' | 'onPageChange' | 'lastPage' | 'radius' | 'isLoading' | 'isFetching'
> & {
  isFetching?: boolean;
  isLoading?: boolean;
  initialPage?: number;
  lastPage?: number;
  radius?: 'sm' | 'full';
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <PaginationControl
      currentPage={currentPage}
      lastPage={lastPage}
      onPageChange={setCurrentPage}
      radius={radius}
      isLoading={false}
      isFetching={false}
      {...props}
    />
  );
};

export const Playground = meta.story({
  render: (args) => <PaginationWrapper {...args} />,
  args: {
    showFirstLast: true,
    radius: 'sm',
    currentStyle: 'default',
    nextPrevStyle: 'default',
    borderType: 'none',
    barGradient: false,
    maxSlots: 5,
    currentPage: 2,
    disableEllipsisClick: true,
    disableScroll: true,
    isFetching: false,
    isLoading: false,
    lastPage: 12,
    onPageChange: () => {},
  },
});

export const Default = meta.story({
  render: () => <PaginationWrapper />,
});

export const WithFirstLast = meta.story({
  render: () => <PaginationWrapper showFirstLast />,
});

export const RadiusVariants = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <PaginationWrapper radius="sm" showFirstLast />
      <PaginationWrapper radius="full" showFirstLast />
    </div>
  ),
});

export const CurrentStyleVariants = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <PaginationWrapper currentStyle="outline" showFirstLast />
      <PaginationWrapper
        isLoading={false}
        isFetching={false}
        currentStyle="default"
        showFirstLast
      />
    </div>
  ),
});

export const NextPrevStyleVariants = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <PaginationWrapper nextPrevStyle="default" showFirstLast />
      <PaginationWrapper nextPrevStyle="outline" showFirstLast />
      <PaginationWrapper nextPrevStyle="no-border" showFirstLast />
    </div>
  ),
});

export const BorderTypeVariants = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <PaginationWrapper borderType="none" showFirstLast />
      <PaginationWrapper borderType="border" showFirstLast />
      <PaginationWrapper borderType="rounded-rounded" showFirstLast />
    </div>
  ),
});

export const BarGradient = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <PaginationWrapper borderType="border" barGradient={false} showFirstLast />
      <PaginationWrapper borderType="border" barGradient={true} showFirstLast />
    </div>
  ),
});

export const MaxSlotsVariants = meta.story({
  render: () => (
    <div className="flex flex-col gap-4">
      <PaginationWrapper maxSlots={6} showFirstLast />
      <PaginationWrapper maxSlots={7} showFirstLast />
      <PaginationWrapper maxSlots={8} showFirstLast />
      <PaginationWrapper maxSlots={9} showFirstLast />
    </div>
  ),
});
