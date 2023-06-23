import { User } from "#root/common/entities/user.interface";

// Module augmentation
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}