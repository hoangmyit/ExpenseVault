import { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { CategoryState, getCategoryRequest, setCategory } from './store/category-slice';
import FormInput from '../../components/form-input/form-input';
import FormCheckbox from '../../components/form-checkbox/form-checkbox';
import { ICategoryDto } from '../../model/category/category';

const CategoryPage: FC = () => {
  // Extract the id parameter from the URL
  const { id } = useParams<{ id: string }>();
  const { data: category } = useAppSelector(CategoryState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(getCategoryRequest(id));
  }, [id]);


  if (category === null) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldChange: keyof ICategoryDto) => {
    dispatch(
      setCategory({
        ...category,
        [fieldChange]: e.target.value,
      }),
    );
  };
  return <div>
    <h1>Category Details</h1>
    <p>Category ID: {id}</p>
    <FormInput
      label='name'
      value={category.name}
      placeholder='Please input category name'
      onChange={(e) => handleInputChange(e, 'name')}
    />
    <FormInput
      label='description'
      value={category.description}
      placeholder='Please input category description'
      onChange={(e) => handleInputChange(e, 'description')}
    />
    <FormInput
      label='avatar'
      value={category.avatar}
      placeholder='Please input category avatar'
      onChange={(e) => handleInputChange(e, 'avatar')}
    />
    <FormCheckbox
      label='default'
      checked={category.isDefault}
      onChange={(e) => handleInputChange(e, 'isDefault')}
    />
  </div>;
};

export default CategoryPage;
