import { DefinePermissions } from '../defineAbilityFor';

const instructor: DefinePermissions = (user, { can }) => {
  can('manage', 'subject');
  can('create', 'subject');
  can('update', 'subject', { ownerId: user.id });
  can('delete', 'subject', { ownerId: user.id });

  can('manage', 'course');
  can('create', 'course');
  can('update', 'course', { authorId: user.id });
  can('delete', 'course', { authorId: user.id });

  can('manage', 'module');
  can('create', 'module');
  can('update', 'module', { authorId: user.id });
  can('delete', 'module', { authorId: user.id });

  can('manage', 'content');
  can('create', 'content');
  can('update', 'content', { authorId: user.id });
  can('delete', 'content', { authorId: user.id });
};

export default instructor;
