import { PureAbility, AbilityBuilder, createMongoAbility } from '@casl/ability';
import { User } from '#root/common/index';
import { Action, Role, Subject } from './types';
import admin from './abilities/admin.ability';
import instructor from './abilities/instructor.ability';
import student from './abilities/student.ability';

export type DefinePermissions = (user: User, builder: AbilityBuilder<AppAbility>) => void;
export type AppAbility = PureAbility<[`${Action}`, `${Subject}`]>;

export function defineAbilityFor(user: User | null) {
  const rolePermissions: Record<Role, DefinePermissions> = {
    student,
    instructor,
    admin,
  };

  const builder = new AbilityBuilder<AppAbility>(createMongoAbility);

  const { can, cannot, build } = builder;

  // Global rules? Not sure when this availability is useful since if everyone `can`,
  // then we simply don't put guards
  can(Action.create, Subject.enrollment);
  cannot(Action.delete, Subject.user);

  if (user) {
    if (typeof rolePermissions[user.role] === 'function') {
      rolePermissions[user.role](user, builder);
    } else {
      throw new Error(`Trying to use unknown role "${user.role}"`);
    }
  }

  return build();
}
