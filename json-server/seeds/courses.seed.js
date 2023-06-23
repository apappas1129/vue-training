const faker = require('faker');
const _ = require('lodash');

/** Generates 3-8 courses per subject */
module.exports = function (subjects) {
    const courses = [];

    subjects.forEach(subject => {
        const count = _.random(3, 8);
        for (let i = 0; i < count; i++)
            courses.push({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle + ' ' + faker.git.shortSha,
                description: faker.lorem.sentences(),
                icon: faker.image.imageUrl,
                isPublished: faker.datatype.boolean(),
                createdAt: faker.datatype.datetime(),
                updatedAt: faker.datatype.datetime(),
      /** FK*/  subjectId: subject.id,
      /** FK*/  authorId: subject.ownerId
            });
    });

    return courses;
}