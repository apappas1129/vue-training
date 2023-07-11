import { Course } from './course.interface';
import { User } from './user.interface';

export interface Enrollment {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  userId: User['id'];
  /** Foreign Key */
  courseId: Course['id'];
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
