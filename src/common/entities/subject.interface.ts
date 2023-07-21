import { User } from './user.interface';

export interface Subject {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  ownerId: User['id'];
  /** Joined table */
  owner: User;
  title: string;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
