import { CategoryDto } from '@/shared/types/common/backend-model';

export const CATEGORY_TABLE_ORDER_COLUMN: (keyof CategoryDto)[] = [
  'id',
  'name',
  'description',
];

export const CATEGORY_TABLE_FILTER_COLUMN: (keyof CategoryDto)[] = [
  'name',
  'description',
];
