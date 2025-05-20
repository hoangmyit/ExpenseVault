import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { consoleLog } from '../../shared/utils/common-util';

import { useCategory } from './hooks/use-category';

const CategoriesPage: FC = () => {
  const navigate = useNavigate();

  const { categories, getCategories, deleteCategory } = useCategory();

  useEffect(() => {
    getCategories({ page: 1, pageSize: 10 });
  }, [getCategories]);

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

  return (
    <div>
      <div className="flex flex-col items-center p-4">
        <h1 className="mb-4 text-xl font-bold">Categories</h1>
        <p>No categories found.</p>
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate('/category/new')}
        >
          Create Category
        </button>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>
                  <label title="Select category">
                    <input type="checkbox" className="checkbox" />
                    <span className="sr-only">Select category</span>
                  </label>
                </th>
                <th className="text-left">Name</th>
                <th className="text-left">Description</th>
                <th className="text-left">Avatar</th>
                <th className="text-left">Is Default</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.items.map((category) => (
                <tr key={category.id}>
                  <td>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.avatar}</td>
                  <td>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={(e) => handleEdit(e, category.id)}
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={(e) => handleDelete(e, category.id)}
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
