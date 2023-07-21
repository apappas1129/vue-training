import { DefinePermissions } from '../defineAbilityFor';

const instructor: DefinePermissions = (user, { can }) => {
  can('create', 'subject');
  can('update', 'subject', { authorId: user.id });
};

export default instructor;
