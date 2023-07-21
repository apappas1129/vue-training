import { User } from '#root/common/entities/user.interface';
import { packRules } from '@casl/ability/extra';

// Module augmentation
declare global {
  namespace Express {
    export interface Request {
      user?: User;
      ability?: ReturnType<typeof packRules>;
    }
  }
}
