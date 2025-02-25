export interface PaginatedList<T> {
  data: T[];
  pageIndex: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
