import { JwtUserPayload } from '../../types/jwtPayload';

declare namespace Express {
  export interface Request {
    user?: JwtUserPayload;
  }
}
