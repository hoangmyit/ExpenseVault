import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { consoleLog } from '../../shared/utils/common-util';

import { useCategory } from './hooks/use-category';

import Table from '@/shared/components/ui/table/table';
import { CategoryDto } from '@/shared/types/common/backend-model';
import { ColumnType } from '@/shared/types/ui';

const CategoriesPage: FC = () => {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState<number>(10);
  const { categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => {
    getCategories({ page: 1, pageSize: pageSize });
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

  if (categories === null) {
    return null;
  }

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
      className: 'text-left',
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
      <div className="flex flex-col items-center p-4">
        <h1 className="mb-4 text-xl font-bold">Categories</h1>
        {categories.items.length === 0 && <p>No categories found.</p>}
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate('/category/new')}
        >
          Create Category
        </button>
      </div>
      <div>
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
            pageSize,
            onChange(page, pageSize) {
              setPageSize(pageSize);
              getCategories({ page, pageSize });
              consoleLog('Page changed', page, pageSize);
            },
          }}
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
