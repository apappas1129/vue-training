const faker = require('faker');
const _ = require('lodash');

/** Generates 3-5 modules per course */
module.exports = function (courses) {
    const modules = [];

    courses.forEach(course => {
        const count = _.random(3, 5);
        for (let i = 0; i < count; i++) {
            modules.push({
                id: faker.datatype.uuid(),
                title: `${faker.commerce.productAdjective()} ${faker.company.bsBuzz()} ${faker.company.bsNoun()}`,
                duration: faker.finance.amount(),
                isPublished: faker.datatype.boolean(),
                createdAt: faker.datatype.datetime(),
                updatedAt: faker.datatype.datetime(),
      /** FK*/  authorId: course.authorId,
      /** FK*/  courseId: course.id,
            });
        }
    });

    return modules;
}