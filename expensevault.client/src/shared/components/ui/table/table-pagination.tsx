import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DEFAULT_NUM_OF_ITEM_PER_PAGE_OPTIONS,
  DEFAULT_SHOW_PAGE_NUM,
} from '@/shared/constants/variable.const';
import { PaginatedData } from '@/shared/types/common';
import { mapArray } from '@/shared/utils/array-util';
import { isNullOrUndefined } from '@/shared/utils/type-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TablePagination = <T extends Record<string, any>>({
  pageIndex = 1,
  totalPages = 1,
  totalCount = 0,
  hasPreviousPage = false,
  hasNextPage = false,
  onChange,
  pageSize = 10,
  disabled = false,
}: PaginatedData<T> & { disabled: boolean }): ReactElement => {
  const { t } = useTranslation();
  let startPage = Math.max(
    1,
    pageIndex - Math.floor(DEFAULT_SHOW_PAGE_NUM / 2),
  );
  let endPage = startPage + DEFAULT_SHOW_PAGE_NUM - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - DEFAULT_SHOW_PAGE_NUM + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const handlePageChange = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.ChangeEvent<HTMLSelectElement>,
    page: number,
    size?: number,
  ) => {
    event.preventDefault();
    if (page !== pageIndex || pageSize !== size) {
      onChange?.({
        pageIndex: page,
        pageSize: isNullOrUndefined(size) ? pageSize : size,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 p-4 md:flex-row">
      <div className="flex items-center text-sm">
        <div className="flex-none">{t('table:rowPerPage')}</div>
        <select
          className="select select-bordered ml-2"
          value={pageSize}
          onChange={(e) => handlePageChange(e, pageIndex, +e.target.value)}
          disabled={disabled}
        >
          {mapArray(DEFAULT_NUM_OF_ITEM_PER_PAGE_OPTIONS, (value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden text-sm md:block">
        {`${t('table:showing')} ${totalCount > 0 ? pageSize * (pageIndex - 1) + 1 : 0} ${t('table:to')} ${
          pageSize * pageIndex > totalCount ? totalCount : pageSize * pageIndex
        } ${t('table:of')} ${totalCount} ${t('table:entries')}`}
      </div>
      <div className="join ml-4 flex">
        <button
          className="btn btn-outline join-item btn-sm"
          disabled={!hasPreviousPage || disabled}
        >
          {t('table:previous')}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`join-item btn btn-sm ${page === pageIndex ? 'btn-primary' : ''}`}
            onClick={(e) => handlePageChange(e, page)}
            disabled={disabled}
            type="button"
          >
            {page}
          </button>
        ))}
        <button
          className="btn btn-outline join-item btn-sm"
          disabled={!hasNextPage || disabled}
          type="button"
          onClick={(e) => handlePageChange(e, pageIndex + 1)}
        >
          {t('table:next')}
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
