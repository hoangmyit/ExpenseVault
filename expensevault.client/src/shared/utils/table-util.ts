import { ISelectOption } from '../types/ui';

import { mapArray } from './array-util';
import { getLangText } from './language-util';

export const getTableColumnsOptions = <T>(
  acceptColumns: Array<keyof T>,
  labelPattern: string,
): ISelectOption<T>[] =>
  mapArray(acceptColumns, (column: keyof T) => {
    return {
      label: getLangText(`${labelPattern}.${column as string}`),
      value: column,
      disabled: false,
    };
  });
