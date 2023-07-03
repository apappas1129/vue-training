import { faker } from '@faker-js/faker';
import _ from 'lodash';

/** Generates 3-5 modules per course */
export default function seedModules (courses) {
    const modules = [];

    courses.forEach(course => {
        const count = _.random(3, 5);
        for (let i = 0; i < count; i++) {
            modules.push({
                id: faker.string.uuid(),
                title: `${faker.commerce.productAdjective()} ${faker.company.buzzVerb()} ${faker.company.buzzNoun()}`,
                duration: faker.finance.amount(),
                isPublished: faker.datatype.boolean(),
                createdAt: faker.date.anytime(),
                updatedAt: faker.date.anytime(),
      /** FK*/  authorId: course.authorId,
      /** FK*/  courseId: course.id,
            });
        }
    });

    return modules;
}