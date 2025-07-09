'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ArrowUpDown } from 'lucide-react';
import Link from 'next/link';

type BreadcrumbProps = {
  label: string;
  href: string;
}

type CoreTableProps<T> = {
  title: string;
  caption?: string;
  breadcrumbs?: BreadcrumbProps[];
  columns: string[];
  rows: T[];
  total?: number;
  currentPage?: number;
  perPage?: number;
  onPageChange?: (page: number) => void;
  onSearchChange?: (query: string) => void;
  onSortChange?: (key: string, direction: 'asc' | 'desc') => void;
  sortable?: string[];
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  renderRow: (row: T, index: number) => React.ReactNode;
};

export function CoreTable<T>({
  title,
  caption,
  breadcrumbs,
  columns,
  rows,
  total,
  currentPage = 1,
  perPage = 10,
  onPageChange,
  onSearchChange,
  onSortChange,
  sortable = [],
  sortKey,
  sortDirection,
  renderRow,
}: CoreTableProps<T>) {
  const [query, setQuery] = React.useState('');
  const totalPages = total ? Math.ceil(total / perPage) : 1;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearchChange?.(value);
  };

  const handleSort = (key: string) => {
    const isAsc = sortKey === key && sortDirection === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    onSortChange?.(key, newDirection);
  };

  return (
    <section className="w-full mx-auto px-4 py-6 space-y-6">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <BreadcrumbItem><Link href={crumb.href}>{crumb.label}</Link></BreadcrumbItem>
                {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <Input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search..."
          className="w-64"
        />
      </div>

      <Separator />

      <div className="overflow-auto rounded-xl">
        <Table className="w-full text-sm text-left">
          {caption && <TableCaption>{caption}</TableCaption>}

          <TableHeader>
            <TableRow className="bg-muted/30">
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className="px-4 py-3 font-semibold text-muted-foreground cursor-pointer select-none"
                  onClick={() => sortable.includes(col) && handleSort(col)}
                >
                  <div className="flex items-center gap-1 capitalize">
                    {col}
                    {sortable.includes(col) && sortKey === col && (
                      <ArrowUpDown
                        className={`w-4 h-4 transition-transform ${
                          sortDirection === 'asc' ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-muted-foreground"
                >
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, i) => (
                <TableRow
                  key={i}
                  className={`transition-colors hover:bg-muted/20 ${
                    i % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                  }`}
                >
                  {renderRow(row, i)}
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground px-4 py-2">
                  <span>
                    Showing {rows.length} of {total} entries (Page {currentPage} of {totalPages})
                  </span>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => onPageChange?.(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage >= totalPages}
                      onClick={() => onPageChange?.(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
}
