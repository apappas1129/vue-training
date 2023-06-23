export interface User {
  id: number;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  isActive?: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}

export type UserAuth = User & {
  // TODO: CASL implementation
  ability: { [key in string]: any };
};
