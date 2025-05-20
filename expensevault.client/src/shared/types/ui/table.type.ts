import { Key, ReactNode } from 'react';

import { PaginatedData, sizeType } from '../common';

export interface ColumnType<T> {
  title: ReactNode;
  dataIndex?: keyof T;
  key?: Key;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, record: T, index: number) => ReactNode;
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
  pagination: PaginatedData;
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

export interface TableBodyProps<T> {
  loading?: boolean;
  dataSource: T[];
  columns: ColumnType<T>[];
  locale: {
    loadingText: ReactNode;
    emptyText: ReactNode;
  };
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLElement>;
  highlightRow?: boolean | string;
  rowKey: keyof T | ((record: T) => Key);
}

export interface TableHeaderProps<T> {
  columns: ColumnType<T>[];
}
