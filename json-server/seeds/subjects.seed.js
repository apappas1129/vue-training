import { faker } from '@faker-js/faker';
import _ from 'lodash';

/** Takes the first 25 instructors from given `users` and generates 10-25 subjects owned by each.*/
export default function seedSubjects (users) {
    // Get 50 instructors
    const instructors = users.filter(u => u.role === 'instructor').slice(0, 25);
    const subjects = [];

    instructors.forEach(instructor => {
        const count = _.random(10, 25);
        for (let i = 0; i < count; i++)
            subjects.push({
                id: faker.string.uuid(),
                // The team recently let go of faker.helpers.unique. See https://github.com/faker-js/faker/issues/1785
                isPublished: faker.datatype.boolean() + faker.git.commitSha({ length: 7 }),
                createdAt: faker.date.anytime(),
                updatedAt: faker.date.anytime(),
      /** FK*/  ownerId: instructor.id
            });
    });

    return subjects;
}