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

  const {
    categoryDetail,
    getCategoryDetail,
    updateCategory,
    initCategoryDetail,
  } = useCategory();

  useEffect(() => {
    if (!isNullOrUndefined(id)) {
      if (id === 'new') {
        initCategoryDetail();
      } else {
        getCategoryDetail(id!);
      }
    }
  }, [getCategoryDetail, id, initCategoryDetail]);

  if (categoryDetail === null) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: keyof CategoryDto,
  ) => {
    updateCategory({
      ...categoryDetail,
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
        value={getLangFieldText(categoryDetail.name)}
        placeholder="Please input category name"
        onChange={(e) => handleInputChange(e, 'name')}
      />
      <FormInput
        label="description"
        value={getLangFieldText(categoryDetail.description)}
        placeholder="Please input category description"
        onChange={(e) => handleInputChange(e, 'description')}
      />
      <FormInput
        label="avatar"
        value={categoryDetail.avatar}
        placeholder="Please input category avatar"
        onChange={(e) => handleInputChange(e, 'avatar')}
      />
      <FormCheckbox
        label="default"
        checked={categoryDetail.isDefault}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e, 'isDefault')
        }
      />
    </div>
  );
};

export default CategoryDetailPage;
