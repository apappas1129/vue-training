import { Subject } from '#root/common/entities/index';
import { ValidationRule } from '@vuelidate/core';

export type SubjectForm = Pick<Subject, 'title' | 'isPublished'>;
export type SubjectFormValidator = Partial<{ [key in keyof SubjectForm]: { [key in string]: ValidationRule } }>;
