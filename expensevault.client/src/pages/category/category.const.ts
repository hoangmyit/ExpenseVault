import { ICategoryDto } from '../../model/category/category';
import { CommonState } from '../../model/common/common';
import { PaginatedList } from '../../model/common/paginated-list';

export interface ICategoryState {
  categories: CommonState<PaginatedList<ICategoryDto>>;
  category: CommonState<ICategoryDto>;
}
