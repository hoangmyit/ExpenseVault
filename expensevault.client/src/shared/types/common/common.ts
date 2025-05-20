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

export type ApiResult<T> = {
  data: T;
  isSuccess: boolean;
  status: number;
  message?: string;
  messageKey?: string;
};

export type sizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
