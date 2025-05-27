import { ChangeEvent, FC, useEffect } from 'react';
import { useParams } from 'react-router';

import FormCheckbox from '../../shared/components/form/form-checkbox/form-checkbox';
import FormInput from '../../shared/components/form/form-input/form-input';

import { useCategory } from './hooks/use-category';

import { CategoryDto } from '@/shared/types/backend/category';
import { getLangFieldText } from '@/shared/utils/language-util';
import { isNullOrUndefined } from '@/shared/utils/type-utils';

const CategoryDetailPage: FC = () => {
  // Extract the id parameter from the URL
  const { id } = useParams<{ id: string }>();

  const { category, getCategory, updateCategory } = useCategory();

  useEffect(() => {
    if (!isNullOrUndefined(id) && id !== 'new') {
      getCategory(id!);
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
        value={getLangFieldText(category.name)}
        placeholder="Please input category name"
        onChange={(e) => handleInputChange(e, 'name')}
      />
      <FormInput
        label="description"
        value={getLangFieldText(category.description)}
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

export default CategoryDetailPage;
