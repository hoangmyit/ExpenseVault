export type StateStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type CommonState<T> = {
  data: T | null;
  status: StateStatus;
  error: string | null;
};

export type ValidationState<T> = {
  errors: ValidationErrors<T>;
} & CommonState<T>;

export type ValidationErrors<T> = {
  [key in keyof T]?: string[];
};

export type SearchState<T> = {
  filterBy: keyof T;
  sortBy: keyof T;
  isAsc: boolean;
  pageIndex?: number;
  pageSize?: number;
  search?: string;
};

export type ApiResult<T> = {
  data: T;
  isSuccess: boolean;
  status: number;
  message?: string;
  messageKey?: string;
};

export type sizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const SupportLanguages = ['en', 'vi'] as const;

export type SupportLanguageType = (typeof SupportLanguages)[number];

export type SupportLanguageField = Record<SupportLanguageType, string>;

export const enum TransactionTypeEnum {
  Income = 1,
  Expense = 2,
  Transfer = 3,
  Loan = 4,
}
