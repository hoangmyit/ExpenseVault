import { Key, ReactElement } from 'react';

import clsx from 'clsx';

import { InfoCircleIcon } from '@/icons';
import { ColumnType, TableBodyProps } from '@/shared/types/ui';
import { isString } from '@/shared/utils/type-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableBody = <T extends Record<string, any>>({
  loading,
  dataSource,
  columns,
  locale,
  onRow,
  rowKey,
  highlightRow,
}: TableBodyProps<T>): ReactElement => {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="py-4 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="loading loading-infinity loading-md" />
              {locale.loadingText}
            </div>
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
            <div className="flex flex-col items-center justify-center gap-2">
              <InfoCircleIcon className="h-32 w-32" />
              {locale.emptyText}
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

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
      return column.render(value, record, rowIndex);
    }

    return (
      <div className="tooltip bg-color-ini" data-tip={value}>
        <div className="line-clamp-3">{value}</div>
      </div>
    );
  };

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
            style={{
              ...rowProps.style,
              height: '60px',
            }}
          >
            {columns.map((column, colIndex) => {
              const cellProps = column.onCell
                ? column.onCell(record, rowIndex)
                : {};

              const tdStyle: React.CSSProperties = {};
              if (column.align) {
                tdStyle.textAlign = column.align;
              }
              return (
                <td
                  key={column.key || column.dataIndex?.toString() || colIndex}
                  className={clsx(column.className, column.fixed && 'sticky')}
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

export default TableBody;
