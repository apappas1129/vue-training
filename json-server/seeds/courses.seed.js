import { faker } from '@faker-js/faker';
import _ from 'lodash';

/** Generates 3-8 courses per subject */
export default function seedCourses(subjects) {
    const courses = [];

    subjects.forEach(subject => {
        const count = _.random(3, 8);
        for (let i = 0; i < count; i++)
            courses.push({
                id: faker.string.uuid(),
                title: faker.person.jobTitle + ' ' + faker.git.commitSha({ length: 7 }),
                description: faker.lorem.sentences(),
                icon: faker.image.url,
                isPublished: faker.datatype.boolean(),
                createdAt: faker.date.anytime(),
                updatedAt: faker.date.anytime(),
      /** FK*/  subjectId: subject.id,
      /** FK*/  authorId: subject.ownerId
            });
    });

    return courses;
}