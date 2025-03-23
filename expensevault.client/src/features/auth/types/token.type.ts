import { JwtPayload } from 'jwt-decode';

export interface MyJwtPayload extends JwtPayload {
  email: string;
  role: string | string[];
  [key: string]: unknown;
}
