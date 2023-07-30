import { Course } from '#root/common/entities/index';
import { ValidationRule } from '@vuelidate/core';

export type CourseFormValue = Pick<Course, 'title' | 'isPublished' | 'icon' | 'description'> &
  Pick<Partial<Course>, 'subjectId'>;
export type CourseFormValidator = Partial<{ [key in keyof CourseFormValue]: { [key in string]: ValidationRule } }>;
