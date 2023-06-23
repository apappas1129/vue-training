const seedUsers = require('./seeds/users.seed');
const seedSubjects = require('./seeds/subjects.seed');
const seedCourses = require('./seeds/courses.seed');
const seedModules = require('./seeds/modules.seed');
const seedEnrollments = require('./seeds/enrollments.seed');

const db = { };

db.users = seedUsers();
db.subjects = seedSubjects(db.users);
db.courses = seedCourses(db.subjects);
db.modules = seedModules(db.courses);
db.enrollments = seedEnrollments(db.modules, db.users);

console.log(JSON.stringify(db));