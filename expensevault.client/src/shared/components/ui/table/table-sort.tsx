import { useState } from 'react';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';

import { SearchIcon } from '@/icons';
import { TableSortProps } from '@/shared/types/ui';
import { mapArray } from '@/shared/utils/array-util';
import { isNullOrEmpty } from '@/shared/utils/type-utils';

const TableSort = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
>({
  sortValue,
  filterValue,
  isAsc,
  sortOptions,
  filterOptions,
  onSearch,
}: TableSortProps<T>): ReactElement => {
  const { t } = useTranslation();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [filterField, setFilterField] = useState<keyof T>(filterValue);
  const [sortField, setSortField] = useState<keyof T>(sortValue);
  const [sortOrder, setSortOrder] = useState<boolean>(isAsc);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSearch(event, searchKeyword, filterField, sortField, sortOrder);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterField(event.target.value);
  };

  const handleSortFieldChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortField(event.target.value);
  };
  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSortOrder(event.target.value === 'true');
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSearch(event, searchKeyword, filterField, sortField, sortOrder);
  };
  return (
    <div className="flex flex-col justify-between gap-2 p-4 text-sm md:flex-row md:items-center">
      <div className="flex w-full items-center sm:w-auto">
        <span className="flex-none font-medium">{t('table:sortBy')}</span>
        <div className="tooltip ml-2 flex-grow" data-tip={t('table:sortField')}>
          <select
            className="select select-bordered flex-grow"
            aria-label="Sort Field"
            onChange={handleSortFieldChange}
          >
            {mapArray(sortOptions, (option, inx) => (
              <option
                key={inx}
                value={option.value as string}
                selected={sortField === option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tooltip ml-2" data-tip={t('table:sortOrder')}>
          <select
            className="select select-bordered"
            aria-label="Sort Order"
            onChange={handleSortOrderChange}
          >
            <option key="asc" value="true" selected={sortOrder === true}>
              {t('table:sortAsc')}
            </option>
            <option key="desc" value="false">
              {t('table:sortDesc')}
            </option>
          </select>
        </div>
      </div>
      <div className="flex w-full items-center sm:w-auto">
        <div className="join">
          <label
            className={clsx(
              'input join-item w-1/2',
              !isNullOrEmpty(searchKeyword) && 'tooltip',
            )}
            data-tip={searchKeyword}
          >
            <SearchIcon className="h-[1em] opacity-50" />
            <input
              type="search"
              className="grow"
              placeholder={t('table:searchPlaceholder')}
              onInput={handleSearchChange}
              onKeyDown={handleKeyDown}
              value={searchKeyword}
            />
            <kbd className="kbd kbd-sm">⌘</kbd>
          </label>
          <div className="tooltip join-item w-1/4" data-tip={filterField}>
            <select
              className="select"
              aria-label="Filter"
              onChange={handleFilterChange}
            >
              <option disabled>{t('table:filter')}</option>
              {mapArray(filterOptions, (option, inx) => (
                <option
                  key={inx}
                  value={option.value as string}
                  selected={filterField === option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="indicator">
            <button className="btn join-item btn-accent" onClick={handleSearch}>
              {t('table:search')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSort;
