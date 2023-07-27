import { DefinePermissions } from '../defineAbilityFor';

const guest: DefinePermissions = (_, { can, cannot }) => {
  // Not sure yet if necessary to define casl abilities for guests
  // but the idea here is that guests can atleast fetch published courses and subjects
  // and we assume that the backend will only return limited content (e.g. preview content or free chapters for unsubscribed users).
  // maybe with a flag for the front-end to know how to display limited content
  can('read', 'subject', { isPublished: true });
  can('read', 'course', { isPublished: true });
  can('read', 'module', { isPublished: true });
  can('read', 'content', { isPublished: true });
  cannot('manage', 'user');
  cannot('manage', 'enrollment');
};

export default guest;
