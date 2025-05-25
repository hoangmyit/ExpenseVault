import { TableOnSearchHandler } from '../ui';

export type PaginatedList<T> = {
  items: T[];
} & BasePaginatedData;

export type BasePaginatedData = {
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginatedData<T> = {
  onChange: TableOnSearchHandler<T>;
  pageSize: number;
} & BasePaginatedData;
