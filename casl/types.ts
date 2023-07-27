import { RawRule } from '@casl/ability';

export enum Action {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
  manage = 'manage',
}

export enum Subject {
  user = 'user',
  subject = 'subject',
  module = 'module',
  content = 'content',
  course = 'course',
  enrollment = 'enrollment',
  all = 'all',
}

export enum Role {
  student = 'student',
  instructor = 'instructor',
  admin = 'admin',
}
