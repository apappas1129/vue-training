import { Module } from '#root/common/entities/index';
import { ValidationRule } from '@vuelidate/core';

export type ModuleFormValue = Pick<Module, 'title' | 'isPublished' | 'duration'> & Pick<Partial<Module>, 'courseId'>;
export type ModuleFormValidator = Partial<{ [key in keyof ModuleFormValue]: { [key in string]: ValidationRule } }>;
