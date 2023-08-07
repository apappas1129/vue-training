import { User } from '../entities/user.interface';

// #region pages
const subjects = {
  href: '/subjects',
  name: 'Subjects',
  icon: 'book-3-line',
};

const courses = {
  href: '/courses',
  name: 'Courses',
  icon: 'book-2-line',
};

const modules = {
  href: '/modules',
  name: 'Modules',
  icon: 'book-read-line',
};

const explore = {
  href: '/explore-courses',
  name: 'Courses',
  icon: 'book-2-line',
};

const enrolledCourses = {
  href: '/my-courses',
  name: 'My Courses',
  icon: 'book-mark-line',
};
// #endregion pages

export const pages = {
  instructor: {
    subjects,
    courses,
    modules,
  },
  student: {
    explore,
    enrolledCourses,
  },
  admin: {},
};

export const navigation: {
  [key in User['role']]: readonly (typeof pages)[key][keyof (typeof pages)[key]][];
} = {
  instructor: Object.values(pages.instructor),
  student: Object.values(pages.student),
  admin: [],
} as const;
