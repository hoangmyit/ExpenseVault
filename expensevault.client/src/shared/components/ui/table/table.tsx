import { JSX } from 'react';

import clsx from 'clsx';

import TableBody from './table-body';
import TableHeader from './table-header';
import TablePagination from './table-pagination';
import TableSort from './table-sort';

import './index.css';

import { TableProps } from '@/shared/types/ui/table.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>(
  props: TableProps<T>,
): JSX.Element {
  const {
    dataSource = [],
    columns = [],
    rowKey = 'id',
    loading = false,
    pagination,
    bordered = false,
    pinColumn = false,
    pinRow = false,
    zebra = false,
    size = 'md',
    onRow,
    className = '',
    tableLayout = 'auto',
    locale = {
      emptyText: 'No data',
      loadingText: 'Loading...',
    },
    showHeader = true,
    highlightRow = false,
    searchData = null,
  } = props;

  return (
    <>
      {!!searchData && (
        <TableSort<T>
          sortValue={searchData.sortValue}
          filterValue={searchData.filterValue}
          isAsc={searchData.isAsc}
          sortOptions={searchData.sortOptions}
          filterOptions={searchData.filterOptions}
          onSearch={searchData.onSearch}
          disabled={loading}
        />
      )}
      <div className="rounded-box border-base-content/5 bg-base-100 max-h-[60vh] overflow-x-auto overflow-y-auto border">
        <table
          className={clsx(
            zebra && 'table-zebra',
            pinRow && 'table-pin-rows',
            pinColumn && 'table-pin-cols',
            `table-${size}`,
            'table',
            className,
          )} //"table-zebra table-pin-rows table-pin-cols table-md table"
          style={{ tableLayout: tableLayout }}
        >
          {showHeader && <TableHeader columns={columns} />}
          <TableBody<T>
            dataSource={dataSource}
            columns={columns}
            locale={locale}
            loading={loading}
            onRow={onRow}
            highlightRow={highlightRow}
            rowKey={rowKey}
          />
        </table>
      </div>
      <TablePagination {...pagination} disabled={loading} />
    </>
  );
}

export default Table;
