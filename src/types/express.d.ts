// src/types/express.d.ts
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
    uid?: string;
  }
}
