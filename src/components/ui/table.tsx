'use client';

import { useOverflow } from '@/hooks/use-overflow';
import { Fragment, type ComponentProps, type FC, type ReactNode } from 'react';
import { cn } from 'tailwind-variants';

// ---------- Basic Table Components ----------
function Table({ className, ref, ...props }: ComponentProps<'div'>) {
  return (
    <div ref={ref} className="relative w-full overflow-x-auto">
      <table className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  );
}
Table.displayName = 'Table';

function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />;
}

function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:ms-0 *:[[role=checkbox]]:translate-y-0.5',
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:ms-0 *:[[role=checkbox]]:translate-y-0.5',
        className
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

// ---------- Responsive Table ----------
type CellAlign = 'left' | 'center' | 'right';
type HeaderType = 'primary' | 'secondary';
type RowStyle = 'basic' | 'separated' | 'striped';

interface ResponsiveTableCell {
  content: ReactNode;
  align?: CellAlign;
}

interface ResponsiveTableRow {
  [header: string]: ResponsiveTableCell;
}

interface ResponsiveTableProps {
  headers: string[];
  rows: ResponsiveTableRow[];
  className?: string;
  headerType?: HeaderType;
  rowStyle?: RowStyle;
}

/**
 * Fully responsive table with header variants and row styles
 */
const ResponsiveTable: FC<ResponsiveTableProps> = ({
  headers,
  rows,
  className,
  headerType = 'primary',
  rowStyle = 'basic',
}) => {
  const { ref: tableContainerRef, isOverflowing } = useOverflow<HTMLDivElement>();

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full overflow-x-auto', isOverflowing && 'hidden')}>
        <Table ref={tableContainerRef} className="w-full table-auto border-collapse">
          <TableHeader>
            <TableRow className="border-b-0!">
              {headers.map((header, idx) => {
                const firstCell = rows[0]?.[header];
                return (
                  <TableHead
                    key={header}
                    className={cn(
                      'py-4 text-sm font-semibold',
                      headerType === 'primary' && 'bg-primary text-primary-foreground',
                      headerType === 'secondary' && 'bg-secondary text-foreground',
                      firstCell?.align === 'center' && 'text-center',
                      firstCell?.align === 'right' && 'text-right',
                      idx === 0 && 'rounded-l-lg ps-6',
                      idx === headers.length - 1 && 'rounded-r-lg pe-6'
                    )}
                  >
                    {header}
                  </TableHead>
                );
              })}
              0.625rem
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  'hover:bg-primary/10 border-0',
                  rowStyle === 'striped' && rowIndex % 2 !== 0 && 'bg-secondary'
                )}
              >
                {headers.map((header, idx) => {
                  const cell = row[header];
                  return (
                    <TableCell
                      key={header}
                      className={cn(
                        'py-4 text-sm font-medium',
                        cell?.align === 'center' && 'text-center',
                        cell?.align === 'right' && 'text-right',
                        idx === 0 && 'rounded-l-lg ps-6',
                        idx === headers.length - 1 && 'rounded-r-lg pe-6',
                        rowStyle === 'separated' &&
                          rowIndex !== rows.length - 1 &&
                          'border-secondary border-b'
                      )}
                    >
                      {cell?.content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isOverflowing && (
        <div className="flex w-full flex-col lg:hidden">
          {rows.map((row, rowIndex) => (
            <Fragment key={rowIndex}>
              <div
                className={cn(
                  'hover:bg-primary/10 flex w-full flex-row flex-wrap justify-between gap-3 rounded-lg border-0 p-4',
                  rowStyle === 'striped' && rowIndex % 2 !== 0 && 'bg-secondary'
                )}
              >
                {headers.map((header) => {
                  const cell = row[header];
                  return (
                    <div key={header} className="flex flex-col gap-1">
                      <span
                        className={cn(
                          'text-2xs font-semibold',
                          headerType === 'primary' ? 'text-primary' : 'text-foreground/60'
                        )}
                      >
                        {header}
                      </span>
                      <span className={cn('text-foreground text-sm font-medium')}>
                        {cell?.content}
                      </span>
                    </div>
                  );
                })}
              </div>
              {rowStyle === 'separated' && rowIndex !== rows.length - 1 && (
                <div className="border-secondary w-full border-t" />
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export {
  ResponsiveTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  type CellAlign,
  type HeaderType,
  type ResponsiveTableCell,
  type ResponsiveTableProps,
  type ResponsiveTableRow,
  type RowStyle,
};
