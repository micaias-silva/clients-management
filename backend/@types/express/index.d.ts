import { RequestUser } from '../../src/auth/interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: RequestUser;
    }
  }
}
