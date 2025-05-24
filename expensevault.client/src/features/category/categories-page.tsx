import React, { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { consoleLog } from '../../shared/utils/common-util';

import {
  CATEGORY_TABLE_FILTER_COLUMN,
  CATEGORY_TABLE_ORDER_COLUMN,
} from './constants/category.const';
import { useCategory } from './hooks/use-category';

import FeatureTitle from '@/shared/components/feature-title';
import Table from '@/shared/components/ui/table/table';
import { SearchState } from '@/shared/types/common';
import { CategoryDto } from '@/shared/types/common/backend-model';
import { ColumnType } from '@/shared/types/ui';
import { getTableColumnsOptions } from '@/shared/utils/table-util';

const CategoriesPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    categories,
    getCategories,
    deleteCategory,
    searchParams,
    categoriesStatus,
  } = useCategory();

  useEffect(() => {
    handleOnSearch(searchParams);
  }, []);

  const handleEdit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      consoleLog('Edit category', id);
      navigate('/category/' + id);
      event.preventDefault();
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      consoleLog('Delete category', id);
      deleteCategory(id);
      event.preventDefault();
    },
    [deleteCategory],
  );

  const handleOnSearch = useCallback(
    (params: Partial<SearchState<CategoryDto>>) => {
      consoleLog('Search categories', params);
      getCategories(params);
    },
    [],
  );
  if (categories === null) {
    return null;
  }

  const handleAddNewCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/category/new');
  };

  const columns: ColumnType<CategoryDto>[] = [
    // {
    //   title: (
    //     <label title="Select category">
    //       <input type="checkbox" className="checkbox" />
    //       <span className="sr-only">Select category</span>
    //     </label>
    //   ),
    //   width: 50,
    //   render: () => (
    //     <label>
    //       <input type="checkbox" className="checkbox" />
    //     </label>
    //   ),
    //   fixed: true,
    // },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'text-left',
      fixed: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: 'text-left',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      className: 'text-center',
      render: (value) => (
        <div className="avatar">
          <div className="mask mask-squircle h-12 w-12">
            <img src={value} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
      ),
    },
    {
      title: 'Is Default',
      dataIndex: 'isDefault',
      key: 'isDefault',
      className: 'text-left',
      render: (value) => (
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={value}
            readOnly
          />
        </label>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 180,
      className: 'whitespace-nowrap',
      render: (_, record) => (
        <>
          <button
            className="btn btn-sm btn-outline btn-primary mr-2"
            onClick={(e) => handleEdit(e, record.id)}
            type="button"
          >
            Edit
          </button>
          <button
            className="btn btn-sm btn-outline btn-error"
            onClick={(e) => handleDelete(e, record.id)}
            type="button"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="bg-base-100 mx-2">
      <FeatureTitle
        title={t('category:title.view')}
        addActionName={t('category:title.add')}
        addNewAction={handleAddNewCategory}
      />
      <div className="h-max-[40vh] flex flex-col">
        <Table<CategoryDto>
          dataSource={categories.items}
          columns={columns}
          rowKey="id"
          locale={{
            emptyText: 'No categories found',
            loadingText: 'Loading categories...',
          }}
          pinRow={true}
          pinColumn={true}
          zebra={true}
          highlightRow={true}
          pagination={{
            ...categories,
            pageSize: searchParams.pageSize!,
            onChange: handleOnSearch,
          }}
          loading={categoriesStatus === 'loading'}
          searchData={{
            sortValue: searchParams.sortBy,
            filterValue: searchParams.filterBy,
            isAsc: searchParams.isAsc,
            onSearch: handleOnSearch,
            sortOptions: getTableColumnsOptions(
              CATEGORY_TABLE_ORDER_COLUMN,
              'category:tableHeader',
            ),
            filterOptions: getTableColumnsOptions(
              CATEGORY_TABLE_FILTER_COLUMN,
              'category:tableHeader',
            ),
            disabled: categoriesStatus === 'loading',
          }}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
