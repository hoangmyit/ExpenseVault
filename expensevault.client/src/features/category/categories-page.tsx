import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { ConsoleLog } from '../../shared/utils/common-util';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import {
  CategoriesState,
  deleteCategoryRequest,
  getCategoriesRequest,
} from './store/category-slice';

const CategoriesPage: FC = () => {
  const { data: categories } = useAppSelector(CategoriesState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategoriesRequest({ page: 1, pageSize: 10 }));
  }, []);

  const handleEdit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      ConsoleLog('Edit category', id);
      navigate('/category/' + id);
      event.preventDefault();
    },
    [],
  );

  const handleDelete = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      ConsoleLog('Delete category', id);
      dispatch(deleteCategoryRequest(id));
      event.preventDefault();
    },
    [],
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
                  <label>
                    <input type="checkbox" className="checkbox" />
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
