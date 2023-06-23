const faker = require('faker');

/** Seeds 100 students, 100 instructors and 3 usable accounts for each roles (student, instructor & admin) */
module.exports = function () {
    const users = [];

    // #region Generate usable accounts
    const roles = ['student', 'instructor', 'admin'];

    for (let i = 0; i <= roles.length; i++) {
        users.push({
            id: faker.datatype.uuid(),
            password: 'password',
            salt: faker.git.commitSha(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: roles[i] + '@elearning.com',
            avatar: faker.unique(faker.image.avatar),
            role: roles[i],
            isActive: faker.datatype.boolean(),
            createdAt: faker.datatype.datetime(),
            updatedAt: faker.datatype.datetime()
        })
    }
    // #endregion Generate usable accounts

    // #region Generate students
    const students = 100;

    for (let i = 1; i <= students; i++) {
        users.push({
            id: faker.datatype.uuid(),
            password: faker.internet.password(),
            salt: faker.git.commitSha(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            role: 'student',
            isActive: faker.datatype.boolean(),
            createdAt: faker.datatype.datetime(),
            updatedAt: faker.datatype.datetime()
        })
    }
    // #endregion Generate students

    // #region Generate instructors
    const instructors = 100;

    for (let i = 1; i <= instructors; i++) {
        users.push({
            id: faker.datatype.uuid(),
            password: faker.internet.password(),
            salt: faker.git.commitSha(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            role: 'instructor',
            avatar: faker.image.avatar(),
            isActive: faker.datatype.boolean(),
            createdAt: faker.datatype.datetime(),
            updatedAt: faker.datatype.datetime()
        })
    }
    // #endregion Generate instructors

    return users;
}