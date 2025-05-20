import { FC } from 'react';

import { PaginatedData } from '@/shared/types/common';

const TablePagination: FC<PaginatedData> = ({
  pageIndex = 1,
  totalPages = 1,
  totalCount = 0,
  hasPreviousPage = false,
  hasNextPage = false,
  onChange,
  pageSize = 10,
}) => {
  // Calculate which page buttons to show
  const showPageNumbers = 5; // Number of page buttons to show
  let startPage = Math.max(1, pageIndex - Math.floor(showPageNumbers / 2));
  let endPage = startPage + showPageNumbers - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - showPageNumbers + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handlePageChange = (page: number) => {
    if (page !== pageIndex) {
      onChange(page, pageSize);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 p-4 md:flex-row">
      <div className="flex items-center">
        <span className="text-sm text-gray-700">Rows per page:</span>
        <select
          className="ml-2 rounded-md border p-1 text-sm"
          value={pageSize}
          onChange={(e) => onChange?.(pageIndex, +e.target.value)}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="hidden text-sm text-gray-700 md:block">
        Showing {pageSize * (pageIndex - 1) + 1} to{' '}
        {pageSize * pageIndex > totalCount ? totalCount : pageSize * pageIndex}{' '}
        of {totalCount} entries
      </div>
      <div className="join ml-4 flex">
        <button
          className="btn btn-outline join-item btn-sm"
          disabled={!hasPreviousPage}
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`join-item btn btn-sm ${page === pageIndex ? 'btn-primary' : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="btn btn-outline join-item btn-sm"
          disabled={!hasNextPage}
          type="button"
          onClick={() => {
            if (onChange) {
              onChange(pageIndex + 1, pageSize);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
