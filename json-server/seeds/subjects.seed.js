const faker = require('faker');
const _ = require('lodash');

/** Takes the first 25 instructors from given `users` and generates 10-25 subjects owned by each.*/
module.exports = function (users) {
    // Get 50 instructors
    const instructors = users.filter(u => u.role === 'instructor').slice(0, 25);
    const subjects = [];

    instructors.forEach(instructor => {
        const count = _.random(10, 25);
        for (let i = 0; i < count; i++)
            subjects.push({
                id: faker.datatype.uuid(),
                title: faker.unique(faker.name.title),
                isPublished: faker.datatype.boolean(),
                createdAt: faker.datatype.datetime(),
                updatedAt: faker.datatype.datetime(),
      /** FK*/  ownerId: instructor.id
            });
    });

    return subjects;
}