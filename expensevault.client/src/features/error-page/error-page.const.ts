/* eslint-disable quotes */
export type ErrorPageProps = {
  code: number;
  message?: string;
  description: string;
  title: string;
};

export const enum ErrorCode {
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export const ErrorPageData: Record<ErrorCode, ErrorPageProps> = {
  [ErrorCode.NOT_FOUND]: {
    code: ErrorCode.NOT_FOUND,
    title: "Oops. The page you were looking for doesn't exist.",
    description: "Oops. The page you were looking for doesn't exist.",
  },
  [ErrorCode.UNAUTHORIZED]: {
    code: ErrorCode.UNAUTHORIZED,
    title: 'Unauthorized',
    description: 'You are not authorized to view the page.',
  },
  [ErrorCode.FORBIDDEN]: {
    code: ErrorCode.FORBIDDEN,
    title: 'Forbidden',
    description: 'You don’t have permission to access this page.',
  },
  [ErrorCode.SERVER_ERROR]: {
    code: ErrorCode.SERVER_ERROR,
    title: 'Server Error',
    description: 'An error occurred on the server. Please try again later.',
  },
};
