/* eslint-disable quotes */
export type ErrorPageProps = {
  code: number;
  message: string;
  description: string;
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
    message: "Oops. The page you were looking for doesn't exist.",
    description: "Oops. The page you were looking for doesn't exist.",
  },
  [ErrorCode.UNAUTHORIZED]: {
    code: ErrorCode.UNAUTHORIZED,
    message: 'Unauthorized',
    description: 'You are not authorized to view the page.',
  },
  [ErrorCode.FORBIDDEN]: {
    code: ErrorCode.FORBIDDEN,
    message: 'Forbidden',
    description: 'You don’t have permission to access this page.',
  },
  [ErrorCode.SERVER_ERROR]: {
    code: ErrorCode.SERVER_ERROR,
    message: 'Server Error',
    description: 'An error occurred on the server. Please try again later.',
  },
};
