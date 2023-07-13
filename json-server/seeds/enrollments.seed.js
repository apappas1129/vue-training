import { faker } from '@faker-js/faker';
import _ from 'lodash';

/** Takes the first 25 students from given `users` and generates 15-25 enrollments for each.*/

export default function seedEnrollments(modules, users) {
  const students = users.filter(u => u.role === 'student').slice(0, 25);
  const courses = _.groupBy(modules, 'courseId'); // { 'courseId': [...modules], ...courses }
  const courseIds = _.uniq(modules.map(m => m.courseId));
  const enrollments = [];

  students.forEach(student => {
    const count = _.random(15, 25);
    for (let i = 0; i < count; i++) {
      const courseId = courseIds[(courseIds.length * Math.random()) << 0]; // pick random course
      const courseModules = courses[courseId];
      enrollments.push({
        id: faker.string.uuid(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        /** FK*/ userId: student.id,
        /** FK*/ courseId: courseId,
        // #region PATCH method's additional resources on response data
        completedModules: courseModules.slice(0, Math.floor(courseModules.length / 2)), // 1st half of the modules completed
        modulesInProgress: courseModules.slice(Math.ceil(courseModules.length / 2)), // 2nd half of the modules in progress
        // #endregion PATCH method's additional resources on response data
      });
    }
  });

  return enrollments;
}
