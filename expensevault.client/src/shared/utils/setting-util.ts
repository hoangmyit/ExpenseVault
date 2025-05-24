import {
  DEFAULT_NUM_OF_ITEM_PER_PAGE,
  NUM_OF_ITEM_PER_PAGE_KEY,
} from '../constants/variable.const';

import { getLocalStorageItem } from './common-util';

export const getItemPerPage = () => {
  const itemPerPage = getLocalStorageItem(NUM_OF_ITEM_PER_PAGE_KEY);
  if (itemPerPage) {
    return parseInt(itemPerPage, 10);
  }
  return DEFAULT_NUM_OF_ITEM_PER_PAGE;
};
