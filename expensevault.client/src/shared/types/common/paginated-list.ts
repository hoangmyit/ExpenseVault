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

export type PaginatedData = {
  onChange: (page: number, pageSize: number) => void;
  pageSize: number;
} & BasePaginatedData;
