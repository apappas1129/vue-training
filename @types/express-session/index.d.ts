import { User } from "#root/common/entities/user.interface";

// // Augment express-session with a custom SessionData object
declare module 'express-session' {
  interface SessionData {
    user?: User;
  }
}

export {}; // this file needs to be a module