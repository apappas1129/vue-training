import { faker } from '@faker-js/faker';
import _ from 'lodash';

/** Generates 3-5 modules per course */
export default function seedModules(courses) {
  const modules = [];

  courses.forEach(course => {
    const count = _.random(3, 5);
    for (let i = 0; i < count; i++) {
      const module = {
        id: faker.string.uuid(),
        title: [faker.company.buzzVerb(), faker.hacker.adjective(), faker.hacker.noun()]
          .map(s => _.capitalize(s))
          .join(' '),
        duration: _.random(0, 60),
        isPublished: faker.datatype.boolean(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        authorId: course.authorId, // FK
        author: course.author,
        courseId: course.id, // FK
      };

      // Pevent cicular reference
      modules.push({
        ...module,
        course,
      });

      // mock join
      // NOTE: Of course the /couse endpoint should only reveal the modules (aka. content) of the requested course
      // if the session user is the author of the course / owner of its subject.
      // We will attempt to create a middleware on the json-server server application that will remove this accordingly,
      // but this is low prio as we are only creating a minimum viable mocked Web API.
      if (Array.isArray(course.modules)) course.modules.push(module);
      else course.modules = [module];
    }

    course.duration = (course.modules || []).reduce((total, mod) => total + mod.duration, 0);
  });

  return modules;
}
