import { User } from '#root/common/entities/user.interface';
import { defineAbilityFor } from '../../casl/defineAbilityFor';

// // Augment express-session with a custom SessionData object
declare module 'express-session' {
  interface SessionData {
    user?: User;
    ability?: ReturnType<typeof defineAbilityFor>;
  }
}

export {}; // this file needs to be a module
