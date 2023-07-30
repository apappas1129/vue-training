import { Module } from './module.interface';
import { Subject } from './subject.interface';
import { User } from './user.interface';

export interface Course {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  subjectId: Subject['id'];
  subject: Subject;
  /** Foreign Key */
  authorId: User['id'];
  /** Joined table */
  author: User;
  title: string;
  /** Not a direct field.
   * This will be calculated based on total duration of Modules (assuming from the backend) */
  description: string;
  /** Image URL */
  icon?: string;
  duration: number;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
  modules: Array<Module>;
}
