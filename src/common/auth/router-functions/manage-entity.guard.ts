import { RenderErrorPage } from 'vite-plugin-ssr/RenderErrorPage';
import { createMongoAbility } from '@casl/ability';
import { unpackRules } from '@casl/ability/extra';

import { PageContext } from '#root/renderer/types';
import { Subject } from '../../../../casl/types';

/** use as vite-plugin-ssr guard() */
export default function manageEntityGuard(entity: `${Subject}`) {
  return (pageContext: PageContext) => {
    if (!pageContext.ability) {
      throw RenderErrorPage({
        pageContext: {
          redirectTo: '/signin',
        },
      });
    }

    const unpackedRules = unpackRules(pageContext.ability);
    const ability = createMongoAbility(unpackedRules as any);
    if (!ability.can('manage', entity)) {
      throw RenderErrorPage({
        pageContext: {
          redirectTo: '/signin',
        },
      });
    }
    return ability;
  };
}
