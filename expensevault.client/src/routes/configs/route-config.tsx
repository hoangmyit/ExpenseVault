import { ReactElement } from 'react';

import { ROUTE_PATHS } from '../constants/route-paths';

import ConfirmEmailPage from '@/features/auth/components/confirm-page';
import SignInPage from '@/features/auth/components/sign-in';
import SignUpPage from '@/features/auth/components/sign-up';
import CategoriesPage from '@/features/category/categories-page';
import CategoryPage from '@/features/category/category-page';
import { ErrorCode } from '@/features/error-page/error-page.const';
import HomePage from '@/features/home/home';

// Define roles for the application
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
};

// Define route types
export interface AppRoute {
  path: string;
  element: ReactElement;
  requiredRoles?: string[];
}

export interface ErrorRoute {
  path: string;
  errorCode: ErrorCode;
}

// Protected routes configuration
export const protectedRoutes: AppRoute[] = [
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: <HomePage />,
    requiredRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: ROUTE_PATHS.CATEGORIES,
    element: <CategoriesPage />,
    requiredRoles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    path: ROUTE_PATHS.CATEGORY_DETAIL,
    element: <CategoryPage />,
    requiredRoles: [ROLES.USER, ROLES.ADMIN],
  },
];

// Public routes configuration
export const guestAccessRoutes: AppRoute[] = [
  {
    path: ROUTE_PATHS.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: ROUTE_PATHS.SIGN_UP,
    element: <SignUpPage />,
  },
];

export const publicRoutes: AppRoute[] = [
  {
    path: ROUTE_PATHS.CONFIRM_EMAIL,
    element: <ConfirmEmailPage />,
  },
];

// Error routes configuration
export const errorRoutes: ErrorRoute[] = [
  {
    path: ROUTE_PATHS.UNAUTHORIZED,
    errorCode: ErrorCode.UNAUTHORIZED,
  },
  {
    path: ROUTE_PATHS.FORBIDDEN,
    errorCode: ErrorCode.FORBIDDEN,
  },
  {
    path: ROUTE_PATHS.SERVER_ERROR,
    errorCode: ErrorCode.SERVER_ERROR,
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    errorCode: ErrorCode.NOT_FOUND,
  },
];
