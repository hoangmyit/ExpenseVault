import React, { JSX, Key } from 'react';

import clsx from 'clsx';

import { ColumnType, TableProps } from '@/shared/types/ui/table.type';
import { isString } from '@/shared/utils/type-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>(
  props: TableProps<T>,
): JSX.Element {
  const {
    dataSource = [],
    columns = [],
    rowKey = 'id',
    loading = false,
    pagination = false,
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
  } = props;

  const getRowKey = (record: T, index: number): Key => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return (record[rowKey] as unknown as Key) || index;
  };

  const renderCell = (record: T, column: ColumnType<T>, rowIndex: number) => {
    const dataIndex = column.dataIndex;
    const value = dataIndex !== undefined ? record[dataIndex] : undefined;

    if (column.render) {
      return column.render(value as never, record, rowIndex);
    }

    return value;
  };

  const renderHeader = () => {
    if (!showHeader) return null;

    return (
      <thead>
        <tr>
          {columns.map((column, index) => {
            const headerCellProps = column.onHeaderCell
              ? column.onHeaderCell()
              : {};

            const thStyle: React.CSSProperties = column.style || {};
            if (column.width) {
              thStyle.width = column.width;
            }
            if (column.align) {
              thStyle.textAlign = column.align;
            }
            if (column.fixed) {
              return (
                <th
                  key={column.key || column.dataIndex?.toString() || index}
                  className={column.className}
                  style={thStyle}
                  colSpan={column.colSpan}
                  {...headerCellProps}
                >
                  {column.title}
                </th>
              );
            }

            return (
              <td
                key={column.key || column.dataIndex?.toString() || index}
                className={column.className}
                style={thStyle}
                colSpan={column.colSpan}
                {...headerCellProps}
              >
                {column.title}
              </td>
            );
          })}
        </tr>
      </thead>
    );
  };

  const renderBody = () => {
    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="py-4 text-center">
              {locale.loadingText}
            </td>
          </tr>
        </tbody>
      );
    }

    if (dataSource.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="py-4 text-center">
              {locale.emptyText}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {dataSource.map((record, rowIndex) => {
          const rowProps = onRow ? onRow(record, rowIndex) : {};
          const key = getRowKey(record, rowIndex);

          return (
            <tr
              key={key}
              {...rowProps}
              className={clsx(
                rowProps.className,
                highlightRow === true && 'hover:bg-base-300',
                isString(highlightRow) && highlightRow,
              )}
            >
              {columns.map((column, colIndex) => {
                const cellProps = column.onCell
                  ? column.onCell(record, rowIndex)
                  : {};

                const tdStyle: React.CSSProperties = {};
                if (column.align) {
                  tdStyle.textAlign = column.align;
                }
                if (column.fixed) {
                  return (
                    <th
                      key={
                        column.key || column.dataIndex?.toString() || colIndex
                      }
                      className={column.className}
                      style={{ ...tdStyle, ...cellProps.style }}
                      colSpan={column.colSpan}
                      {...cellProps}
                    >
                      {renderCell(record, column, rowIndex)}
                    </th>
                  );
                }
                return (
                  <td
                    key={column.key || column.dataIndex?.toString() || colIndex}
                    className={column.className}
                    style={{ ...tdStyle, ...cellProps.style }}
                    colSpan={column.colSpan}
                    {...cellProps}
                  >
                    {renderCell(record, column, rowIndex)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  const renderPagination = () => {
    if (!pagination) return null;

    // Simplified pagination implementation
    // You would want to replace this with a proper pagination component
    return (
      <div className="mt-4 flex justify-end">
        <button
          className="btn btn-sm"
          disabled={pagination.current === 1}
          onClick={() =>
            pagination.onChange &&
            pagination.onChange(
              (pagination.current || 1) - 1,
              pagination.pageSize || 10,
            )
          }
        >
          Previous
        </button>
        <span className="mx-2">
          Page {pagination.current} of{' '}
          {Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))}
        </span>
        <button
          className="btn btn-sm"
          disabled={
            (pagination.current || 1) >=
            Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))
          }
          onClick={() =>
            pagination.onChange &&
            pagination.onChange(
              (pagination.current || 1) + 1,
              pagination.pageSize || 10,
            )
          }
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
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
          {renderHeader()}
          {renderBody()}
        </table>
      </div>
      {renderPagination()}
    </div>
  );
}

export default Table;
