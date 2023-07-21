import { DefinePermissions } from '../defineAbilityFor';

const admin: DefinePermissions = (user, { can }) => {
  can('manage', 'all');
};

export default admin;
