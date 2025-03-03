export type StateStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type CommonState<T> = {
  data: T | null;
  status: StateStatus;
  error: string | null;
};

export type ApiResult<T> = {
  data: T;
  success: boolean;
  status: number;
  message?: string;
};
