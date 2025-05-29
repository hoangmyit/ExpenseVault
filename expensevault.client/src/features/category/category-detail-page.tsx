import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import FormCheckbox from '../../shared/components/form/form-checkbox/form-checkbox';
import { useCategoryGroup } from '../category-group/hooks/use-category-group';

import { useCategory } from './hooks/use-category';
import { CategoryFormData, categorySchema } from './schemas/category-schema';

import FeaturePageHeader from '@/shared/components/feature-title';
import FormSelect from '@/shared/components/form/form-select/form-select';
import ImageUploadPreviewControl from '@/shared/components/ui/image-upload-preview-control';
import SupportLanguageControl from '@/shared/components/ui/support-language-control';
import { useZodForm } from '@/shared/hooks/use-zod-form';
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

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useZodForm(categorySchema);

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

  // Watch form values to sync with categoryDetail
  const formData = watch();

  useEffect(() => {
    if (categoryDetail) {
      setValue('name', categoryDetail.name);
      setValue('description', categoryDetail.description);
      setValue('groupId', categoryDetail.groupId);
      setValue('isDefault', categoryDetail.isDefault);
      if (categoryDetail.avatar) {
        setValue('avatar', categoryDetail.avatar);
      }
    }
  }, [categoryDetail, setValue]);

  if (categoryDetail === null) {
    return null;
  }

  const handleImageChange = (file: File | null) => {
    setCategoryImage(file);
    // You can also update the category detail here if needed
    // updateCategory({ ...categoryDetail, image: file });
  };

  const handleLanguageFieldChange = (
    value: SupportLanguageField,
    fieldChange: keyof CategoryDto,
  ) => {
    setCategoryDetail({
      [fieldChange]: value,
    });
    setValue(fieldChange as keyof CategoryFormData, value);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    fieldChange: keyof CategoryFormData,
  ) => {
    const numValue = parseNumber(e.target.value);
    setCategoryDetail({
      [fieldChange]: numValue,
    });
    register(fieldChange).onChange(e);
    setValue(fieldChange, numValue);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: keyof CategoryFormData,
  ) => {
    const boolValue = e.target.checked;
    setCategoryDetail({
      [fieldChange]: boolValue,
    });
    setValue(fieldChange, boolValue);
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const categoryData = {
        ...categoryDetail,
        ...data,
      };

      if (isNewCategory) {
        await createCategory(categoryData);
      } else {
        await updateCategory(categoryData);
      }
    } catch (error) {
      // Handle server errors by setting form errors
      console.error('Form submission error:', error);
    }
  };

  const categoryGroupOptions = !isNullOrEmptyArray(categoryGroupData)
    ? mapArray(categoryGroupData!, (group) => ({
        label: getLangFieldText(group.name),
        value: group.id,
        disabled: false,
      }))
    : [];

  return (
    <div className="p-8">
      <FeaturePageHeader
        title={t('category:categoryDetails')}
        showAction={true}
        addActionName={t(
          `category:${isNewCategory ? 'create' : 'update'}Category`,
        )}
        addNewAction={handleSubmit(onSubmit)}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex w-full flex-row gap-4">
          <div className="flex w-1/2 flex-col">
            <SupportLanguageControl
              label={t('category:tableHeader.name')}
              value={categoryDetail.name}
              placeholderPattern={'category:tableHeader.namePlaceholder'}
              onChange={(value) => handleLanguageFieldChange(value, 'name')}
              zodError={errors.name}
            />
            <SupportLanguageControl
              label={t('category:tableHeader.description')}
              value={categoryDetail.description}
              placeholderPattern={'category:tableHeader.descriptionPlaceholder'}
              onChange={(value) =>
                handleLanguageFieldChange(value, 'description')
              }
              zodError={errors.description}
            />
            <FormSelect
              label={t('category:tableHeader.groupName')}
              value={categoryDetail.groupId}
              placeholder={t('category:tableHeader.groupNamePlaceholder')}
              defaultValue={'default-placeholder'}
              onChange={(e) => handleSelectChange(e, 'groupId')}
              options={categoryGroupOptions}
              title="Select Category Group"
              error={errors.groupId}
              name={register('groupId').name}
              ref={register('groupId').ref}
            />
            <FormCheckbox
              label={t('category:tableHeader.isDefault')}
              checked={categoryDetail.isDefault}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange(e, 'isDefault')
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
      </form>
    </div>
  );
};

export default CategoryDetailPage;
