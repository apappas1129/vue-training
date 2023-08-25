import { PageContext } from '#root/renderer/types';
import { createMongoAbility } from '@casl/ability';
import { unpackRules } from '@casl/ability/extra';
import { Subject } from '../../../../casl/types';

/** use as vite-plugin-ssr `onBeforeRender */
export default function createEntityGuard(entity: `${Subject}`, redirectTo: string) {
  // BUG: custom fields on pageContextInit not available here if using clientRouting.
  return (pageContext: PageContext) => {
    if (!pageContext.ability) return { pageContext: { redirectTo: '/subjects' } };

    const unpackedRules = unpackRules(pageContext.ability);
    const ability = createMongoAbility(unpackedRules as any);
    if (!ability.can('create', entity)) return { pageContext: { redirectTo } };
    return { pageContext: {} };
  };
}
