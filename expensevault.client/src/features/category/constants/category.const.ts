import { CategoryDto } from '@/shared/types/backend/category';

export const CATEGORY_TABLE_ORDER_COLUMN: (keyof CategoryDto)[] = [
  'id',
  'name',
  'description',
];

export const CATEGORY_TABLE_FILTER_COLUMN: (keyof CategoryDto)[] = [
  'name',
  'description',
];
