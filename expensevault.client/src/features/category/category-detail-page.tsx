import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import FormCheckbox from '../../shared/components/form/form-checkbox/form-checkbox';
import FormInput from '../../shared/components/form/form-input/form-input';
import { useCategoryGroup } from '../category-group/hooks/use-category-group';

import { useCategory } from './hooks/use-category';

import FeaturePageHeader from '@/shared/components/feature-title';
import FormSelect from '@/shared/components/form/form-select/form-select';
import ImageUploadPreviewControl from '@/shared/components/ui/image-upload-preview-control';
import SupportLanguageControl from '@/shared/components/ui/support-language-control';
import { CategoryDto } from '@/shared/types/backend/category';
import { SupportLanguageField } from '@/shared/types/common';
import { isNullOrEmptyArray, mapArray } from '@/shared/utils/array-util';
import { getLangFieldText } from '@/shared/utils/language-util';
import { isNullOrUndefined, parseNumber } from '@/shared/utils/type-utils';

const CategoryDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNewCategory = id === 'new';
  const { t } = useTranslation();
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const {
    categoryDetail,
    getCategoryDetail,
    updateCategory,
    initCategoryDetail,
    setCategoryDetail,
    createCategory,
  } = useCategory();
  const { getCategoryGroup, categoryGroupData } = useCategoryGroup();

  useEffect(() => {
    if (!isNullOrUndefined(id)) {
      if (id === 'new') {
        initCategoryDetail();
      } else {
        getCategoryDetail(id!);
      }
    }
  }, [getCategoryDetail, id, initCategoryDetail]);

  useEffect(() => {
    if (isNullOrEmptyArray(categoryGroupData)) {
      getCategoryGroup();
    }
  }, []);

  if (categoryDetail === null) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: keyof CategoryDto,
  ) => {
    setCategoryDetail({
      [fieldChange]:
        fieldChange === 'isDefault' ? e.target.checked : e.target.value,
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldChange: keyof CategoryDto,
  ) => {
    setCategoryDetail({
      [fieldChange]: parseNumber(e.target.value),
    });
  };

  const categoryGroupOptions = !isNullOrEmptyArray(categoryGroupData)
    ? mapArray(categoryGroupData!, (group) => ({
        label: getLangFieldText(group.name),
        value: group.id,
        disabled: false,
      }))
    : [];

  const handleImageChange = (file: File | null) => {
    setCategoryImage(file);
    // You can also update the category detail here if needed
    // updateCategory({ ...categoryDetail, image: file });
  };

  const handleUpdateCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isNewCategory) {
      createCategory(categoryDetail);
    } else {
      updateCategory(categoryDetail);
    }
  };

  const handleLanguageFieldChange = (
    value: SupportLanguageField,
    fieldChange: keyof CategoryDto,
  ) => {
    setCategoryDetail({
      [fieldChange]: value,
    });
  };

  return (
    <div className="p-8">
      <FeaturePageHeader
        title={t('category:categoryDetails')}
        showAction={true}
        addActionName={t(
          `category:${isNewCategory ? 'create' : 'update'}Category`,
        )}
        addNewAction={handleUpdateCategory}
      />
      <div className="flex w-full flex-row gap-4">
        <div className="flex w-1/2 flex-col">
          <SupportLanguageControl
            label={t('category:tableHeader.name')}
            value={categoryDetail.name}
            placeholderPattern={'category:tableHeader.namePlaceholder'}
            onChange={(value) => handleLanguageFieldChange(value, 'name')}
          />
          <SupportLanguageControl
            label={t('category:tableHeader.description')}
            value={categoryDetail.description}
            placeholderPattern={'category:tableHeader.descriptionPlaceholder'}
            onChange={(value) =>
              handleLanguageFieldChange(value, 'description')
            }
          />
          <FormSelect
            label={t('category:tableHeader.groupName')}
            value={categoryDetail.groupId}
            placeholder={t('category:tableHeader.groupNamePlaceholder')}
            defaultValue={'default-placeholder'}
            onChange={(e) => handleSelectChange(e, 'groupId')}
            options={categoryGroupOptions}
            title="Select Category Group"
          />
          <FormCheckbox
            label={t('category:tableHeader.isDefault')}
            checked={categoryDetail.isDefault}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, 'isDefault')
            }
          />
        </div>
        <div>
          <ImageUploadPreviewControl
            label="Category Image"
            onChange={handleImageChange}
            placeholder="No category image selected"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
