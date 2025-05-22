import { FC } from 'react';

import { useTranslation } from 'node_modules/react-i18next';

import {
  DEFAULT_NUM_OF_ITEM_PER_PAGE_OPTIONS,
  DEFAULT_SHOW_PAGE_NUM,
} from '@/shared/constants/variable.const';
import { PaginatedData } from '@/shared/types/common';
import { mapArray } from '@/shared/utils/array-util';

const TablePagination: FC<PaginatedData> = ({
  pageIndex = 1,
  totalPages = 1,
  totalCount = 0,
  hasPreviousPage = false,
  hasNextPage = false,
  onChange,
  pageSize = 10,
}) => {
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

  const handlePageChange = (page: number) => {
    if (page !== pageIndex) {
      onChange(page, pageSize);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between gap-2 p-4 md:flex-row">
      <div className="flex items-center text-sm">
        <div className="flex-none">{t('table:rowPerPage')}</div>
        <select
          className="select select-bordered ml-2"
          value={pageSize}
          onChange={(e) => onChange?.(pageIndex, +e.target.value)}
        >
          {mapArray(DEFAULT_NUM_OF_ITEM_PER_PAGE_OPTIONS, (value) => (
            <option value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div className="hidden text-sm md:block">
        {`${t('table:showing')} ${pageSize * (pageIndex - 1) + 1} ${t('table:to')} ${
          pageSize * pageIndex > totalCount ? totalCount : pageSize * pageIndex
        } ${t('table:of')} ${totalCount} ${t('table:entries')}`}
      </div>
      <div className="join ml-4 flex">
        <button
          className="btn btn-outline join-item btn-sm"
          disabled={!hasPreviousPage}
        >
          {t('table:previous')}
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
          {t('table:next')}
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
