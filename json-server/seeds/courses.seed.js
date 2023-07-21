import { faker } from '@faker-js/faker';
import _ from 'lodash';

/** Generates 3-8 courses per subject */
export default function seedCourses(subjects) {
  const courses = [];

  subjects.forEach(subject => {
    const count = _.random(3, 8);
    for (let i = 0; i < count; i++) {
      const course = {
        id: faker.string.uuid(),
        title: _.capitalize(faker.hacker.adjective()) + ' ' + _.capitalize(faker.hacker.ingverb()),
        description: faker.lorem.sentences(),
        icon: faker.image.url,
        isPublished: faker.datatype.boolean(),
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        subjectId: subject.id, // FK
        authorId: subject.ownerId, // FK
        author: subject.owner, // mock join
      };

      // Pevent cicular reference
      courses.push({
        ...course,
        subject, // mock join
      });

      if (Array.isArray(subject.courses)) subject.courses.push(course);
      else subject.courses = [course];
    }
  });

  return courses;
}
