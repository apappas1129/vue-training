import { Role } from "./role.interface";

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: Role
}

export type UserAuth = User & {
  // TODO: CASL implementation
  ability: { [key in string]: any };
}