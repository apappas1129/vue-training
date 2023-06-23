import { Course } from "./course.interface";
import { User } from "./user.interface";

export interface Module {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  subjectId: Course['id'];
  /** Foreign Key */
  authorId: User['id'];
  duration: number;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
