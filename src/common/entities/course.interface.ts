import { Subject } from './subject.interface';
import { User } from './user.interface';

export interface Course {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  subjectId: Subject['id'];
  /** Foreign Key */
  authorId: User['id'];
  title: string;
  description: string;
  /** Image URL */
  icon: string;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
