import { ReactElement } from 'react';

import { TableHeaderProps } from '@/shared/types/ui';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableHeader = <T extends Record<string, any>>({
  columns,
}: TableHeaderProps<T>): ReactElement => {
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

export default TableHeader;
