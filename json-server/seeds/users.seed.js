import { faker } from '@faker-js/faker';
import _ from 'lodash';

/** Seeds 100 students, 100 instructors and 3 usable accounts for each roles (student, instructor & admin) */
export default function seedSubjects() {
    const users = [];

    // #region Generate usable accounts
    const roles = ['student', 'instructor', 'admin'];

    for (let i = 0; i <= roles.length; i++) {
        users.push({
            id: faker.string.uuid(),
            password: 'password',
            salt: faker.git.commitSha(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: roles[i] + '@elearning.com',
            // The team recently let go of faker.helpers.unique. See https://github.com/faker-js/faker/issues/1785
            avatar: faker.image.avatar(),
            role: roles[i],
            isActive: faker.datatype.boolean(),
            createdAt: faker.date.anytime(),
            updatedAt: faker.date.anytime()
        })
    }
    // #endregion Generate usable accounts

    // #region Generate students
    const students = 100;

    for (let i = 1; i <= students; i++) {
        users.push({
            id: faker.string.uuid(),
            password: faker.internet.password(),
            salt: faker.git.commitSha(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            role: 'student',
            isActive: faker.datatype.boolean(),
            createdAt: faker.date.anytime(),
            updatedAt: faker.date.anytime()
        })
    }
    // #endregion Generate students

    // #region Generate instructors
    const instructors = 100;

    for (let i = 1; i <= instructors; i++) {
        users.push({
            id: faker.string.uuid(),
            password: faker.internet.password(),
            salt: faker.git.commitSha(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            role: 'instructor',
            avatar: faker.image.avatar(),
            isActive: faker.datatype.boolean(),
            createdAt: faker.date.anytime(),
            updatedAt: faker.date.anytime()
        })
    }
    // #endregion Generate instructors

    return users;
}