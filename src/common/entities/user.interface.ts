import { Role } from '#casl/types';

export interface User {
  id: number;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: `${Role}`;
  avatar?: string;
  isActive?: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
