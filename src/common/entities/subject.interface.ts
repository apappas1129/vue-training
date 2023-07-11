import { User } from './user.interface';

export interface Subject {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  ownerId: User['id'];
  title: string;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
