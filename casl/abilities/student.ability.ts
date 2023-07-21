import { DefinePermissions } from '../defineAbilityFor';

const student: DefinePermissions = (user, { can }) => {
  can('read', 'subject', { isPublished: true });
};

export default student;
