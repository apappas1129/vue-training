import { Subject } from '#root/common/entities/index';
import { ValidationRule } from '@vuelidate/core';

export type SubjectFormValue = Pick<Subject, 'title' | 'isPublished'>;
export type SubjectFormValidator = Partial<{ [key in keyof SubjectForm]: { [key in string]: ValidationRule } }>;
