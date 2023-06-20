import { User } from "#root/common/interfaces/user.interface";

// Module augmentation
declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}