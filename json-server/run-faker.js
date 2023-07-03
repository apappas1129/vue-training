import seedUsers from './seeds/users.seed.js';
import seedSubjects from './seeds/subjects.seed.js';
import seedCourses from './seeds/courses.seed.js';
import seedModules from './seeds/modules.seed.js';
import seedEnrollments from './seeds/enrollments.seed.js';

const db = { };

db.users = seedUsers();
db.subjects = seedSubjects(db.users);
db.courses = seedCourses(db.subjects);
db.modules = seedModules(db.courses);
db.enrollments = seedEnrollments(db.modules, db.users);
console.log(JSON.stringify(db));