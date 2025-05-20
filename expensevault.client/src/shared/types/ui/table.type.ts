import { Key, ReactNode } from 'react';

import { sizeType } from '../common';

export interface ColumnType<T> {
  title: ReactNode;
  dataIndex?: keyof T;
  key?: Key;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  render?: (value: never, record: T, index: number) => ReactNode;
  colSpan?: number;
  align?: 'left' | 'center' | 'right';
  fixed?: boolean;
  onCell?: (record: T, rowIndex: number) => React.HTMLAttributes<HTMLElement>;
  onHeaderCell?: () => React.HTMLAttributes<HTMLElement>;
}

export interface TableProps<T> {
  dataSource: T[];
  columns: ColumnType<T>[];
  rowKey?: keyof T | ((record: T) => Key);
  loading?: boolean;
  pagination?:
    | {
        current?: number;
        pageSize?: number;
        total?: number;
        onChange?: (page: number, pageSize: number) => void;
      }
    | false;
  bordered?: boolean;
  size?: sizeType;
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLElement>;
  className?: string;
  tableLayout?: 'auto' | 'fixed';
  locale?: {
    emptyText: ReactNode;
    loadingText: ReactNode;
  };
  showHeader?: boolean;
  zebra?: boolean;
  pinRow?: boolean;
  pinColumn?: boolean;
  highlightRow?: boolean | string;
}
