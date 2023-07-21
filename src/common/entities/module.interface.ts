import { Course } from './course.interface';
import { User } from './user.interface';

export interface Module {
  /** Primary Key */
  id: number;
  title: string;
  /** Foreign Key */
  courseId: Course['id'];
  /** Joined table */
  course: Course;
  /** Foreign Key */
  authorId: User['id'];
  author: User;
  duration: number;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
