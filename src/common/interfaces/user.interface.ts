import { Role } from "./role.interface";

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: Role
}
