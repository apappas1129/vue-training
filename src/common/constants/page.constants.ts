import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg';
import { User } from '../entities/user.interface';

// #region pages
const subjects = {
  href: '/subjects',
  name: 'Subjects',
  icon: remixiconUrl + '#ri-book-3-line',
};

const courses = {
  href: '/courses',
  name: 'Courses',
  icon: remixiconUrl + '#ri-book-2-line',
};

const modules = {
  href: '/modules',
  name: 'Modules',
  icon: remixiconUrl + '#ri-book-read-line',
};
// #endregion pages

export const pages = {
  instructor: {
    subjects,
    courses,
    modules,
  },
  student: {},
  admin: {},
};

export const navigation: {
  [key in User['role']]: readonly (typeof pages)[key][keyof (typeof pages)[key]][];
} = {
  instructor: Object.values(pages.instructor),
  student: [],
  admin: [],
} as const;
