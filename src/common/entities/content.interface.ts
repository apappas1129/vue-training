import { Module } from './module.interface';
import { User } from './user.interface';

export interface Content {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  subjectId: Module['id'];
  /** Foreign Key */
  authorId: User['id'];
  /** API Specs: "For images and documents the data type should be a file." */
  type: 'text' | 'image' | 'video' | 'document' | 'url';
  // TODO: planning and implementation
  content: File | string;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
