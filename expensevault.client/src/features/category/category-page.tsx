import { ChangeEvent, FC, useEffect } from 'react';
import { useParams } from 'react-router';

import FormCheckbox from '../../shared/components/form/form-checkbox/form-checkbox';
import FormInput from '../../shared/components/form/form-input/form-input';
import { CategoryDto } from '../../shared/types/common/backend-model';

import { useCategory } from './hooks/use-category';

const CategoryPage: FC = () => {
  // Extract the id parameter from the URL
  const { id } = useParams<{ id: string }>();

  const { category, getCategory, updateCategory } = useCategory();

  useEffect(() => {
    if (id) {
      getCategory(id);
    }
  }, [getCategory, id]);

  if (category === null) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: keyof CategoryDto,
  ) => {
    updateCategory({
      ...category,
      [fieldChange]:
        fieldChange === 'isDefault' ? e.target.checked : e.target.value,
    });
  };

  return (
    <div>
      <h1>Category Details</h1>
      <p>Category ID: {id}</p>
      <FormInput
        label="name"
        value={category.name}
        placeholder="Please input category name"
        onChange={(e) => handleInputChange(e, 'name')}
      />
      <FormInput
        label="description"
        value={category.description}
        placeholder="Please input category description"
        onChange={(e) => handleInputChange(e, 'description')}
      />
      <FormInput
        label="avatar"
        value={category.avatar}
        placeholder="Please input category avatar"
        onChange={(e) => handleInputChange(e, 'avatar')}
      />
      <FormCheckbox
        label="default"
        checked={category.isDefault}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e, 'isDefault')
        }
      />
    </div>
  );
};

export default CategoryPage;
