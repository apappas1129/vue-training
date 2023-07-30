import { Module } from './module.interface';
import { User } from './user.interface';

export interface Content {
  /** Primary Key */
  id: number;
  /** Foreign Key */
  moduleId: Module['id'];
  module: Module;
  /** Foreign Key */
  authorId: User['id'];
  /** API Specs: "For images and documents the data type should be a file." (I'm assuming this means a Blob) */
  type: 'text' | 'image' | 'video' | 'document' | 'url';
  // TODO: planning and implementation (video content, markdown/rich-text-editor content)
  content: Blob | string;
  isPublished: boolean;
  /** stringified ISO 8601 date */
  createdAt?: string;
  /** stringified ISO 8601 date */
  updatedAt?: string;
}
